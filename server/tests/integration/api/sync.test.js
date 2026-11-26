/**
 * tests/integration/api/sync.test.js
 * Layer: Tests / Integration / API
 * Responsibility: Tests POST /api/v1/sync/platform-accounts/:id (HTTP 202) and GET /api/v1/sync/logs,
 *                 covering ownership/IDOR checks, duplicate sync prevention, lifecycle transitions,
 *                 pagination, filtering, and external API failures.
 */

const request = require('supertest');
const app = require('../../../src/app');
const prisma = require('../../../src/config/database');
const { signAccessToken } = require('../../../src/utils/jwt');
const adapterRegistry = require('../../../src/integrations/adapters');
const syncService = require('../../../src/services/syncService');
const { SourceUnavailableError } = require('../../../src/integrations/adapters/errors');

const USER_A = '11111111-1111-4111-8111-111111111111';
const USER_B = '22222222-2222-4222-8222-222222222222';
const USER_RATE_LIMITED = '55555555-5555-4555-8555-555555555555';
const ACCOUNT_ID = '33333333-3333-4333-8333-333333333333';
const SYNC_LOG_ID = '44444444-4444-4444-8444-444444444444';

function authHeader(userId = USER_A) {
  const token = signAccessToken({
    sub: userId,
    email: `${userId}@example.com`,
    role: 'USER',
    sid: 'sess-sync',
  });
  return `Bearer ${token}`;
}

describe('P2 Background Synchronization APIs (/api/v1/sync)', () => {
  beforeEach(() => {
    syncService._activeSyncLocks.clear();
    jest.spyOn(prisma.auditLog, 'create').mockResolvedValue({});
    jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => callback(prisma));
    jest.spyOn(prisma, '$executeRaw').mockResolvedValue(1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('1. Unauthorized request without JWT returns 401', async () => {
    const res = await request(app).post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`);
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('AUTHENTICATION_ERROR');
  });

  test('2. Invalid platform account UUID returns 400 VALIDATION_ERROR', async () => {
    const res = await request(app)
      .post('/api/v1/sync/platform-accounts/not-a-uuid')
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('3. Missing platform account returns 404 NOT_FOUND', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue(null);

    const res = await request(app)
      .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  test('4. Cross-user sync attempt (IDOR) returns 403 AUTHORIZATION_ERROR', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      isActive: true,
    });

    const res = await request(app)
      .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_B));

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('AUTHORIZATION_ERROR');
  });

  test('5. Unverified platform account cannot be synced (400 VALIDATION_ERROR)', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      isActive: true,
    });

    const res = await request(app)
      .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('6. Duplicate sync request while pending/running returns 409 CONFLICT', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      isActive: true,
    });
    jest.spyOn(prisma.syncLog, 'findFirst').mockResolvedValue({
      id: SYNC_LOG_ID,
      status: 'running',
    });

    const res = await request(app)
      .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('CONFLICT');
  });

  test('simultaneous sync requests only create one active job', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      isActive: true,
    });

    let releaseDbCheck;
    const dbCheckGate = new Promise((resolve) => {
      releaseDbCheck = resolve;
    });
    let notifyFindFirstStarted;
    const findFirstStarted = new Promise((resolve) => {
      notifyFindFirstStarted = resolve;
    });
    let findFirstCalls = 0;
    const findFirstSpy = jest.spyOn(prisma.syncLog, 'findFirst').mockImplementation(async () => {
      findFirstCalls += 1;
      if (findFirstCalls === 1) notifyFindFirstStarted();
      if (findFirstCalls === 2) releaseDbCheck();
      await dbCheckGate;
      return null;
    });
    const syncCreateSpy = jest.spyOn(prisma.syncLog, 'create').mockResolvedValue({
      id: SYNC_LOG_ID,
      platformAccountId: ACCOUNT_ID,
      status: 'running',
      startedAt: new Date('2026-11-27T00:00:00.000Z'),
    });
    jest.spyOn(global, 'setImmediate').mockImplementation(() => 0);

    const firstRequest = request(app)
      .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_A))
      .then((response) => response);

    await findFirstStarted;
    let secondResponse;
    try {
      secondResponse = await request(app)
        .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
        .set('Authorization', authHeader(USER_A));
    } finally {
      releaseDbCheck();
    }

    const firstResponse = await firstRequest;

    expect(secondResponse.status).toBe(409);
    expect(firstResponse.status).toBe(202);
    expect(findFirstSpy).toHaveBeenCalledTimes(1);
    expect(syncCreateSpy).toHaveBeenCalledTimes(1);
    expect(prisma.$executeRaw).toHaveBeenCalledTimes(1);
    expect(prisma.$executeRaw.mock.calls[0][0].join('')).toContain('pg_advisory_xact_lock');
  });

  test('7. Valid sync returns HTTP 202 Accepted with syncLogId and completes background job', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      isActive: true,
      lastSynced: null,
    });
    jest.spyOn(prisma.syncLog, 'findFirst').mockResolvedValue(null);
    const syncCreateSpy = jest.spyOn(prisma.syncLog, 'create').mockResolvedValue({
      id: SYNC_LOG_ID,
      platformAccountId: ACCOUNT_ID,
      status: 'running',
      startedAt: new Date('2026-11-27T00:00:00.000Z'),
    });

    const syncUpdateSpy = jest.spyOn(prisma.syncLog, 'update').mockResolvedValue({});
    jest.spyOn(prisma.problem, 'upsert').mockResolvedValue({ id: 'prob-uuid-1' });
    jest.spyOn(prisma.submission, 'upsert').mockResolvedValue({});
    jest.spyOn(prisma.ratingHistory, 'findMany').mockResolvedValue([]);
    jest.spyOn(prisma.ratingHistory, 'createMany').mockResolvedValue({ count: 1 });
    jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({});

    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      capabilities: () => ({ submissions: true, ratingHistory: true }),
      fetchProfile: jest.fn().mockResolvedValue({ rating: 3700, rank: 'legendary grandmaster' }),
      fetchSubmissions: jest.fn().mockResolvedValue([
        {
          externalId: '101',
          problemId: '1900A',
          title: 'Cover in Water',
          verdict: 'accepted',
          language: 'GNU C++20',
          submittedAt: new Date('2026-11-26T12:00:00.000Z'),
          problem: {
            problemId: '1900A',
            title: 'Cover in Water',
            difficulty: 'easy',
            difficultyRating: 800,
            url: 'https://codeforces.com/contest/1900/problem/A',
          },
        },
      ]),
      fetchRatingHistory: jest.fn().mockResolvedValue([
        { oldRating: 3600, newRating: 3700, recordedAt: new Date('2026-11-26T12:00:00.000Z') },
      ]),
    });

    const res = await request(app)
      .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(202);
    expect(res.body.success).toBe(true);
    expect(syncCreateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          platformAccountId: ACCOUNT_ID,
          status: 'running',
          recordsFetched: 0,
        }),
      })
    );
    expect(res.body.data).toMatchObject({
      syncLogId: SYNC_LOG_ID,
      platformAccountId: ACCOUNT_ID,
      status: 'running',
      lifecycleStatus: 'RUNNING',
    });

    // Wait for setImmediate background execution to settle
    await new Promise((resolve) => setImmediate(resolve));
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(syncUpdateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: SYNC_LOG_ID },
        data: expect.objectContaining({ status: 'running' }),
      })
    );
    expect(syncUpdateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: SYNC_LOG_ID },
        data: expect.objectContaining({ status: 'success', recordsFetched: 2, errorMessage: null }),
      })
    );
    expect(syncService._activeSyncLocks.has(ACCOUNT_ID)).toBe(false);
  });

  test('8. External API failure marks sync log as failed and releases lock', async () => {
    const syncUpdateSpy = jest.spyOn(prisma.syncLog, 'update').mockResolvedValue({});
    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      capabilities: () => ({ submissions: true, ratingHistory: true }),
      fetchProfile: jest.fn().mockRejectedValue(new SourceUnavailableError('codeforces', 'CF down')),
    });

    syncService._activeSyncLocks.add(ACCOUNT_ID);
    await syncService.executeSyncJob(SYNC_LOG_ID, {
      id: ACCOUNT_ID,
      platformName: 'codeforces',
      username: 'tourist',
      lastSynced: null,
    });

    expect(syncUpdateSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        where: { id: SYNC_LOG_ID },
        data: expect.objectContaining({
          status: 'failed',
          errorMessage: 'CF down',
        }),
      })
    );
    expect(syncService._activeSyncLocks.has(ACCOUNT_ID)).toBe(false);
  });

  test('9. GET /api/v1/sync/logs enforces ownership, supports pagination, and returns normalized status', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
    });
    jest.spyOn(prisma.syncLog, 'findMany').mockResolvedValue([
      {
        id: SYNC_LOG_ID,
        platformAccountId: ACCOUNT_ID,
        status: 'success',
        startedAt: new Date('2026-11-27T00:00:00.000Z'),
        finishedAt: new Date('2026-11-27T00:00:03.000Z'),
        recordsFetched: 15,
        errorMessage: null,
        platformAccount: {
          id: ACCOUNT_ID,
          platformName: 'codeforces',
          username: 'tourist',
        },
      },
    ]);
    jest.spyOn(prisma.syncLog, 'count').mockResolvedValue(1);

    const res = await request(app)
      .get(`/api/v1/sync/logs?platformAccountId=${ACCOUNT_ID}&status=COMPLETED&page=1&limit=10`)
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0]).toMatchObject({
      id: SYNC_LOG_ID,
      status: 'success',
      lifecycleStatus: 'COMPLETED',
      recordsFetched: 15,
    });
    expect(res.body.meta.pagination).toEqual({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  });

  test('10. GET /api/v1/sync/logs blocks cross-user platformAccountId filter (403)', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
    });

    const res = await request(app)
      .get(`/api/v1/sync/logs?platformAccountId=${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_B));

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('AUTHORIZATION_ERROR');
  });

  test('11. POST /api/v1/sync/platform-accounts dispatches sync across verified active accounts with HTTP 202', async () => {
    jest.spyOn(prisma.platformAccount, 'findMany').mockResolvedValue([{ id: ACCOUNT_ID }]);
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      isActive: true,
      lastSynced: null,
    });
    jest.spyOn(prisma.syncLog, 'findFirst').mockResolvedValue(null);
    const syncCreateSpy = jest.spyOn(prisma.syncLog, 'create').mockResolvedValue({
      id: SYNC_LOG_ID,
      platformAccountId: ACCOUNT_ID,
      status: 'running',
      startedAt: new Date('2026-11-27T00:00:00.000Z'),
    });
    jest.spyOn(prisma.syncLog, 'update').mockResolvedValue({});
    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      capabilities: () => ({ submissions: false, ratingHistory: false }),
      fetchProfile: jest.fn().mockResolvedValue({ rating: 3700, rank: 'legendary grandmaster' }),
    });
    jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({});

    const res = await request(app)
      .post('/api/v1/sync/platform-accounts')
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(202);
    expect(res.body.success).toBe(true);
    expect(res.body.data.enqueuedCount).toBe(1);
    expect(syncCreateSpy).toHaveBeenCalledTimes(1);
    expect(res.body.data.jobs[0]).toMatchObject({
      syncLogId: SYNC_LOG_ID,
      status: 'running',
      lifecycleStatus: 'RUNNING',
    });

    await new Promise((resolve) => setImmediate(resolve));
    await new Promise((resolve) => setTimeout(resolve, 20));
  });

  test('12. RateLimitError maps sync log status to rate_limited and releases lock', async () => {
    const { RateLimitError } = require('../../../src/integrations/adapters/errors');
    const syncUpdateSpy = jest.spyOn(prisma.syncLog, 'update').mockResolvedValue({});
    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      capabilities: () => ({ submissions: true, ratingHistory: true }),
      fetchProfile: jest.fn().mockRejectedValue(new RateLimitError('codeforces', 'Call limit exceeded', 2000)),
    });

    syncService._activeSyncLocks.add(ACCOUNT_ID);
    await syncService.executeSyncJob(SYNC_LOG_ID, {
      id: ACCOUNT_ID,
      platformName: 'codeforces',
      username: 'tourist',
      lastSynced: null,
    });

    expect(syncUpdateSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        where: { id: SYNC_LOG_ID },
        data: expect.objectContaining({
          status: 'rate_limited',
          errorMessage: 'Call limit exceeded',
        }),
      })
    );
    expect(syncService._activeSyncLocks.has(ACCOUNT_ID)).toBe(false);
  });

  test('13. Sync trigger endpoints enforce per-user rate limiter returning 429 with Retry-After', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue(null);

    const limit = Number(process.env.SYNC_RATE_LIMIT_MAX) || 10;
    for (let i = 0; i < limit; i += 1) {
      const okOrNotFound = await request(app)
        .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
        .set('Authorization', authHeader(USER_RATE_LIMITED));
      expect(okOrNotFound.status).toBe(404);
    }

    const limitedRes = await request(app)
      .post(`/api/v1/sync/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_RATE_LIMITED));

    expect(limitedRes.status).toBe(429);
    expect(limitedRes.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
    expect(limitedRes.headers['retry-after']).toBeDefined();

    // Logs polling remains accessible even when trigger rate limit is active
    jest.spyOn(prisma.syncLog, 'findMany').mockResolvedValue([]);
    jest.spyOn(prisma.syncLog, 'count').mockResolvedValue(0);
    const logsRes = await request(app)
      .get('/api/v1/sync/logs')
      .set('Authorization', authHeader(USER_RATE_LIMITED));
    expect(logsRes.status).toBe(200);
  });
});
