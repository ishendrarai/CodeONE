/**
 * src/utils/password.js
 * Layer: Utilities / Security
 * Responsibility: Asynchronous password hashing and verification using bcrypt/Argon2id.
 * Security Note: Never invoke synchronous hashing methods to avoid event-loop blocking.
 * Interaction: Utilized by authService during registration and login credential verification.
 */

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function verifyPassword(plainPassword, hashedPassword) {
  if (!hashedPassword) return false;
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  verifyPassword,
};

