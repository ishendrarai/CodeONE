/**
 * src/middleware/errorHandler.js
 * Layer: Middleware / Error Handling
 * Responsibility: Centralized error handling middleware formatting all unhandled
 *                 exceptions and domain errors into standardized JSON error envelopes.
 * Interaction: Registered as the final middleware in server/src/app.js.
 */

const { ERROR_CODES } = require('../utils/constants');

function errorHandler(err, req, res, next) {
  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || ERROR_CODES.INTERNAL_ERROR;

  // Log error telemetry internally
  console.error(`[Error] ${req.method} ${req.url} -> ${statusCode}:`, err.message);
  if (!isProduction && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: isProduction && statusCode === 500 ? 'Internal server error.' : err.message,
      ...(err.details ? { details: err.details } : {}),
    },
  });
}

module.exports = errorHandler;
