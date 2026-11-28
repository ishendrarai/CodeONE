/**
 * src/middleware/errorHandler.js
 * Layer: Middleware / Error Handling
 * Responsibility: Centralized error handling middleware formatting all unhandled
 *                 exceptions and domain errors into standardized JSON error envelopes.
 * Interaction: Registered as the final middleware in server/src/app.js.
 */

const { ERROR_CODES } = require('../utils/constants');

function isPrismaInitOrConnectivityError(err) {
  if (!err) return false;
  const prismaCode = err.errorCode || err.code;
  return (
    err.name === 'PrismaClientInitializationError' ||
    prismaCode === 'P1001' ||
    prismaCode === 'P1002' ||
    prismaCode === 'P1008' ||
    prismaCode === 'P1017'
  );
}

function errorHandler(err, req, res, _next) {
  const isProduction = process.env.NODE_ENV === 'production';

  let statusCode = err.statusCode || err.status || 500;
  let errorCode = err.code || ERROR_CODES.INTERNAL_ERROR;
  let clientMessage =
    isProduction && statusCode === 500 ? 'Internal server error.' : err.message || 'Internal server error.';
  let details = err.details;

  if (isPrismaInitOrConnectivityError(err)) {
    statusCode = 503;
    errorCode = ERROR_CODES.SOURCE_UNAVAILABLE;
    clientMessage = 'Database service is temporarily unavailable. Please try again later.';
    details = undefined;
  } else if (err.name === 'PrismaClientKnownRequestError' || /^P20\d{2}$/.test(String(err.code || ''))) {
    if (err.code === 'P2002') {
      statusCode = 409;
      errorCode = ERROR_CODES.CONFLICT;
      clientMessage = 'Resource already exists.';
    } else if (err.code === 'P2025') {
      statusCode = 404;
      errorCode = ERROR_CODES.NOT_FOUND;
      clientMessage = 'Requested resource was not found.';
    } else {
      statusCode = 500;
      errorCode = ERROR_CODES.INTERNAL_ERROR;
      clientMessage = 'Database operation failed.';
    }
    details = undefined;
  } else if (err.name === 'PrismaClientValidationError' || err.name === 'PrismaClientUnknownRequestError') {
    statusCode = err.name === 'PrismaClientValidationError' ? 400 : 500;
    errorCode = err.name === 'PrismaClientValidationError' ? ERROR_CODES.VALIDATION_ERROR : ERROR_CODES.INTERNAL_ERROR;
    clientMessage = err.name === 'PrismaClientValidationError' ? 'Invalid database query parameters.' : 'Database operation failed.';
    details = undefined;
  } else if (statusCode === 413 || err.type === 'entity.too.large') {
    statusCode = 413;
    errorCode = ERROR_CODES.VALIDATION_ERROR;
    clientMessage = 'Request payload exceeds maximum allowed size.';
  }

  // Log error telemetry internally
  console.error(`[Error] ${req.method} ${req.url} -> ${statusCode}:`, err.message);
  if (!isProduction && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: clientMessage,
      ...(details ? { details } : {}),
    },
  });
}

module.exports = errorHandler;
