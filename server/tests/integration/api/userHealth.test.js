const request = require('supertest');
const app = require('../../../src/app');
const prisma = require('../../../src/config/database');
const { signAccessToken } = require('../../../src/utils/jwt');
const userService = require('../../../src/services/userService');

describe('P1 Health & User Profile APIs', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('GET /health returns 200 healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(typeof res.body.uptime).toBe('number');
  });

  test('GET /api/v1/health returns 200 healthy status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/v1/users/me rejects unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('AUTHENTICATION_ERROR');
  });

  test('GET /api/v1/users/me returns user profile for valid JWT', async () => {
    const mockUser = {
      id: 'user-123',
      name: 'Divyanshi',
      email: 'divyanshi@example.com',
      role: 'user',
      settings: { timezone: 'Asia/Kolkata' },
      platformAccounts: [],
    };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

    const token = signAccessToken({
      sub: 'user-123',
      email: 'divyanshi@example.com',
      role: 'USER',
      sid: 'sess-1',
    });
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('divyanshi@example.com');
  });

  test('PATCH /api/v1/users/me merges settings and strips disallowed fields like role', async () => {
    jest
      .spyOn(prisma.user, 'findUnique')
      .mockResolvedValue({ id: 'user-123', settings: { theme: 'dark' } });
    const updateSpy = jest.spyOn(prisma.user, 'update').mockResolvedValue({
      id: 'user-123',
      name: 'Divyanshi K',
      role: 'user',
      settings: { theme: 'dark', timezone: 'Asia/Kolkata' },
    });

    const token = signAccessToken({
      sub: 'user-123',
      email: 'divyanshi@example.com',
      role: 'USER',
      sid: 'sess-1',
    });
    const res = await request(app)
      .patch('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Divyanshi K', role: 'admin', settings: { timezone: 'Asia/Kolkata' } });

    expect(res.status).toBe(200);
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          name: 'Divyanshi K',
          settings: { theme: 'dark', timezone: 'Asia/Kolkata' },
        },
      })
    );
  });

  test('userService.updateUserSettings rejects empty payload with 400 VALIDATION_ERROR', async () => {
    await expect(userService.updateUserSettings('user-123', {})).rejects.toMatchObject({
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    });
  });
});
