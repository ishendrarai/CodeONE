/**
 * src/utils/password.js
 * Layer: Utilities / Security
 * Responsibility: Asynchronous password hashing and verification using bcrypt/Argon2id.
 * Security Note: Never invoke synchronous hashing methods to avoid event-loop blocking.
 * Interaction: Utilized by authService during registration and login credential verification.
 */

const argon2 = require('argon2');
const bcrypt = require('bcryptjs');

async function hashPassword(plainPassword) {
  return argon2.hash(plainPassword, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
}

async function verifyPassword(plainPassword, hashedPassword) {
  if (!hashedPassword) return false;
  if (/^\$2[aby]\$/.test(hashedPassword)) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  return argon2.verify(hashedPassword, plainPassword, { type: argon2.argon2id });
}

module.exports = {
  hashPassword,
  verifyPassword,
};

