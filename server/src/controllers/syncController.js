/**
 * src/controllers/syncController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles asynchronous platform synchronization triggers (HTTP 202 Accepted)
 *                 and sync_logs history polling.
 * Interaction: Receives HTTP request, delegates to syncService.
 */

const syncService = require('../services/syncService');

async function syncAllAccounts(req, res, next) {
  try {
    const result = await syncService.triggerAllAccountsSync(req.user.sub);
    return res.status(202).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function syncAccount(req, res, next) {
  try {
    const result = await syncService.triggerAccountSync(req.user.sub, req.params.id);
    return res.status(202).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function getLogs(req, res, next) {
  try {
    const logs = await syncService.getSyncLogs(req.user.sub, req.query.platformAccountId);
    return res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  syncAllAccounts,
  syncAccount,
  getLogs,
};

