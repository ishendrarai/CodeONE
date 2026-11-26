/**
 * src/services/platformAccountService.js
 * Layer: Services / Domain Logic
 * Responsibility: Manages linking, zero-credential handle ownership verification,
 *                 and unlinking of competitive programming platform accounts.
 * Security: Enforces user_id ownership (IDOR protection), PostgreSQL-backed one-time challenges,
 *           expiration, reuse prevention, canonical handle persistence, and zero external credential storage.
 * Interaction: Invoked by platformAccountController; calls platform adapters via registry.
 */

const crypto = require('crypto');
const prisma = require('../config/database');
const adapterRegistry = require('../integrations/adapters');
const { logSecurityEvent } = require('./auditService');
const { ERROR_CODES } = require('../utils/constants');

const CHALLENGE_TTL_MS = 15 * 60 * 1000; // 15 minutes

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

const ACCOUNT_WITH_CHALLENGE_SELECT = {
  ...SAFE_ACCOUNT_SELECT,
  verificationToken: true,
  verificationExpiresAt: true,
};

function createServiceError(message, statusCode, code, details) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  if (details) err.details = details;
  return err;
}

function toSafeAccount(record) {
  if (!record) return record;
  const { verificationToken: _token, verificationExpiresAt: _exp, ...safeAccount } = record;
  return safeAccount;
}

function generateChallengeCode() {
  const token = crypto.randomBytes(6).toString('hex').toUpperCase();
  return `CODEONE-VERIFY-${token}`;
}

function codesMatch(expectedCode, providedCode) {
  if (typeof expectedCode !== 'string' || typeof providedCode !== 'string') {
    return false;
  }
  const normalizedExpected = Buffer.from(expectedCode.trim().toUpperCase(), 'utf8');
  const normalizedProvided = Buffer.from(providedCode.trim().toUpperCase(), 'utf8');
  if (normalizedExpected.length !== normalizedProvided.length) {
    return false;
  }
  return crypto.timingSafeEqual(normalizedExpected, normalizedProvided);
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

function mapUniqueConstraintError(err, platformName, username) {
  if (err && err.code === 'P2002') {
    const target = Array.isArray(err.meta?.target)
      ? err.meta.target.join(',')
      : String(err.meta?.target || '');
    if (target.includes('user_id') && target.includes('platform_name')) {
      return createServiceError(
        `You already have a ${platformName} account linked.`,
        409,
        ERROR_CODES.CONFLICT
      );
    }
    return createServiceError(
      `The ${platformName} handle '${username}' is already linked or verified by another CodeONE account.`,
      409,
      ERROR_CODES.CONFLICT
    );
  }
  return err;
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

  // Prevent linking a handle already verified by another user (aligned with idx_platform_verified_handle_unique)
  const existingOtherUser = await prisma.platformAccount.findFirst({
    where: {
      platformName,
      username: { equals: normalizedHandle, mode: 'insensitive' },
      verificationStatus: 'verified',
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

  const challengeCode = generateChallengeCode();
  const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS);

  let createdAccount;
  try {
    createdAccount = await prisma.platformAccount.create({
      data: {
        userId,
        platformName,
        username: normalizedHandle,
        verificationStatus: 'unverified',
        verificationToken: challengeCode,
        verificationExpiresAt: expiresAt,
      },
      select: SAFE_ACCOUNT_SELECT,
    });
  } catch (err) {
    throw mapUniqueConstraintError(err, platformName, normalizedHandle);
  }

  const account = toSafeAccount(createdAccount);
  const verification = buildVerificationInstructions(
    platformName,
    normalizedHandle,
    challengeCode,
    expiresAt
  );

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

  const accountRecord = await prisma.platformAccount.findUnique({
    where: { id: accountId },
    select: ACCOUNT_WITH_CHALLENGE_SELECT,
  });

  if (!accountRecord) {
    throw createServiceError('Platform account not found.', 404, ERROR_CODES.NOT_FOUND);
  }

  // Strict IDOR protection
  if (accountRecord.userId !== userId) {
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

  if (accountRecord.verificationStatus === 'verified') {
    throw createServiceError(
      'Platform account is already verified.',
      409,
      ERROR_CODES.CONFLICT
    );
  }

  // Explicit challenge initiation / regeneration transitions to 'pending' and persists in PostgreSQL
  const shouldInitiate =
    options.action === 'initiate' ||
    options.regenerate === true ||
    (!options.verificationCode &&
      options.action !== 'verify' &&
      !accountRecord.verificationToken &&
      accountRecord.verificationStatus === 'unverified');

  if (shouldInitiate) {
    const challengeCode = generateChallengeCode();
    const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS);

    const updatedPending = await prisma.platformAccount.update({
      where: { id: accountId },
      data: {
        verificationStatus: 'pending',
        verificationToken: challengeCode,
        verificationExpiresAt: expiresAt,
      },
      select: SAFE_ACCOUNT_SELECT,
    });

    await logSecurityEvent({
      actorUserId: userId,
      actorRole: 'user',
      action: 'PLATFORM_ACCOUNT_CHALLENGE_ISSUED',
      resourceType: 'platform_account',
      resourceId: accountId,
      status: 'success',
      metadata: {
        platformName: accountRecord.platformName,
        username: accountRecord.username,
      },
    });

    const verification = buildVerificationInstructions(
      accountRecord.platformName,
      accountRecord.username,
      challengeCode,
      expiresAt
    );

    return { account: toSafeAccount(updatedPending), verification };
  }

  if (accountRecord.verifiedAt && !accountRecord.verificationToken) {
    throw createServiceError(
      'Verification code has already been used. Request a new verification code.',
      409,
      ERROR_CODES.CONFLICT
    );
  }

  if (!accountRecord.verificationToken || !accountRecord.verificationExpiresAt) {
    throw createServiceError(
      'No active verification challenge found. Request a new verification code.',
      400,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  const expiresAtMs = new Date(accountRecord.verificationExpiresAt).getTime();
  if (Number.isNaN(expiresAtMs) || Date.now() > expiresAtMs) {
    await prisma.platformAccount.update({
      where: { id: accountId },
      data: {
        verificationStatus: 'failed',
        verificationToken: null,
        verificationExpiresAt: null,
      },
    });
    throw createServiceError(
      'Verification code has expired. Please request a new verification code.',
      410,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  if (
    options.verificationCode &&
    !codesMatch(accountRecord.verificationToken, options.verificationCode)
  ) {
    throw createServiceError(
      'Incorrect verification code provided.',
      400,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  // Retrieve public profile & verify challenge code via isolated PlatformAdapter
  const adapter = adapterRegistry.getAdapter(accountRecord.platformName);
  const verificationOutcome = await adapter.verifyOwnership(
    accountRecord.username,
    accountRecord.verificationToken
  );
  const isOwner =
    typeof verificationOutcome === 'boolean'
      ? verificationOutcome
      : Boolean(verificationOutcome && verificationOutcome.verified);

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
      metadata: {
        platformName: accountRecord.platformName,
        username: accountRecord.username,
      },
    });
    throw createServiceError(
      'Verification code was not found on your public profile.',
      400,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  let profileSnapshot =
    (verificationOutcome &&
      typeof verificationOutcome === 'object' &&
      verificationOutcome.profileSnapshot) || {
      rating: null,
      rank: null,
    };
  try {
    const fetchedProfile = await adapter.fetchProfile(accountRecord.username);
    if (fetchedProfile && typeof fetchedProfile === 'object') {
      profileSnapshot = { ...profileSnapshot, ...fetchedProfile };
    }
  } catch {
    // Non-fatal if profile snapshot fetch fails after ownership is verified
  }

  const canonicalUsername =
    (typeof profileSnapshot.canonicalHandle === 'string' && profileSnapshot.canonicalHandle.trim()) ||
    (verificationOutcome &&
      typeof verificationOutcome === 'object' &&
      typeof verificationOutcome.canonicalHandle === 'string' &&
      verificationOutcome.canonicalHandle.trim()) ||
    (typeof profileSnapshot.handle === 'string' && profileSnapshot.handle.trim()) ||
    accountRecord.username;

  let updatedAccount;
  try {
    updatedAccount = await prisma.platformAccount.update({
      where: { id: accountId },
      data: {
        username: canonicalUsername,
        verificationStatus: 'verified',
        verificationToken: null,
        verificationExpiresAt: null,
        verifiedAt: new Date(),
        rating: profileSnapshot.rating ?? accountRecord.rating,
        rank: profileSnapshot.rank ?? accountRecord.rank,
      },
      select: SAFE_ACCOUNT_SELECT,
    });
  } catch (err) {
    throw mapUniqueConstraintError(err, accountRecord.platformName, canonicalUsername);
  }

  await logSecurityEvent({
    actorUserId: userId,
    actorRole: 'user',
    action: 'PLATFORM_ACCOUNT_VERIFIED',
    resourceType: 'platform_account',
    resourceId: accountId,
    status: 'success',
    metadata: {
      platformName: accountRecord.platformName,
      username: canonicalUsername,
    },
  });

  return {
    account: toSafeAccount(updatedAccount),
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
  _CHALLENGE_TTL_MS: CHALLENGE_TTL_MS,
};
