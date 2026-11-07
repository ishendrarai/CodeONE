/**
 * src/utils/jwt.js
 * Layer: Utilities / Security
 * Responsibility: Signs and verifies short-lived 15-minute JWT access tokens
 *                 and generates secure cryptographically random refresh tokens.
 * Interaction: Utilized by authService, authMiddleware, and token refresh workflows.
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
}

function generateRefreshToken() {
  return crypto.randomBytes(40).toString('hex');
}

function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  hashToken,
};
