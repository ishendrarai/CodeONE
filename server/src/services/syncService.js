/**
 * src/services/syncService.js
 * Layer: Services / Ingestion & Orchestration
 * Responsibility: Orchestrates asynchronous platform synchronization via PlatformAdapter,
 *                 tracks execution states in sync_logs, and coordinates atomic Prisma persistence.
 * Interaction: Invoked by syncController; triggers goal and streak recalculations.
 */

const prisma = require('../config/database');

async function triggerAccountSync(userId, platformAccountId) {
  // Phase 4: Inserts sync_logs row (status: 'running') and enqueues worker task
  return { syncLogId: 'pending-uuid', status: 'running' };
}

async function triggerAllAccountsSync(userId) {
  return { enqueuedCount: 0 };
}

async function getSyncLogs(userId, platformAccountId = null) {
  return [];
}

module.exports = {
  triggerAccountSync,
  triggerAllAccountsSync,
  getSyncLogs,
};
