/**
 * tests/integration/api/platformAccounts.test.js
 * Layer: Tests / Integration / API
 * Responsibility: Tests /api/v1/platform-accounts linking, verification, expiry, reuse prevention,
 *                 duplicate handles, IDOR protection, input validation, and external API failures.
 */

const request = require('supertest');
const app = require('../../../src/app');
const prisma = require('../../../src/config/database');
const { signAccessToken } = require('../../../src/utils/jwt');
const adapterRegistry = require('../../../src/integrations/adapters');
const platformAccountService = require('../../../src/services/platformAccountService');
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
    platformAccountService._challengeStore.clear();
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

  test('2. Invalid handle format returns 400 VALIDATION_ERROR', async () => {
    const res = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'bad handle!@#' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('3. Successful handle linking normalizes handle and generates cryptographic one-time code', async () => {
    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValue(null);
    const createSpy = jest.spyOn(prisma.platformAccount, 'create').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
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
          verificationStatus: 'pending',
        }),
      })
    );
    expect(res.body.data.verification.challengeCode).toMatch(/^CODEONE-VERIFY-[0-9A-F]{12}$/);
    expect(res.body.data.verification.instructions).toContain('Never share passwords or cookies');
  });

  test('4. Successful ownership verification marks account as verified', async () => {
    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prisma.platformAccount, 'create').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verifiedAt: null,
      rating: null,
      rank: null,
      lastSynced: null,
      isActive: true,
      syncFrequency: 3600,
    });

    const linkRes = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'Tourist' });

    const code = linkRes.body.data.verification.challengeCode;

    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
      verifiedAt: null,
      rating: null,
      rank: null,
    });

    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      verifyOwnership: jest.fn().mockResolvedValue(true),
      fetchProfile: jest.fn().mockResolvedValue({ rating: 3700, rank: 'legendary grandmaster' }),
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

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: code });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.success).toBe(true);
    expect(verifyRes.body.data.verified).toBe(true);
    expect(verifyRes.body.data.account.verificationStatus).toBe('verified');
  });

  test('5. Incorrect verification code is rejected with 400', async () => {
    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prisma.platformAccount, 'create').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
    });

    await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'tourist' });

    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
    });

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: 'CODEONE-VERIFY-WRONGCODE' });

    expect(verifyRes.status).toBe(400);
    expect(verifyRes.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('6. Expired verification code is rejected with 410', async () => {
    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prisma.platformAccount, 'create').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
    });

    const linkRes = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'tourist' });

    // Force challenge expiration
    const entry = platformAccountService._challengeStore.get(ACCOUNT_ID);
    entry.expiresAt = Date.now() - 1000;

    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
    });
    jest.spyOn(prisma.platformAccount, 'update').mockResolvedValue({});

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: linkRes.body.data.verification.challengeCode });

    expect(verifyRes.status).toBe(410);
    expect(verifyRes.body.error.message).toMatch(/expired/i);
  });

  test('7. Reused verification code is rejected with 409', async () => {
    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prisma.platformAccount, 'create').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
    });

    const linkRes = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'tourist' });
    const code = linkRes.body.data.verification.challengeCode;

    const entry = platformAccountService._challengeStore.get(ACCOUNT_ID);
    entry.usedAt = Date.now() - 5000;

    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
    });

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: code });

    expect(verifyRes.status).toBe(409);
    expect(verifyRes.body.error.code).toBe('CONFLICT');
  });

  test('8. Duplicate handle linked by another user returns 409 CONFLICT', async () => {
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
  });

  test('9. Already linked platform for the same user returns 409 CONFLICT', async () => {
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

  test('10. Cross-user access attempt (IDOR) on verify and delete returns 403 AUTHORIZATION_ERROR', async () => {
    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
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

  test('11. External API failure returns 503 SOURCE_UNAVAILABLE without consuming challenge code', async () => {
    jest.spyOn(prisma.platformAccount, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prisma.platformAccount, 'create').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
    });

    const linkRes = await request(app)
      .post('/api/v1/platform-accounts')
      .set('Authorization', authHeader(USER_A))
      .send({ platform: 'codeforces', username: 'tourist' });
    const code = linkRes.body.data.verification.challengeCode;

    jest.spyOn(prisma.platformAccount, 'findUnique').mockResolvedValue({
      id: ACCOUNT_ID,
      userId: USER_A,
      platformName: 'codeforces',
      username: 'tourist',
      verificationStatus: 'pending',
    });

    jest.spyOn(adapterRegistry, 'getAdapter').mockReturnValue({
      verifyOwnership: jest.fn().mockRejectedValue(new SourceUnavailableError('codeforces')),
    });

    const verifyRes = await request(app)
      .post(`/api/v1/platform-accounts/${ACCOUNT_ID}/verify`)
      .set('Authorization', authHeader(USER_A))
      .send({ verificationCode: code });

    expect(verifyRes.status).toBe(503);
    expect(verifyRes.body.error.code).toBe('SOURCE_UNAVAILABLE');
    // Code must remain unused so user can retry when external API recovers
    expect(platformAccountService._challengeStore.get(ACCOUNT_ID).usedAt).toBeNull();
  });

  test('12. GET /api/v1/platform-accounts returns linked accounts for authenticated user', async () => {
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

  test('13. DELETE /api/v1/platform-accounts/:id unlinks account owned by caller', async () => {
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
