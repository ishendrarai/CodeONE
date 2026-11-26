/**
 * src/services/platformAccountService.js
 * Layer: Services / Domain Logic
 * Responsibility: Manages linking, zero-credential handle ownership verification,
 *                 and unlinking of competitive programming platform accounts.
 * Security: Enforces user_id ownership (IDOR protection), cryptographic one-time challenges,
 *           expiration, reuse prevention, and zero external credential storage.
 * Interaction: Invoked by platformAccountController; calls platform adapters via registry.
 */

const crypto = require('crypto');
const prisma = require('../config/database');
const adapterRegistry = require('../integrations/adapters');
const { logSecurityEvent } = require('./auditService');
const { ERROR_CODES } = require('../utils/constants');

const CHALLENGE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// In-memory store for one-time verification challenges (keyed by platformAccountId).
// Stores SHA-256 hash alongside plaintext reference only for active TTL window, cleared on use/unlink.
const challengeStore = new Map();

const SAFE_ACCOUNT_SELECT = {
  id: true,
  userId: true,
  platformName: true,
  username: true,
  verificationStatus: true,
  verifiedAt: true,
  rating: true,
  rank: true,
  lastSynced: true,
  isActive: true,
  syncFrequency: true,
};

function createServiceError(message, statusCode, code, details) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  if (details) err.details = details;
  return err;
}

function hashChallengeCode(code) {
  return crypto.createHash('sha256').update(code).digest('hex');
}

function generateChallengeCode() {
  const token = crypto.randomBytes(6).toString('hex').toUpperCase();
  return `CODEONE-VERIFY-${token}`;
}

function buildVerificationInstructions(platformName, handle, challengeCode, expiresAt) {
  const fieldHint =
    platformName === 'codeforces'
      ? 'First Name, Last Name, or Organization field in your Codeforces Profile Settings'
      : `public profile bio/name on ${platformName}`;

  return {
    challengeCode,
    expiresAt: expiresAt.toISOString(),
    instructions: `Place '${challengeCode}' in your ${fieldHint} for handle '${handle}', then confirm verification within 15 minutes. Never share passwords or cookies.`,
  };
}

function issueChallenge(accountId, userId, platformName, handle) {
  const challengeCode = generateChallengeCode();
  const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS);

  challengeStore.set(accountId, {
    userId,
    platformName,
    handle,
    codeHash: hashChallengeCode(challengeCode),
    plainCode: challengeCode,
    expiresAt: expiresAt.getTime(),
    usedAt: null,
  });

  return buildVerificationInstructions(platformName, handle, challengeCode, expiresAt);
}

function normalizePlatformHandle(adapter, platformName, rawHandle) {
  const trimmed = adapter.normalizeHandle(rawHandle);
  if (platformName === 'codeforces') {
    if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(trimmed)) {
      throw createServiceError(
        'Invalid Codeforces handle format. Handles must be 3-24 characters (letters, numbers, _, -, .).',
        400,
        ERROR_CODES.VALIDATION_ERROR
      );
    }
    return trimmed.toLowerCase();
  }
  return trimmed;
}

async function getLinkedAccounts(userId) {
  return prisma.platformAccount.findMany({
    where: { userId },
    select: SAFE_ACCOUNT_SELECT,
    orderBy: { platformName: 'asc' },
  });
}

async function linkAccount(userId, platform, username) {
  const platformName = typeof platform === 'string' ? platform.trim().toLowerCase() : '';
  const adapter = adapterRegistry.getAdapter(platformName);
  const normalizedHandle = normalizePlatformHandle(adapter, platformName, username);

  // Prevent linking a second account for the same platform by the same user
  const existingForUser = await prisma.platformAccount.findFirst({
    where: { userId, platformName },
    select: { id: true, username: true, verificationStatus: true },
  });

  if (existingForUser) {
    throw createServiceError(
      `You already have a ${platformName} account linked (${existingForUser.username}).`,
      409,
      ERROR_CODES.CONFLICT
    );
  }

  // Prevent linking a handle already claimed by another user
  const existingOtherUser = await prisma.platformAccount.findFirst({
    where: {
      platformName,
      username: { equals: normalizedHandle, mode: 'insensitive' },
      NOT: { userId },
    },
    select: { id: true },
  });

  if (existingOtherUser) {
    throw createServiceError(
      `The ${platformName} handle '${normalizedHandle}' is already linked to another CodeONE account.`,
      409,
      ERROR_CODES.CONFLICT
    );
  }

  const account = await prisma.platformAccount.create({
    data: {
      userId,
      platformName,
      username: normalizedHandle,
      verificationStatus: 'pending',
    },
    select: SAFE_ACCOUNT_SELECT,
  });

  const verification = issueChallenge(account.id, userId, platformName, normalizedHandle);

  await logSecurityEvent({
    actorUserId: userId,
    actorRole: 'user',
    action: 'PLATFORM_ACCOUNT_LINK_INITIATED',
    resourceType: 'platform_account',
    resourceId: account.id,
    status: 'success',
    metadata: { platformName, username: normalizedHandle },
  });

  return {
    account,
    verification,
  };
}

async function verifyAccountOwnership(userId, accountId, payload = {}) {
  const options = typeof payload === 'string' ? { verificationCode: payload } : payload || {};

  const account = await prisma.platformAccount.findUnique({
    where: { id: accountId },
    select: SAFE_ACCOUNT_SELECT,
  });

  if (!account) {
    throw createServiceError('Platform account not found.', 404, ERROR_CODES.NOT_FOUND);
  }

  // Strict IDOR protection
  if (account.userId !== userId) {
    await logSecurityEvent({
      actorUserId: userId,
      actorRole: 'user',
      action: 'PLATFORM_ACCOUNT_VERIFY_IDOR_BLOCKED',
      resourceType: 'platform_account',
      resourceId: accountId,
      status: 'denied',
    });
    throw createServiceError(
      'You do not have permission to access this platform account.',
      403,
      ERROR_CODES.AUTHORIZATION_ERROR
    );
  }

  if (account.verificationStatus === 'verified') {
    throw createServiceError(
      'Platform account is already verified.',
      409,
      ERROR_CODES.CONFLICT
    );
  }

  // Allow explicit challenge (re-)initiation
  if (options.action === 'initiate' || options.regenerate) {
    await prisma.platformAccount.update({
      where: { id: accountId },
      data: { verificationStatus: 'pending' },
      select: SAFE_ACCOUNT_SELECT,
    });
    const verification = issueChallenge(account.id, userId, account.platformName, account.username);
    return { account: { ...account, verificationStatus: 'pending' }, verification };
  }

  const challenge = challengeStore.get(accountId);

  if (!challenge) {
    throw createServiceError(
      'No active verification challenge found. Request a new verification code.',
      400,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  if (challenge.usedAt !== null) {
    throw createServiceError(
      'Verification code has already been used. Request a new verification code.',
      409,
      ERROR_CODES.CONFLICT
    );
  }

  if (Date.now() > challenge.expiresAt) {
    challengeStore.delete(accountId);
    await prisma.platformAccount.update({
      where: { id: accountId },
      data: { verificationStatus: 'failed' },
    });
    throw createServiceError(
      'Verification code has expired. Please request a new verification code.',
      410,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  if (options.verificationCode) {
    const providedHash = hashChallengeCode(options.verificationCode.trim());
    if (providedHash !== challenge.codeHash) {
      throw createServiceError(
        'Incorrect verification code provided.',
        400,
        ERROR_CODES.VALIDATION_ERROR
      );
    }
  }

  // Retrieve public profile & verify challenge code via isolated PlatformAdapter
  const adapter = adapterRegistry.getAdapter(account.platformName);
  const isOwner = await adapter.verifyOwnership(account.username, challenge.plainCode);

  if (!isOwner) {
    await prisma.platformAccount.update({
      where: { id: accountId },
      data: { verificationStatus: 'failed' },
    });
    await logSecurityEvent({
      actorUserId: userId,
      actorRole: 'user',
      action: 'PLATFORM_ACCOUNT_VERIFY_FAILED',
      resourceType: 'platform_account',
      resourceId: accountId,
      status: 'failure',
      metadata: { platformName: account.platformName, username: account.username },
    });
    throw createServiceError(
      'Verification code was not found on your public profile.',
      400,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  // Consume one-time code immediately to prevent reuse
  challenge.usedAt = Date.now();
  challenge.plainCode = null;

  let profileSnapshot = { rating: null, rank: null };
  try {
    profileSnapshot = await adapter.fetchProfile(account.username);
  } catch {
    // Non-fatal if profile snapshot fetch fails after ownership is verified
  }

  const updatedAccount = await prisma.platformAccount.update({
    where: { id: accountId },
    data: {
      verificationStatus: 'verified',
      verifiedAt: new Date(),
      rating: profileSnapshot.rating ?? account.rating,
      rank: profileSnapshot.rank ?? account.rank,
    },
    select: SAFE_ACCOUNT_SELECT,
  });

  await logSecurityEvent({
    actorUserId: userId,
    actorRole: 'user',
    action: 'PLATFORM_ACCOUNT_VERIFIED',
    resourceType: 'platform_account',
    resourceId: accountId,
    status: 'success',
    metadata: { platformName: account.platformName, username: account.username },
  });

  return {
    account: updatedAccount,
    verified: true,
  };
}

async function unlinkAccount(userId, accountId) {
  const account = await prisma.platformAccount.findUnique({
    where: { id: accountId },
    select: { id: true, userId: true, platformName: true, username: true },
  });

  if (!account) {
    throw createServiceError('Platform account not found.', 404, ERROR_CODES.NOT_FOUND);
  }

  if (account.userId !== userId) {
    await logSecurityEvent({
      actorUserId: userId,
      actorRole: 'user',
      action: 'PLATFORM_ACCOUNT_UNLINK_IDOR_BLOCKED',
      resourceType: 'platform_account',
      resourceId: accountId,
      status: 'denied',
    });
    throw createServiceError(
      'You do not have permission to unlink this platform account.',
      403,
      ERROR_CODES.AUTHORIZATION_ERROR
    );
  }

  challengeStore.delete(accountId);

  await prisma.platformAccount.delete({
    where: { id: accountId },
  });

  await logSecurityEvent({
    actorUserId: userId,
    actorRole: 'user',
    action: 'PLATFORM_ACCOUNT_UNLINKED',
    resourceType: 'platform_account',
    resourceId: accountId,
    status: 'success',
    metadata: { platformName: account.platformName, username: account.username },
  });

  return true;
}

module.exports = {
  getLinkedAccounts,
  linkAccount,
  verifyAccountOwnership,
  unlinkAccount,
  // Exported for deterministic unit/integration testing
  _challengeStore: challengeStore,
  _CHALLENGE_TTL_MS: CHALLENGE_TTL_MS,
};
