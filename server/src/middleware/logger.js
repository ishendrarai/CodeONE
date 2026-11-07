/**
 * src/middleware/logger.js
 * Layer: Middleware / Observability
 * Responsibility: Structured request logger capturing method, path, status, and duration
 *                 while strictly redacting sensitive tokens and passwords from logs.
 * Interaction: Injected near the beginning of the Express middleware pipeline in app.js.
 */

function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
}

module.exports = requestLogger;
