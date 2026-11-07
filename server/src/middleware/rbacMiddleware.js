/**
 * src/middleware/rbacMiddleware.js
 * Layer: Middleware / Authorization
 * Responsibility: Enforces 4-role default-deny Role-Based Access Control (RBAC).
 *                 Verifies that req.user.role satisfies required roles for the endpoint.
 * Interaction: Applied to privileged routes (e.g., /api/v1/admin/*).
 */

const { ERROR_CODES } = require('../utils/constants');

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        error: {
          code: ERROR_CODES.AUTHENTICATION_ERROR,
          message: 'User authentication required before role evaluation.',
        },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: ERROR_CODES.AUTHORIZATION_ERROR,
          message: 'Forbidden: Insufficient privileges for this resource.',
        },
      });
    }

    next();
  };
}

module.exports = requireRole;

