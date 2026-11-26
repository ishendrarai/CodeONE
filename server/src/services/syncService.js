/**
 * src/services/syncService.js
 * Layer: Services / Ingestion & Orchestration
 * Responsibility: Orchestrates asynchronous platform synchronization via PlatformAdapter,
 *                 tracks execution states in sync_logs, and coordinates Prisma persistence.
 * Interaction: Invoked by syncController; delegates external calls to adapterRegistry.
 */

const prisma = require('../config/database');
const adapterRegistry = require('../integrations/adapters');
const { logSecurityEvent } = require('./auditService');
const { ERROR_CODES } = require('../utils/constants');

// In-process lock set preventing concurrent duplicate syncs for the same platformAccountId
const activeSyncLocks = new Set();

function createServiceError(message, statusCode, code, details) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  if (details) err.details = details;
  return err;
}

function toLifecycleStatus(dbStatus) {
  switch (dbStatus) {
    case 'pending':
      return 'PENDING';
    case 'running':
      return 'RUNNING';
    case 'success':
    case 'partial':
      return 'COMPLETED';
    case 'failed':
    case 'rate_limited':
      return 'FAILED';
    default:
      return String(dbStatus || 'PENDING').toUpperCase();
  }
}

function mapStatusFilter(statusFilter) {
  if (!statusFilter) return undefined;
  const upper = statusFilter.toUpperCase();
  if (upper === 'PENDING') return 'pending';
  if (upper === 'RUNNING') return 'running';
  if (upper === 'COMPLETED') return { in: ['success', 'partial'] };
  if (upper === 'FAILED') return { in: ['failed', 'rate_limited'] };
  return statusFilter.toLowerCase();
}

function formatSyncLog(log) {
  if (!log) return null;
  return {
    id: log.id,
    platformAccountId: log.platformAccountId,
    status: log.status,
    lifecycleStatus: toLifecycleStatus(log.status),
    startedAt: log.startedAt,
    finishedAt: log.finishedAt,
    recordsFetched: log.recordsFetched,
    errorMessage: log.errorMessage,
    ...(log.platformAccount ? { platformAccount: log.platformAccount } : {}),
  };
}

async function persistSyncData(account, profile, submissions, ratingHistory) {
  let recordsFetched = 0;

  if (Array.isArray(submissions) && submissions.length > 0) {
    for (const sub of submissions) {
      let problemRecordId = null;
      if (sub.problem && prisma.problem?.upsert) {
        const upsertedProblem = await prisma.problem.upsert({
          where: {
            platform_problemId: {
              platform: account.platformName,
              problemId: sub.problem.problemId,
            },
          },
          update: {
            title: sub.problem.title,
            difficulty: sub.problem.difficulty,
            difficultyRating: sub.problem.difficultyRating,
            url: sub.problem.url,
          },
          create: {
            platform: account.platformName,
            problemId: sub.problem.problemId,
            title: sub.problem.title,
            difficulty: sub.problem.difficulty,
            difficultyRating: sub.problem.difficultyRating,
            url: sub.problem.url,
          },
          select: { id: true },
        });
        problemRecordId = upsertedProblem?.id || null;
      }

      if (prisma.submission?.upsert) {
        await prisma.submission.upsert({
          where: {
            platformAccountId_externalId: {
              platformAccountId: account.id,
              externalId: sub.externalId,
            },
          },
          update: {
            verdict: sub.verdict,
            language: sub.language,
          },
          create: {
            platformAccountId: account.id,
            problemId: problemRecordId,
            externalId: sub.externalId,
            verdict: sub.verdict,
            language: sub.language,
            submittedAt: sub.submittedAt,
          },
        });
      }
      recordsFetched += 1;
    }
  }

  if (Array.isArray(ratingHistory) && ratingHistory.length > 0 && prisma.ratingHistory?.createMany) {
    let existingTimestamps = new Set();
    if (prisma.ratingHistory.findMany) {
      const existing = await prisma.ratingHistory.findMany({
        where: { platformAccountId: account.id },
        select: { recordedAt: true },
      });
      existingTimestamps = new Set(
        existing
          .map((r) => (r.recordedAt instanceof Date ? r.recordedAt.getTime() : new Date(r.recordedAt).getTime()))
          .filter((t) => !Number.isNaN(t))
      );
    }

    const newRatings = ratingHistory.filter((item) => {
      const ts = item.recordedAt instanceof Date ? item.recordedAt.getTime() : new Date(item.recordedAt).getTime();
      return !Number.isNaN(ts) && !existingTimestamps.has(ts);
    });

    if (newRatings.length > 0) {
      await prisma.ratingHistory.createMany({
        data: newRatings.map((item) => ({
          platformAccountId: account.id,
          oldRating: item.oldRating,
          newRating: item.newRating,
          recordedAt: item.recordedAt,
        })),
        skipDuplicates: true,
      });
      recordsFetched += newRatings.length;
    }
  }

  if (prisma.platformAccount?.update) {
    await prisma.platformAccount.update({
      where: { id: account.id },
      data: {
        lastSynced: new Date(),
        ...(profile && profile.rating !== undefined ? { rating: profile.rating } : {}),
        ...(profile && profile.rank !== undefined ? { rank: profile.rank } : {}),
      },
    });
  }

  return recordsFetched;
}

async function executeSyncJob(syncLogId, account) {
  try {
    await prisma.syncLog.update({
      where: { id: syncLogId },
      data: { status: 'running' },
    });

    const adapter = adapterRegistry.getAdapter(account.platformName);
    const caps = adapter.capabilities();

    const profile = await adapter.fetchProfile(account.username);
    const submissions = caps.submissions
      ? await adapter.fetchSubmissions(account.username, account.lastSynced || null)
      : [];
    const ratingHistory = caps.ratingHistory
      ? await adapter.fetchRatingHistory(account.username)
      : [];

    const recordsFetched = await persistSyncData(account, profile, submissions, ratingHistory);

    await prisma.syncLog.update({
      where: { id: syncLogId },
      data: {
        status: 'success',
        finishedAt: new Date(),
        recordsFetched,
        errorMessage: null,
      },
    });
  } catch (err) {
    const failureStatus = err?.code === ERROR_CODES.RATE_LIMIT_EXCEEDED ? 'rate_limited' : 'failed';
    const safeMessage =
      typeof err?.message === 'string' ? err.message.slice(0, 500) : 'Synchronization failed.';

    try {
      await prisma.syncLog.update({
        where: { id: syncLogId },
        data: {
          status: failureStatus,
          finishedAt: new Date(),
          errorMessage: safeMessage,
        },
      });
    } catch {
      // Avoid unhandled rejection if DB update fails during error handling
    }
  } finally {
    activeSyncLocks.delete(account.id);
  }
}

async function triggerAccountSync(userId, platformAccountId, options = {}) {
  const account = await prisma.platformAccount.findUnique({
    where: { id: platformAccountId },
    select: {
      id: true,
      userId: true,
      platformName: true,
      username: true,
      verificationStatus: true,
      isActive: true,
      lastSynced: true,
      rating: true,
      rank: true,
    },
  });

  if (!account) {
    throw createServiceError('Platform account not found.', 404, ERROR_CODES.NOT_FOUND);
  }

  // Strict IDOR protection
  if (account.userId !== userId) {
    await logSecurityEvent({
      actorUserId: userId,
      actorRole: 'user',
      action: 'SYNC_TRIGGER_IDOR_BLOCKED',
      resourceType: 'platform_account',
      resourceId: platformAccountId,
      status: 'denied',
    });
    throw createServiceError(
      'You do not have permission to sync this platform account.',
      403,
      ERROR_CODES.AUTHORIZATION_ERROR
    );
  }

  if (account.verificationStatus !== 'verified') {
    throw createServiceError(
      'Platform account must be verified before syncing.',
      400,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  if (!account.isActive) {
    throw createServiceError(
      'Platform account is inactive and cannot be synced.',
      400,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  // Prevent duplicate or conflicting concurrent sync operations
  if (activeSyncLocks.has(platformAccountId)) {
    throw createServiceError(
      'A synchronization job is already in progress for this platform account.',
      409,
      ERROR_CODES.CONFLICT
    );
  }

  const activeDbSync = await prisma.syncLog.findFirst({
    where: {
      platformAccountId,
      status: { in: ['pending', 'running'] },
    },
    select: { id: true, status: true },
  });

  if (activeDbSync) {
    throw createServiceError(
      'A synchronization job is already in progress for this platform account.',
      409,
      ERROR_CODES.CONFLICT
    );
  }

  activeSyncLocks.add(platformAccountId);

  let syncLog;
  try {
    syncLog = await prisma.syncLog.create({
      data: {
        platformAccountId,
        status: 'pending',
        recordsFetched: 0,
      },
      select: {
        id: true,
        platformAccountId: true,
        status: true,
        startedAt: true,
      },
    });
  } catch (err) {
    activeSyncLocks.delete(platformAccountId);
    throw err;
  }

  await logSecurityEvent({
    actorUserId: userId,
    actorRole: 'user',
    action: 'PLATFORM_SYNC_ENQUEUED',
    resourceType: 'sync_log',
    resourceId: syncLog.id,
    status: 'success',
    metadata: { platformAccountId, platformName: account.platformName },
  });

  // Schedule background execution off the HTTP request thread
  const schedule = options.immediate ? (fn) => fn() : setImmediate;
  schedule(() => {
    void executeSyncJob(syncLog.id, account);
  });

  return {
    syncLogId: syncLog.id,
    platformAccountId: syncLog.platformAccountId,
    status: syncLog.status,
    lifecycleStatus: toLifecycleStatus(syncLog.status),
    startedAt: syncLog.startedAt,
  };
}

async function triggerAllAccountsSync(userId) {
  const accounts = await prisma.platformAccount.findMany({
    where: {
      userId,
      verificationStatus: 'verified',
      isActive: true,
    },
    select: { id: true },
  });

  const jobs = [];
  for (const acc of accounts) {
    try {
      const job = await triggerAccountSync(userId, acc.id);
      jobs.push(job);
    } catch (err) {
      if (err.code !== ERROR_CODES.CONFLICT) {
        throw err;
      }
    }
  }

  return {
    enqueuedCount: jobs.length,
    jobs,
  };
}

async function getSyncLogs(userId, filters = {}) {
  const query = typeof filters === 'string' ? { platformAccountId: filters } : filters || {};
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
  const skip = (page - 1) * limit;

  if (query.platformAccountId) {
    const account = await prisma.platformAccount.findUnique({
      where: { id: query.platformAccountId },
      select: { id: true, userId: true },
    });

    if (!account) {
      throw createServiceError('Platform account not found.', 404, ERROR_CODES.NOT_FOUND);
    }

    if (account.userId !== userId) {
      throw createServiceError(
        'You do not have permission to view sync logs for this platform account.',
        403,
        ERROR_CODES.AUTHORIZATION_ERROR
      );
    }
  }

  const where = {
    platformAccount: { userId },
    ...(query.platformAccountId ? { platformAccountId: query.platformAccountId } : {}),
    ...(query.status ? { status: mapStatusFilter(query.status) } : {}),
  };

  const [logs, total] = await Promise.all([
    prisma.syncLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { startedAt: 'desc' },
      select: {
        id: true,
        platformAccountId: true,
        status: true,
        startedAt: true,
        finishedAt: true,
        recordsFetched: true,
        errorMessage: true,
        platformAccount: {
          select: {
            id: true,
            platformName: true,
            username: true,
          },
        },
      },
    }),
    prisma.syncLog.count({ where }),
  ]);

  return {
    logs: logs.map(formatSyncLog),
    meta: {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 0,
      },
    },
  };
}

module.exports = {
  triggerAccountSync,
  triggerAllAccountsSync,
  getSyncLogs,
  executeSyncJob,
  _activeSyncLocks: activeSyncLocks,
  _toLifecycleStatus: toLifecycleStatus,
};
