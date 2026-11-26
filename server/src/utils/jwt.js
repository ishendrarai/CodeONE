/**
 * src/utils/jwt.js
 * Layer: Utilities / Security
 * Responsibility: Signs and verifies short-lived 15-minute JWT access tokens
 *                 and generates secure cryptographically random refresh tokens.
 * Interaction: Utilized by authService, authMiddleware, and token refresh workflows.
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function getAccessSecret() {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'test') return 'test-only-access-secret';
  throw new Error('JWT_ACCESS_SECRET (or JWT_SECRET) must be configured.');
}

function signAccessToken(payload) {
  return jwt.sign(payload, getAccessSecret(), {
    expiresIn: '15m',
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, getAccessSecret(), { algorithms: ['HS256'] });
}

function generateRefreshToken() {
  return crypto.randomBytes(40).toString('hex');
}

function generateId() {
  return crypto.randomUUID();
}

function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  generateId,
  hashToken,
};
