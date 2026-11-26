/**
 * src/middleware/authMiddleware.js
 * Layer: Middleware / Security
 * Responsibility: Validates 15-minute Bearer JWT access tokens from Authorization header
 *                 and attaches decoded { sub, role, sid } to req.user.
 * Interaction: Applied to all authenticated routes under /api/v1.
 */

const { verifyAccessToken } = require('../utils/jwt');
const { ERROR_CODES } = require('../utils/constants');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !/^Bearer\s+\S+$/i.test(authHeader)) {
    return res.status(401).json({
      success: false,
      error: {
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Missing or malformed Authorization header with Bearer token.',
      },
    });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');
  let user;
  try {
    const decoded = verifyAccessToken(token);
    const id = decoded.id || decoded.sub;
    const sessionId = decoded.sessionId || decoded.sid;
    if (!id || typeof decoded.email !== 'string' || !decoded.role || !sessionId) {
      throw new Error('Access token is missing required identity claims.');
    }

    user = {
      ...decoded,
      id,
      sub: id,
      email: decoded.email,
      role: String(decoded.role).toUpperCase(),
      sessionId,
      sid: sessionId,
    };
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: {
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Invalid, expired, or tampered access token.',
      },
    });
  }

  req.user = user;
  return next();
}

module.exports = authenticate;
module.exports.authenticate = authenticate;
module.exports.verifyJWT = authenticate;
