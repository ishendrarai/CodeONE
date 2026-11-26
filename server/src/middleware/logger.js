/**
 * src/middleware/logger.js
 * Layer: Middleware / Observability
 * Responsibility: Structured Pino request logger capturing method, path, status, and duration
 *                 while redacting sensitive tokens, cookies, and passwords from logs.
 * Interaction: Injected near the beginning of the Express middleware pipeline in app.js.
 */

const pino = require('pino');

const logger = pino({
  level: process.env.NODE_ENV === 'test' ? 'silent' : process.env.LOG_LEVEL || 'info',
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'body.password',
      'body.refreshToken',
      'body.token',
    ],
    censor: '[REDACTED]',
  },
});

function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - start;
    logger.info(
      {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs,
      },
      'HTTP request completed'
    );
  });
  next();
}

requestLogger.logger = logger;

module.exports = requestLogger;
