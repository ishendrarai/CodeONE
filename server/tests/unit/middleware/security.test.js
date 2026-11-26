const express = require('express');
const request = require('supertest');
const { signAccessToken } = require('../../../src/utils/jwt');
const authenticate = require('../../../src/middleware/authMiddleware');
const authorizeRoles = require('../../../src/middleware/rbacMiddleware');
const { createRateLimiter } = require('../../../src/middleware/rateLimiter');

function response() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
}

describe('security middleware', () => {
  it('attaches normalized identity claims from a valid Bearer token', () => {
    const req = {
      headers: {
        authorization: `Bearer ${signAccessToken({
          id: 'user-id',
          email: 'user@example.com',
          role: 'USER',
          sessionId: 'session-id',
        })}`,
      },
    };
    const res = response();
    const next = jest.fn();

    authenticate(req, res, next);

    expect(req.user).toMatchObject({
      id: 'user-id',
      sub: 'user-id',
      email: 'user@example.com',
      role: 'USER',
      sessionId: 'session-id',
      sid: 'session-id',
    });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('returns 401 for a missing token and 403 for a disallowed role', () => {
    const missingResponse = response();
    authenticate({ headers: {} }, missingResponse, jest.fn());
    expect(missingResponse.status).toHaveBeenCalledWith(401);

    const forbiddenResponse = response();
    authorizeRoles('admin')({ user: { role: 'user' } }, forbiddenResponse, jest.fn());
    expect(forbiddenResponse.status).toHaveBeenCalledWith(403);
  });

  it('does not convert downstream errors into authentication failures', () => {
    const req = {
      headers: {
        authorization: `Bearer ${signAccessToken({
          id: 'user-id',
          email: 'user@example.com',
          role: 'USER',
          sessionId: 'session-id',
        })}`,
      },
    };
    const res = response();
    const downstreamError = new Error('downstream failure');

    expect(() => authenticate(req, res, () => {
      throw downstreamError;
    })).toThrow(downstreamError);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('limits requests using the configured express-rate-limit middleware', async () => {
    const app = express();
    app.use(createRateLimiter({ windowMs: 60_000, max: 1 }));
    app.get('/limited', (req, res) => res.status(200).send('ok'));

    await request(app).get('/limited').expect(200);
    await request(app).get('/limited').expect(429).expect(({ body }) => {
      expect(body.error.code).toBe('RATE_LIMIT_EXCEEDED');
    });
  });

  it('lets five failed login attempts reach the controller before rate limiting', async () => {
    const previousAuthMax = process.env.AUTH_RATE_LIMIT_MAX;
    const previousWindowMs = process.env.RATE_LIMIT_WINDOW_MS;
    delete process.env.AUTH_RATE_LIMIT_MAX;
    process.env.RATE_LIMIT_WINDOW_MS = '60000';

    let app;
    let controllerCalls = 0;
    try {
      jest.isolateModules(() => {
        const { authLimiter } = require('../../../src/middleware/rateLimiter');
        app = express();
        app.post('/api/v1/auth/login', authLimiter, (req, res) => {
          controllerCalls += 1;
          return res.status(controllerCalls === 5 ? 423 : 401).end();
        });
      });

      for (let attempt = 1; attempt <= 5; attempt += 1) {
        await request(app)
          .post('/api/v1/auth/login')
          .expect(attempt === 5 ? 423 : 401);
      }
      expect(controllerCalls).toBe(5);
    } finally {
      if (previousAuthMax === undefined) delete process.env.AUTH_RATE_LIMIT_MAX;
      else process.env.AUTH_RATE_LIMIT_MAX = previousAuthMax;
      if (previousWindowMs === undefined) delete process.env.RATE_LIMIT_WINDOW_MS;
      else process.env.RATE_LIMIT_WINDOW_MS = previousWindowMs;
    }
  });

  it('sanitizes PrismaClientInitializationError and P1001 to 503 without leaking local paths', () => {
    const errorHandler = require('../../../src/middleware/errorHandler');
    const prismaInitErr = new Error(
      "Invalid `prisma.user.findUnique()` invocation in C:\\Users\\dev\\server\\src\\app.js:\nCan't reach database server at `localhost:5432`"
    );
    prismaInitErr.name = 'PrismaClientInitializationError';
    prismaInitErr.errorCode = 'P1001';

    const res = response();
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    try {
      errorHandler(prismaInitErr, { method: 'GET', url: '/api/v1/users/me' }, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(503);
      const payload = res.json.mock.calls[0][0];
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('SOURCE_UNAVAILABLE');
      expect(payload.error.message).toBe(
        'Database service is temporarily unavailable. Please try again later.'
      );
      expect(JSON.stringify(payload)).not.toContain('C:\\Users');
      expect(JSON.stringify(payload)).not.toContain('prisma.');
    } finally {
      errSpy.mockRestore();
    }
  });

  it('enforces 100kb JSON body size limit on express app with 413 response', async () => {
    const app = require('../../../src/app');
    const oversizedPayload = { data: 'a'.repeat(110 * 1024) };

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(oversizedPayload);

    expect(res.status).toBe(413);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
