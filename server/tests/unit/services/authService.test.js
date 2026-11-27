jest.mock('../../../src/config/database', () => ({
  $transaction: jest.fn(),
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  refreshToken: {
    findUnique: jest.fn(),
    updateMany: jest.fn(),
  },
  userSession: {
    updateMany: jest.fn(),
  },
}));

jest.mock('../../../src/utils/password', () => ({
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
}));

jest.mock('../../../src/services/auditService', () => ({
  logAuditEvent: jest.fn().mockResolvedValue(undefined),
}));

const prisma = require('../../../src/config/database');
const { hashPassword, verifyPassword } = require('../../../src/utils/password');
const authService = require('../../../src/services/authService');

describe('authService security controls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows enough time to acquire and complete the signup transaction', async () => {
    hashPassword.mockResolvedValue('hashed-password');
    const session = {
      user: {
        id: 'user-id',
        name: 'Astha Goswami',
        email: 'astha@example.com',
        role: 'USER',
        avatarUrl: null,
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };
    prisma.$transaction.mockResolvedValue(session);

    await expect(
      authService.register({
        name: 'Astha Goswami',
        email: 'astha@example.com',
        password: 'StrongPass123!',
      }),
    ).resolves.toEqual(session);

    expect(prisma.$transaction).toHaveBeenCalledWith(
      expect.any(Function),
      { maxWait: 10000, timeout: 15000 },
    );
  });

  it('locks the account on the fifth failed password attempt', async () => {
    let failedLoginAttempts = 0;
    let lockUntil = null;
    prisma.user.findUnique.mockImplementation(async () => ({
      id: 'user-id',
      email: 'user@example.com',
      passwordHash: 'argon2-hash',
      failedLoginAttempts,
      lockUntil,
    }));
    prisma.user.update.mockImplementation(async ({ data }) => {
      if (data.failedLoginAttempts?.increment) {
        failedLoginAttempts += data.failedLoginAttempts.increment;
      }
      if (Object.prototype.hasOwnProperty.call(data, 'lockUntil')) {
        lockUntil = data.lockUntil;
      }
      return { id: 'user-id', failedLoginAttempts, lockUntil };
    });
    verifyPassword.mockResolvedValue(false);

    for (let attempt = 1; attempt < 5; attempt += 1) {
      await expect(
        authService.login({ email: 'user@example.com', password: 'bad-password' })
      ).rejects.toMatchObject({ statusCode: 401 });
    }

    await expect(
      authService.login({ email: 'user@example.com', password: 'bad-password' })
    ).rejects.toMatchObject({
      statusCode: 423,
      retryAfterSeconds: 900,
    });
    expect(failedLoginAttempts).toBe(5);
    expect(lockUntil).toBeInstanceOf(Date);
  });

  it('revokes an entire token family when a revoked refresh token is reused', async () => {
    prisma.refreshToken.findUnique.mockResolvedValue({
      isRevoked: true,
      familyId: 'family-id',
      userId: 'user-id',
    });
    prisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });
    prisma.userSession.updateMany.mockResolvedValue({ count: 1 });
    prisma.$transaction.mockResolvedValue([]);

    await expect(authService.refreshSession('stolen-refresh-token')).rejects.toMatchObject({
      statusCode: 401,
    });

    expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { familyId: 'family-id', isRevoked: false } })
    );
    expect(prisma.userSession.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { familyId: 'family-id', revokedAt: null } })
    );
  });

  it('revokes a session family using the refresh cookie without an access token', async () => {
    prisma.refreshToken.findUnique.mockResolvedValue({
      userId: 'user-id',
      familyId: 'family-id',
    });
    prisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });
    prisma.userSession.updateMany.mockResolvedValue({ count: 1 });
    prisma.$transaction.mockResolvedValue([]);

    await authService.logout('refresh-cookie');

    expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { familyId: 'family-id', isRevoked: false } })
    );
    expect(prisma.userSession.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { familyId: 'family-id', revokedAt: null } })
    );
  });
});
