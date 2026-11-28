/**
 * tests/integration/api/platformAccounts.test.js
 * Layer: Tests / Integration / API
 * Responsibility: Tests /api/v1/platform-accounts linking, PostgreSQL challenge persistence,
 *                 verification state transitions (unverified -> pending -> verified | failed),
 *                 canonical handle persistence, expiry, reuse prevention, duplicate handles,
 *                 IDOR protection, input validation, and external API failures.
 */

const request = require('supertest');
const app = require('../../../src/app');
const prisma = require('../../../src/config/database');
const { signAccessToken } = require('../../../src/utils/jwt');
const adapterRegistry = require('../../../src/integrations/adapters');
const { SourceUnavailableError } = require('../../../src/integrations/adapters/errors');

const USER_A = '11111111-1111-4111-8111-111111111111';
const USER_B = '22222222-2222-4222-8222-222222222222';
const ACCOUNT_ID = '33333333-3333-4333-8333-333333333333';

function authHeader(userId = USER_A) {
  const token = signAccessToken({
    sub: userId,
    email: `${userId}@example.com`,
    role: 'USER',
    sid: 'sess-test',
  });
  return `Bearer ${token}`;
}

describe('P1 Platform Account Linking & Verification APIs (/api/v1/platform-accounts)', () => {
  beforeEach(() => {
    jest.spyOn(prisma.auditLog, 'create').mockResolvedValue({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('1. Unauthorized request without JWT returns 401', async () => {
    const res = await request(app).get('/api/v1/platform-accounts');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('AUTHENTICATION_ERROR');
  });

  test('2. Invalid handle, unsupported platform, invalid UUID reject with 400 and unknown properties are stripped', async () => {
    const badHandleRes = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'bad handle!@#' });
    expect(badHandleRes.status).toBe(400);
    expect(badHandleRes.body.error.code).toBe('VALIDATION_ERROR');

    const badPlatformRes = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'leetcode', username: 'valid_user' });
    expect(badPlatformRes.status).toBe(400);
    expect(badPlatformRes.body.error.code).toBe('VALIDATION_ERROR');

    const badUuidRes = await request(app)
      .post('/api/v1/platform-accounts/not-a-uuid/verify')
      .set('Authorization', authHeader(USER_A))
      .send({ action: 'initiate' });
    expect(badUuidRes.status).toBe(400);
    expect(badUuidRes.body.error.code).toBe('VALIDATION_ERROR');

    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValue(null);
    const createSpy = jest.spyOn(prisma.platformAccount, 'create').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'unverified',
      verifiedAt: null,
      rating: null,
      rank: null,
      lastSynced: null,
      isActive: true,
      syncFrequency: 3600,
    });

    const strippedRes = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'tourist', extraProp: 'unexpected' });
    expect(strippedRes.status).toBe(201);
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.not.objectContaining({ extraProp: 'unexpected' }),
      })
    );
  });

  test('3. Successful handle linking normalizes handle, sets initial status to unverified, and persists challenge in DB', async () => {
    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValue(null);
    const createSpy = jest.spyOn(prisma.platformAccount, 'create').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'unverified',
      verifiedAt: null,
      rating: null,
      rank: null,
      lastSynced: null,
      isActive: true,
      syncFrequency: 3600,
    });

    const res = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: '  Tourist  ' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: USER_A,
          platformName: 'codeforces',
          username: 'tourist',
          verificationStatus: 'unverified',
          verificationToken: expect.stringMatching(/^CODEONE-VERIFY-[0-9A-F]{12}$/),
          verificationExpiresAt: expect.any(Date),
        }),
      })
    );
    expect(res.body.data.account.verificationStatus).toBe('unverified');
    expect(res.body.data.account.verificationToken).toBeUndefined();
    expect(res.body.data.verification.challengeCode).toMatch(/^CODEONE-VERIFY-[0-9A-F]{12}$/);
    expect(res.body.data.verification.instructions).toContain('Never share passwords or cookies');
  });

  test('4. Explicit challenge initiation transitions unverified -> pending and persists token in PostgreSQL', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'benq',
      verificationStatus: 'unverified',
      verificationToken: 'CODEONE-VERIFY-OLD000000000',
      verificationExpiresAt: new Date(Date.now() + 60000),
      verifiedAt: null,
      rating: null,
      rank: null,
    });
    const updateSpy = jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'benq',
      verificationStatus: 'pending',
      verifiedAt: null,
      rating: null,
      rank: null,
      lastSynced: null,
      isActive: true,
      syncFrequency: 3600,
    });

    const res = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ action: 'initiate' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.account.verificationStatus).toBe('pending');
    expect(res.body.data.verification.challengeCode).toMatch(/^CODEONE-VERIFY-[0-9A-F]{12}$/);
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: ACCOUNT_ID },
        data: expect.objectContaining({
          verificationStatus: 'pending',
          verificationToken: res.body.data.verification.challengeCode,
          verificationExpiresAt: expect.any(Date),
        }),
      })
    );
  });

  test('5. Successful ownership verification marks verified, persists canonical handle casing, and clears challenge token', async () => {
    const activeToken = 'CODEONE-VERIFY-ABCDEF123456';
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'um_nik',
      verificationStatus: 'pending',
      verificationToken: activeToken,
      verificationExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      verifiedAt: null,
      rating: null,
      rank: null,
    });

    const adapterVerifyMock = jest.fn().mockResolvedValue({
      verified: true,
      canonicalHandle: 'Um_nik',
      profileSnapshot: { rating: 3450, rank: 'legendary grandmaster' },
    });
    const adapterFetchMock = jest.fn().mockResolvedValue({
      canonicalHandle: 'Um_nik',
      rating: 3450,
      rank: 'legendary grandmaster',
    });

    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      verifyOwnership: adapterVerifyMock,
      fetchProfile: adapterFetchMock,
    });

    const updateSpy = jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'Um_nik',
      verificationStatus: 'verified',
      verifiedAt: new Date().toISOString(),
      rating: 3450,
      rank: 'legendary grandmaster',
    });

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: activeToken });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.success).toBe(true);
    expect(verifyRes.body.data.verified).toBe(true);
    expect(verifyRes.body.data.account.username).toBe('Um_nik');
    expect(verifyRes.body.data.account.verificationStatus).toBe('verified');
    expect(adapterVerifyMock).toHaveBeenCalledWith('um_nik', activeToken);
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          username: 'Um_nik',
          verificationStatus: 'verified',
          verificationToken: null,
          verificationExpiresAt: null,
          rating: 3450,
          rank: 'legendary grandmaster',
        }),
      })
    );
  });

  test('6. Confirmation with empty body uses persisted DB verificationToken across requests', async () => {
    const activeToken = 'CODEONE-VERIFY-DB1122334455';
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationToken: activeToken,
      verificationExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
      verifiedAt: null,
      rating: null,
      rank: null,
    });

    const verifyMock = jest.fn().mockResolvedValue({
      verified: true,
      canonicalHandle: 'tourist',
      profileSnapshot: { rating: 3700, rank: 'legendary grandmaster' },
    });

    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      verifyOwnership: verifyMock,
      fetchProfile: jest.fn().mockResolvedValue({
        canonicalHandle: 'tourist',
        rating: 3700,
        rank: 'legendary grandmaster',
      }),
    });

    jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      verifiedAt: new Date().toISOString(),
      rating: 3700,
      rank: 'legendary grandmaster',
    });

    const res = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({});

    expect(res.status).toBe(200);
    expect(verifyMock).toHaveBeenCalledWith('tourist', activeToken);
  });

  test('7. Incorrect verification code is rejected with 400', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationToken: 'CODEONE-VERIFY-ABCDEF123456',
      verificationExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      verifiedAt: null,
    });

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: 'CODEONE-VERIFY-WRONGCODE' });

    expect(verifyRes.status).toBe(400);
    expect(verifyRes.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('8. Public profile mismatch transitions account to failed and returns 400', async () => {
    const activeToken = 'CODEONE-VERIFY-ABCDEF123456';
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationToken: activeToken,
      verificationExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      verifiedAt: null,
    });

    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      verifyOwnership: jest.fn().mockResolvedValue({ verified: false, canonicalHandle: 'tourist' }),
    });
    const updateSpy = jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({});

    const res = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: activeToken });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { verificationStatus: 'failed' },
      })
    );
  });

  test('9. Expired verification code clears DB token, marks failed, and rejects with 410', async () => {
    const expiredToken = 'CODEONE-VERIFY-EXPIRED12345';
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationToken: expiredToken,
      verificationExpiresAt: new Date(Date.now() - 1000),
      verifiedAt: null,
    });
    const updateSpy = jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({});

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: expiredToken });

    expect(verifyRes.status).toBe(410);
    expect(verifyRes.body.error.message).toMatch(/expired/i);
    expect(updateSpy).toHaveBeenCalledWith({
      where: { id: ACCOUNT_ID },
      data: {
        verificationStatus: 'failed',
        verificationToken: null,
        verificationExpiresAt: null,
      },
    });
  });

  test('10. Reused verification code on verified account is rejected with 409 CONFLICT', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'verified',
      verificationToken: null,
      verificationExpiresAt: null,
      verifiedAt: new Date(),
    });

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: 'CODEONE-VERIFY-ABCDEF123456' });

    expect(verifyRes.status).toBe(409);
    expect(verifyRes.body.error.code).toBe('CONFLICT');
  });

  test('11. Duplicate handle verified by another user returns 409 CONFLICT (service check and P2002 fallback)', async () => {
    jest
      .spyOn(prisma.platformAccount, 'findFirst')
      .mockResolvedValueOnce(null) // existingForUser
      .mockResolvedValueOnce({ id: 'other-account-id' }); // existingOtherUser

    const res = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'tourist' });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('CONFLICT');

    // Simulate race condition hitting idx_platform_verified_handle_unique (Prisma P2002)
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValueOnce({
      id: ACCOUNT_ID,
      userId: USER_B,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationToken: 'CODEONE-VERIFY-ABCDEF123456',
      verificationExpiresAt: new Date(Date.now() + 60000),
      verifiedAt: null,
    });
    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValueOnce({
      verifyOwnership: jest.fn().mockResolvedValue({ verified: true, canonicalHandle: 'tourist' }),
      fetchProfile: jest.fn().mockResolvedValue({ canonicalHandle: 'tourist', rating: 3700, rank: 'lgm' }),
    });
    const p2002Error = new Error('Unique constraint failed');
    p2002Error.code = 'P2002';
    p2002Error.meta = { target: ['idx_platform_verified_handle_unique'] };
    jest.spyOn(prisma.platformAccount, 'update').mockRejectedValueOnce(p2002Error);

    const raceRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_B))
      .send({ verificationCode: 'CODEONE-VERIFY-ABCDEF123456' });

    expect(raceRes.status).toBe(409);
    expect(raceRes.body.error.code).toBe('CONFLICT');
  });

  test('12. Already linked platform for the same user returns 409 CONFLICT', async () => {
    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValueOnce({
      id: ACCOUNT_ID,
      username: 'tourist',
      verificationStatus: 'verified',
    });

    const res = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'another_handle' });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('CONFLICT');
  });

  test('13. Cross-user access attempt (IDOR) on verify and delete returns 403 AUTHORIZATION_ERROR', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationToken: 'CODEONE-VERIFY-1234567890AB',
      verificationExpiresAt: new Date(Date.now() + 60000),
    });

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_B))
      .send({ verificationCode: 'CODEONE-VERIFY-123456' });

    expect(verifyRes.status).toBe(403);
    expect(verifyRes.body.error.code).toBe('AUTHORIZATION_ERROR');

    const deleteRes = await request(app)
      .delete(`/api/v1/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_B));

    expect(deleteRes.status).toBe(403);
    expect(deleteRes.body.error.code).toBe('AUTHORIZATION_ERROR');
  });

  test('14. External API failure returns 503 SOURCE_UNAVAILABLE without clearing persisted challenge', async () => {
    const activeToken = 'CODEONE-VERIFY-RETRY123456';
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verificationToken: activeToken,
      verificationExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      verifiedAt: null,
    });
    const updateSpy = jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({});

    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      verifyOwnership: jest.fn().mockRejectedValue(new SourceUnavailableError('codeforces')),
    });

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: activeToken });

    expect(verifyRes.status).toBe(503);
    expect(verifyRes.body.error.code).toBe('SOURCE_UNAVAILABLE');
    expect(updateSpy).not.toHaveBeenCalled();
  });

  test('15. GET /api/v1/platform-accounts returns linked accounts for authenticated user', async () => {
    const mockAccounts = [
      {
        id: ACCOUNT_ID,
        userId: USER_A,
        platformName: 'codeforces',
        username: 'tourist',
        verificationStatus: 'verified',
      },
    ];
    jest.spyOn(prisma.platformAccount, 'findMany').mockResolvedValue(mockAccounts);

    const res = await request(app)
      .get('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockAccounts);
  });

  test('16. DELETE /api/v1/platform-accounts/:id unlinks account owned by caller', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
    });
    const deleteSpy = jest.spyOn(prisma.platformAccount, 'delete').mockResolvedValue({ id: ACCOUNT_ID });

    const res = await request(app)
      .delete(`/api/v1/platform-accounts/${ACCOUNT_ID}`)
      .set('Authorization', authHeader(USER_A));

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(deleteSpy).toHaveBeenCalledWith({ where: { id: ACCOUNT_ID } });
  });
});
