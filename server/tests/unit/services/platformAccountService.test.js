jest.mock('../../../src/config/database', () => ({
  platformAccount: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

jest.mock('../../../src/integrations/adapters/registry', () => ({
  getPlatformAdapter: jest.fn(),
}));

jest.mock('../../../src/services/auditService', () => ({
  logSecurityEvent: jest.fn(),
}));

const crypto = require('crypto');
const prisma = require('../../../src/config/database');
const { getPlatformAdapter } = require('../../../src/integrations/adapters/registry');
const platformAccountService = require('../../../src/services/platformAccountService');

describe('platformAccountService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPlatformAdapter.mockReturnValue({
      capabilities: () => ({ profile: true, ownershipChallenge: true }),
      verifyOwnership: jest.fn(),
    });
  });

  it('creates a short-lived challenge and persists only its hash', async () => {
    prisma.platformAccount.create.mockImplementation(async ({ data }) => ({
      id: 'account-id',
      platformName: data.platformName,
      username: data.username,
      verificationStatus: data.verificationStatus,
      isActive: true,
      syncFrequency: 3600,
      createdAt: new Date(),
    }));

    const result = await platformAccountService.linkAccount('user-id', 'codeforces', '  tourist  ');
    const saved = prisma.platformAccount.create.mock.calls[0][0].data;

    expect(saved.username).toBe('tourist');
    expect(saved.verificationTokenHash).toMatch(/^[a-f0-9]{64}$/);
    expect(saved.verificationTokenHash).not.toBe(result.verificationCode);
    expect(saved.verificationExpiresAt.getTime()).toBeGreaterThan(Date.now());
    expect(saved.verificationExpiresAt.getTime()).toBeLessThanOrEqual(Date.now() + 15 * 60 * 1000);
    expect(result.verificationCode).toMatch(/^[a-f0-9]{64}$/);
    expect(result).not.toHaveProperty('verificationTokenHash');
  });

  it('verifies ownership and clears the stored challenge after success', async () => {
    const verificationCode = 'one-time-code';
    const verificationTokenHash = crypto.createHash('sha256').update(verificationCode).digest('hex');
    const adapter = {
      capabilities: () => ({ profile: true, ownershipChallenge: true }),
      verifyOwnership: jest.fn().mockResolvedValue({
        verified: true,
        canonicalHandle: 'Tourist',
        profileSnapshot: { rating: 3850, rank: 'legendary grandmaster' },
      }),
    };
    getPlatformAdapter.mockReturnValue(adapter);
    prisma.platformAccount.findFirst.mockResolvedValue({
      id: 'account-id',
      userId: 'user-id',
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'unverified',
      verificationTokenHash,
      verificationExpiresAt: new Date(Date.now() + 60_000),
    });
    prisma.platformAccount.updateMany.mockResolvedValue({ count: 1 });
    prisma.platformAccount.update.mockResolvedValue({
      id: 'account-id',
      platformName: 'codeforces',
      username: 'Tourist',
      verificationStatus: 'verified',
      rating: 3850,
      rank: 'legendary grandmaster',
      verifiedAt: new Date(),
    });

    const result = await platformAccountService.verifyAccountOwnership(
      'user-id',
      'account-id',
      verificationCode
    );

    expect(prisma.platformAccount.findFirst).toHaveBeenCalledWith({
      where: { id: 'account-id', userId: 'user-id' },
    });
    expect(adapter.verifyOwnership).toHaveBeenCalledWith('tourist', verificationCode);
    expect(prisma.platformAccount.updateMany).toHaveBeenCalledWith({
      where: expect.objectContaining({
        id: 'account-id',
        userId: 'user-id',
        verificationTokenHash,
        verificationExpiresAt: { gt: expect.any(Date) },
      }),
      data: {
        verificationStatus: 'pending',
        verificationTokenHash: null,
        verificationExpiresAt: null,
      },
    });
    expect(prisma.platformAccount.update.mock.calls[0][0].data).toMatchObject({
      verificationStatus: 'verified',
      rating: 3850,
    });
    expect(result).toMatchObject({ verified: true, username: 'Tourist' });
  });

  it('does not call the external adapter for an invalid challenge', async () => {
    const adapter = getPlatformAdapter();
    prisma.platformAccount.findFirst.mockResolvedValue({
      id: 'account-id',
      userId: 'user-id',
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationTokenHash: crypto.createHash('sha256').update('correct-code').digest('hex'),
      verificationExpiresAt: new Date(Date.now() + 60_000),
    });

    await expect(
      platformAccountService.verifyAccountOwnership('user-id', 'account-id', 'wrong-code')
    ).rejects.toMatchObject({ statusCode: 400, code: 'VALIDATION_ERROR' });
    expect(adapter.verifyOwnership).not.toHaveBeenCalled();
    expect(prisma.platformAccount.update).not.toHaveBeenCalled();
    expect(prisma.platformAccount.updateMany).not.toHaveBeenCalled();
  });

  it('clears expired challenges and requires a new code', async () => {
    prisma.platformAccount.findFirst.mockResolvedValue({
      id: 'account-id',
      userId: 'user-id',
      verificationStatus: 'pending',
      verificationTokenHash: crypto.createHash('sha256').update('expired-code').digest('hex'),
      verificationExpiresAt: new Date(Date.now() - 1000),
    });

    await expect(
      platformAccountService.verifyAccountOwnership('user-id', 'account-id', 'expired-code')
    ).rejects.toMatchObject({ statusCode: 409, code: 'CONFLICT' });
    expect(prisma.platformAccount.update).toHaveBeenCalledWith({
      where: { id: 'account-id' },
      data: {
        verificationStatus: 'unverified',
        verificationTokenHash: null,
        verificationExpiresAt: null,
      },
    });
  });

  it('claims a challenge once so a replay cannot verify twice', async () => {
    const adapter = getPlatformAdapter();
    const verificationCode = 'one-time-code';
    prisma.platformAccount.findFirst.mockResolvedValue({
      id: 'account-id',
      userId: 'user-id',
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationTokenHash: crypto.createHash('sha256').update(verificationCode).digest('hex'),
      verificationExpiresAt: new Date(Date.now() + 60_000),
    });
    prisma.platformAccount.updateMany.mockResolvedValue({ count: 0 });

    await expect(
      platformAccountService.verifyAccountOwnership('user-id', 'account-id', verificationCode)
    ).rejects.toMatchObject({ statusCode: 409, code: 'CONFLICT' });
    expect(adapter.verifyOwnership).not.toHaveBeenCalled();
  });

  it('hides accounts owned by a different user', async () => {
    prisma.platformAccount.findFirst.mockResolvedValue(null);

    await expect(
      platformAccountService.verifyAccountOwnership('user-a', 'account-b', 'code')
    ).rejects.toMatchObject({ statusCode: 404, code: 'NOT_FOUND' });
    expect(prisma.platformAccount.findFirst).toHaveBeenCalledWith({
      where: { id: 'account-b', userId: 'user-a' },
    });
  });

  it('issues a replacement challenge when verification is requested without a code', async () => {
    prisma.platformAccount.findFirst.mockResolvedValue({
      id: 'account-id',
      userId: 'user-id',
      verificationStatus: 'pending',
    });
    prisma.platformAccount.update.mockImplementation(async ({ data }) => ({
      id: 'account-id',
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: data.verificationStatus,
      isActive: true,
      syncFrequency: 3600,
      createdAt: new Date(),
    }));

    const result = await platformAccountService.verifyAccountOwnership('user-id', 'account-id');
    const saved = prisma.platformAccount.update.mock.calls[0][0].data;

    expect(result.verificationCode).toMatch(/^[a-f0-9]{64}$/);
    expect(saved.verificationTokenHash).not.toBe(result.verificationCode);
    expect(result.verificationStatus).toBe('pending');
  });
});
