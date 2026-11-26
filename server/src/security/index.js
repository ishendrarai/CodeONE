const authMiddleware = require('../middleware/authMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { authLimiter, generalLimiter, createRateLimiter } = require('../middleware/rateLimiter');
const { logAuditEvent } = require('../services/auditService');

module.exports = {
  authenticate: authMiddleware.authenticate,
  verifyJWT: authMiddleware.verifyJWT,
  authorizeRoles: rbacMiddleware.authorizeRoles,
  authLimiter,
  generalLimiter,
  createRateLimiter,
  logAuditEvent,
};
