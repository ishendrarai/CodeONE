/**
 * src/services/platformAccountService.js
 * Layer: Services / Domain Logic
 * Responsibility: Manages linking, zero-credential handle ownership verification,
 *                 and unlinking of competitive programming platform accounts.
 * Interaction: Invoked by platformAccountController; calls platform adapters.
 */

const prisma = require('../config/database');

async function getLinkedAccounts(userId) {
  return [];
}

async function linkAccount(userId, platform, username) {
  // Phase 4: Inserts platform_accounts with status='unverified'
  return null;
}

async function verifyAccountOwnership(userId, accountId, verificationToken) {
  // Phase 4: Dispatches to PlatformAdapter.verifyOwnership
  return null;
}

async function unlinkAccount(userId, accountId) {
  // Phase 4: Cascades removal of linked telemetry
  return true;
}

module.exports = {
  getLinkedAccounts,
  linkAccount,
  verifyAccountOwnership,
  unlinkAccount,
};

