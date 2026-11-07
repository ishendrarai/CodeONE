/**
 * src/middleware/rateLimiter.js
 * Layer: Middleware / Security
 * Responsibility: Implements IP/User rate limiting across public authentication
 *                 and general API routes to mitigate brute-force and DoS attacks.
 * Interaction: Injected into app.js and specific routes in authRoutes.js.
 */

const { ERROR_CODES } = require('../utils/constants');

// Lightweight in-process rate limiter skeleton
function createRateLimiter(options = {}) {
  const windowMs = options.windowMs || 15 * 60 * 1000;
  const max = options.max || 100;
  const hits = new Map();

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress || 'unknown_ip';
    const now = Date.now();
    const record = hits.get(key) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }

    hits.set(key, record);

    if (record.count > max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        error: {
          code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
          message: 'Too many requests, please try again later.',
        },
      });
    }

    next();
  };
}

const authLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
});

const generalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

module.exports = {
  authLimiter,
  generalLimiter,
};
