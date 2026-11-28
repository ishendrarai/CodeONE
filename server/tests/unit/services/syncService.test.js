jest.mock('../../../src/config/database', () => ({
  $transaction: jest.fn(),
  platformAccount: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  syncLog: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('../../../src/integrations/adapters/registry', () => ({
  getPlatformAdapter: jest.fn(),
}));

jest.mock('../../../src/services/auditService', () => ({
  logSecurityEvent: jest.fn(),
}));

const prisma = require('../../../src/config/database');
const { getPlatformAdapter } = require('../../../src/integrations/adapters/registry');
const syncService = require('../../../src/services/syncService');

describe('syncService', () => {
  let transaction;

  beforeEach(() => {
    jest.clearAllMocks();
    syncService._activeSyncLocks.clear();
    transaction = {
      $executeRaw: jest.fn().mockResolvedValue(1),
      platformAccount: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      syncLog: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };
    prisma.$transaction.mockImplementation((callback) => callback(transaction));
    getPlatformAdapter.mockReturnValue({
      fetchProfile: jest.fn().mockResolvedValue({
        canonicalHandle: 'Tourist',
        rating: 3850,
        rank: 'legendary grandmaster',
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates a sync log and schedules only one job for an owned verified account', async () => {
    const scheduled = [];
    jest.spyOn(global, 'setImmediate').mockImplementation((callback) => {
      scheduled.push(callback);
      return 0;
    });
    prisma.platformAccount.findUnique.mockResolvedValue({
      id: 'account-id',
      userId: 'user-id',
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      isActive: true,
    });
    transaction.syncLog.findFirst.mockResolvedValue(null);
    transaction.syncLog.create.mockResolvedValue({
      id: 'sync-id',
      platformAccountId: 'account-id',
      status: 'running',
      startedAt: new Date(),
    });

    await expect(syncService.triggerAccountSync('user-id', 'account-id')).resolves.toMatchObject({
      syncLogId: 'sync-id',
      platformAccountId: 'account-id',
      status: 'running',
      lifecycleStatus: 'RUNNING',
    });
    expect(transaction.$executeRaw).toHaveBeenCalledTimes(1);
    expect(transaction.syncLog.create).toHaveBeenCalledWith(expect.objectContaining({
      data: {
        platformAccountId: 'account-id',
        status: 'running',
        recordsFetched: 0,
      },
      select: expect.any(Object),
    }));
    expect(scheduled).toHaveLength(1);
  });

  it('returns the active sync instead of enqueueing duplicates', async () => {
    const scheduled = [];
    jest.spyOn(global, 'setImmediate').mockImplementation((callback) => {
      scheduled.push(callback);
      return 0;
    });
    prisma.platformAccount.findUnique.mockResolvedValue({
      id: 'account-id',
      userId: 'user-id',
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      isActive: true,
    });
    transaction.syncLog.findFirst.mockResolvedValue({
      id: 'existing-sync',
      status: 'running',
    });

    await expect(syncService.triggerAccountSync('user-id', 'account-id')).rejects.toMatchObject({
      statusCode: 409,
      code: 'CONFLICT',
    });
    expect(transaction.syncLog.create).not.toHaveBeenCalled();
    expect(scheduled).toHaveLength(0);
  });

  it('updates profile data and marks the sync successful', async () => {
    const adapter = getPlatformAdapter();
    prisma.syncLog.findUnique.mockResolvedValue({
      id: 'sync-id',
      platformAccount: {
        id: 'account-id',
        platformName: 'codeforces',
        username: 'tourist',
        verificationStatus: 'verified',
        isActive: true,
      },
    });
    transaction.syncLog.update.mockResolvedValue({
      id: 'sync-id',
      status: 'success',
      recordsFetched: 1,
    });

    await expect(syncService.processSyncLog('sync-id')).resolves.toMatchObject({
      id: 'sync-id',
      status: 'success',
      recordsFetched: 1,
    });
    expect(adapter.fetchProfile).toHaveBeenCalledWith('tourist');
    expect(transaction.platformAccount.update).toHaveBeenCalledWith({
      where: { id: 'account-id' },
      data: {
        username: 'Tourist',
        rating: 3850,
        rank: 'legendary grandmaster',
        lastSynced: expect.any(Date),
      },
    });
  });

  it('persists upstream failures as failed sync logs', async () => {
    getPlatformAdapter.mockReturnValue({
      fetchProfile: jest.fn().mockRejectedValue(Object.assign(new Error('Codeforces API is unavailable.'), {
        code: 'SOURCE_UNAVAILABLE',
      })),
    });
    prisma.syncLog.findUnique.mockResolvedValue({
      id: 'sync-id',
      platformAccount: {
        id: 'account-id',
        platformName: 'codeforces',
        username: 'tourist',
        verificationStatus: 'verified',
        isActive: true,
      },
    });
    prisma.syncLog.update.mockResolvedValue({
      id: 'sync-id',
      status: 'failed',
      errorMessage: 'Codeforces API is unavailable.',
    });

    await expect(syncService.processSyncLog('sync-id')).resolves.toMatchObject({
      status: 'failed',
      errorMessage: 'Codeforces API is unavailable.',
    });
    expect(prisma.syncLog.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'sync-id' },
      data: expect.objectContaining({ status: 'failed' }),
    }));
  });

  it('does not disclose or sync another user’s account', async () => {
    prisma.platformAccount.findUnique.mockResolvedValue(null);

    await expect(syncService.triggerAccountSync('user-a', 'account-b')).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT_FOUND',
    });
    expect(transaction.syncLog.create).not.toHaveBeenCalled();
  });
});
