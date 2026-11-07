/**
 * src/middleware/authMiddleware.js
 * Layer: Middleware / Security
 * Responsibility: Validates 15-minute Bearer JWT access tokens from Authorization header
 *                 and attaches decoded { sub, role, sid } to req.user.
 * Interaction: Applied to all authenticated routes under /api/v1.
 */

const { verifyAccessToken } = require('../utils/jwt');
const { ERROR_CODES } = require('../utils/constants');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Missing or malformed Authorization header with Bearer token.',
      },
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { sub: userId, role, sid: sessionId }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: {
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Invalid, expired, or tampered access token.',
      },
    });
  }
}

module.exports = authMiddleware;
