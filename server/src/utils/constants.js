/**
 * src/utils/constants.js
 * Layer: Utilities / Constants
 * Responsibility: Centralized system enumeration values, roles, platforms, and error codes.
 * Interaction: Referenced across middleware, controllers, services, and tests.
 */

const ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  AUDITOR: 'auditor',
};

const PLATFORMS = {
  CODEFORCES: 'codeforces',
  ATCODER: 'atcoder',
  CODEWARS: 'codewars',
};

const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  SOURCE_UNAVAILABLE: 'SOURCE_UNAVAILABLE',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
};

module.exports = {
  ROLES,
  PLATFORMS,
  ERROR_CODES,
};

