/**
 * src/middleware/rateLimiter.js
 * Layer: Middleware / Security
 * Responsibility: Implements IP/User rate limiting across public authentication
 *                 and general API routes to mitigate brute-force and DoS attacks.
 * Interaction: Injected into app.js and specific routes in authRoutes.js.
 */

const { ERROR_CODES } = require('../utils/constants');
const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

function createRateLimiter(options = {}) {
  const windowMs = options.windowMs || Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
  const limit = options.max || Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;

  return rateLimit({
    windowMs,
    limit,
    skipSuccessfulRequests: Boolean(options.skipSuccessfulRequests),
    ...(typeof options.keyGenerator === 'function' ? { keyGenerator: options.keyGenerator } : {}),
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res) => {
      const resetMs = req.rateLimit?.resetTime
        ? new Date(req.rateLimit.resetTime).getTime() - Date.now()
        : windowMs;
      const retryAfterSeconds = Math.max(1, Math.ceil(resetMs / 1000));
      res.set('Retry-After', String(retryAfterSeconds));

      return res.status(429).json({
        success: false,
        error: {
          code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
          message: 'Too many requests, please try again later.',
        },
      });
    },
  });
}

const authLimiter = createRateLimiter({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.AUTH_RATE_LIMIT_MAX) || 20,
  skipSuccessfulRequests: true,
});

const syncLimiter = createRateLimiter({
  windowMs: Number(process.env.SYNC_RATE_LIMIT_WINDOW_MS) || 60 * 1000,
  max: Number(process.env.SYNC_RATE_LIMIT_MAX) || 10,
  keyGenerator: (req) => (req.user?.sub ? `user:${req.user.sub}` : ipKeyGenerator(req.ip)),
});

const generalLimiter = createRateLimiter({});

module.exports = {
  createRateLimiter,
  authLimiter,
  syncLimiter,
  generalLimiter,
};
