/**
 * src/services/authService.js
 * Layer: Services / Domain Logic
 * Responsibility: Password and OAuth authentication, session issuance, and refresh-token rotation.
 */

const prisma = require('../config/database');
const { hashPassword, verifyPassword } = require('../utils/password');
const {
  signAccessToken,
  generateRefreshToken,
  generateId,
  hashToken,
} = require('../utils/jwt');
const { logAuditEvent } = require('./auditService');

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;

function authError(message, statusCode = 401, code = 'AUTHENTICATION_ERROR') {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  error.clearCookie = statusCode === 401;
  return error;
}

function audit(action, status, userId, metadata = {}) {
  const { ip, userAgent, metadata: details = {}, ...extra } = metadata;
  void logAuditEvent({
    userId,
    action,
    status,
    ipAddress: metadata.ipAddress || ip || null,
    userAgent: userAgent || null,
    metadata: { ...extra, ...details },
  });
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
  };
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function accessTokenFor(user, sessionId) {
  return signAccessToken({
    id: user.id,
    sub: user.id,
    email: user.email,
    role: user.role,
    sessionId,
    sid: sessionId,
  });
}

async function createSession(user, metadata = {}, transactionClient = null) {
  const sessionId = generateId();
  const familyId = generateId();
  const rawRefreshToken = generateRefreshToken();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

  const persistSession = async (tx) => {
    await tx.userSession.create({
      data: {
        id: sessionId,
        userId: user.id,
        familyId,
        ipAddress: metadata.ip || null,
        userAgent: metadata.userAgent || null,
        expiresAt,
        lastSeenAt: new Date(),
      },
    });
    await tx.refreshToken.create({
      data: {
        sessionId,
        userId: user.id,
        familyId,
        tokenHash: hashToken(rawRefreshToken),
        expiresAt,
      },
    });
  };
  if (transactionClient) {
    await persistSession(transactionClient);
  } else {
    await prisma.$transaction(persistSession);
  }

  return {
    user: publicUser(user),
    accessToken: accessTokenFor(user, sessionId),
    refreshToken: rawRefreshToken,
  };
}

async function register(userData, metadata = {}) {
  const email = normalizeEmail(userData.email);
  const passwordHash = await hashPassword(userData.password);

  try {
    const session = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: userData.name.trim(),
          email,
          passwordHash,
          role: 'USER',
        },
      });
      return createSession(user, metadata, tx);
    });
    audit('SIGNUP', 'success', session.user.id, metadata);
    return session;
  } catch (err) {
    if (err.code === 'P2002') {
      const conflict = new Error('An account with this email already exists.');
      conflict.statusCode = 409;
      conflict.code = 'CONFLICT';
      throw conflict;
    }
    throw err;
  }
}

async function login(credentials, metadata = {}) {
  const email = normalizeEmail(credentials.email);
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    audit('LOGIN_FAILED', 'failure', null, { ...metadata, metadata: { reason: 'invalid_credentials' } });
    throw authError('Email or password is incorrect.');
  }

  const now = new Date();
  if (user.lockUntil && user.lockUntil > now) {
    const retryAfterSeconds = Math.ceil((user.lockUntil.getTime() - now.getTime()) / 1000);
    const error = authError('Account is temporarily locked. Try again later.', 423, 'ACCOUNT_LOCKED');
    error.retryAfterSeconds = retryAfterSeconds;
    error.details = { retryAfterSeconds };
    throw error;
  }

  const passwordValid = await verifyPassword(credentials.password, user.passwordHash);
  if (!passwordValid) {
    if (user.lockUntil && user.lockUntil <= now) {
      await prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: 0, lockUntil: null },
      });
    }
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: { increment: 1 } },
    });
    const failedLoginAttempts = updatedUser.failedLoginAttempts;
    const lockUntil = failedLoginAttempts >= 5 ? new Date(now.getTime() + LOCKOUT_MS) : null;
    if (lockUntil) {
      await prisma.user.update({ where: { id: user.id }, data: { lockUntil } });
    }
    audit('LOGIN_FAILED', 'failure', user.id, {
      ...metadata,
      metadata: { reason: 'invalid_credentials', failedLoginAttempts },
    });
    if (lockUntil) {
      if (failedLoginAttempts === 5) {
        audit('ACCOUNT_LOCKED', 'failure', user.id, {
          ...metadata,
          metadata: { lockUntil: lockUntil.toISOString() },
        });
      }
      const error = authError('Account is temporarily locked. Try again later.', 423, 'ACCOUNT_LOCKED');
      error.retryAfterSeconds = Math.ceil(LOCKOUT_MS / 1000);
      error.details = { retryAfterSeconds: error.retryAfterSeconds };
      throw error;
    }
    throw authError('Email or password is incorrect.');
  }

  const passwordHash =
    user.passwordHash && /^\$argon2id\$/.test(user.passwordHash)
      ? user.passwordHash
      : await hashPassword(credentials.password);
  const session = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: { passwordHash, failedLoginAttempts: 0, lockUntil: null, lastLogin: now },
    });
    return createSession(updatedUser, metadata, tx);
  });
  audit('LOGIN_SUCCESS', 'success', user.id, metadata);
  return session;
}

async function refreshSession(rawRefreshToken, metadata = {}) {
  if (!rawRefreshToken) throw authError('Refresh token is missing.');

  const token = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashToken(rawRefreshToken) },
    include: { session: true, user: true },
  });
  if (!token) throw authError('Refresh token is invalid.');

  if (token.isRevoked) {
    await prisma.$transaction([
      prisma.refreshToken.updateMany({
        where: { familyId: token.familyId, isRevoked: false },
        data: { isRevoked: true },
      }),
      prisma.userSession.updateMany({
        where: { familyId: token.familyId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);
    audit('TOKEN_REUSE_DETECTED', 'failure', token.userId, {
      ...metadata,
      metadata: { familyId: token.familyId },
    });
    throw authError('Refresh token reuse detected. Please sign in again.');
  }

  const now = new Date();
  if (token.expiresAt <= now || token.session.expiresAt <= now || token.session.revokedAt) {
    throw authError('Refresh token has expired or been revoked.');
  }

  const nextRawToken = generateRefreshToken();
  const nextTokenId = generateId();
  const nextExpiresAt = new Date(now.getTime() + REFRESH_TOKEN_TTL_MS);
  const rotation = await prisma.$transaction(async (tx) => {
    const claimed = await tx.refreshToken.updateMany({
      where: { id: token.id, isRevoked: false, expiresAt: { gt: now } },
      data: { isRevoked: true },
    });
    if (claimed.count !== 1) {
      await tx.refreshToken.updateMany({
        where: { familyId: token.familyId, isRevoked: false },
        data: { isRevoked: true },
      });
      await tx.userSession.updateMany({
        where: { familyId: token.familyId, revokedAt: null },
        data: { revokedAt: now },
      });
      return { reused: true };
    }

    await tx.refreshToken.create({
      data: {
        id: nextTokenId,
        sessionId: token.sessionId,
        userId: token.userId,
        familyId: token.familyId,
        tokenHash: hashToken(nextRawToken),
        expiresAt: nextExpiresAt,
      },
    });
    await tx.refreshToken.update({
      where: { id: token.id },
      data: { replacedBy: nextTokenId },
    });
    await tx.userSession.update({
      where: { id: token.sessionId },
      data: { expiresAt: nextExpiresAt, lastSeenAt: now },
    });
    return { reused: false };
  });

  if (rotation.reused) {
    audit('TOKEN_REUSE_DETECTED', 'failure', token.userId, {
      ...metadata,
      metadata: { familyId: token.familyId },
    });
    throw authError('Refresh token reuse detected. Please sign in again.');
  }

  audit('TOKEN_REFRESH', 'success', token.userId, metadata);
  return {
    accessToken: accessTokenFor(token.user, token.sessionId),
    refreshToken: nextRawToken,
  };
}

async function logout(rawRefreshToken, userId, sessionId, metadata = {}) {
  let familyId = null;
  let actorUserId = userId || null;
  if (rawRefreshToken) {
    const token = await prisma.refreshToken.findUnique({
      where: { tokenHash: hashToken(rawRefreshToken) },
    });
    if (token && (!userId || token.userId === userId)) {
      familyId = token.familyId;
      actorUserId = token.userId;
    }
  }

  if (familyId) {
    await prisma.$transaction([
      prisma.refreshToken.updateMany({
        where: { familyId, isRevoked: false },
        data: { isRevoked: true },
      }),
      prisma.userSession.updateMany({
        where: { familyId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);
  } else if (sessionId) {
    await prisma.$transaction([
      prisma.refreshToken.updateMany({
        where: { sessionId, session: { userId }, isRevoked: false },
        data: { isRevoked: true },
      }),
      prisma.userSession.updateMany({
        where: { id: sessionId, userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);
  }
  audit('LOGOUT', 'success', actorUserId, metadata);
}

async function handleOAuthLogin(provider, profile, metadata = {}) {
  if (!profile.providerUserId || !profile.email || !profile.emailVerified) {
    const error = new Error('A verified email address is required to use this provider.');
    error.statusCode = 400;
    error.code = 'OAUTH_EMAIL_REQUIRED';
    throw error;
  }

  const email = normalizeEmail(profile.email);
  const session = await prisma.$transaction(async (tx) => {
    let account = await tx.oAuthAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider,
          providerUserId: String(profile.providerUserId),
        },
      },
      include: { user: true },
    });

    let user;
    if (account) {
      user = account.user;
    } else {
      user = await tx.user.findUnique({ where: { email } });
      const providerField = provider === 'google' ? 'googleId' : 'githubId';
      if (!user) {
        user = await tx.user.create({
          data: {
            name: profile.name || email.split('@')[0],
            email,
            avatarUrl: profile.avatarUrl || null,
            emailVerified: true,
            role: 'USER',
            [providerField]: String(profile.providerUserId),
          },
        });
      } else {
        user = await tx.user.update({
          where: { id: user.id },
          data: { [providerField]: String(profile.providerUserId), emailVerified: true },
        });
      }

      await tx.oAuthAccount.create({
        data: {
          userId: user.id,
          provider,
          providerUserId: String(profile.providerUserId),
        },
      });
    }

    user = await tx.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
    return createSession(user, metadata, tx);
  });

  audit('OAUTH_LOGIN', 'success', session.user.id, {
    ...metadata,
    metadata: { provider },
  });
  return session;
}

module.exports = {
  register,
  login,
  refreshSession,
  logout,
  handleOAuthLogin,
};
