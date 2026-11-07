/**
 * src/routes/syncRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/sync endpoints for asynchronous sync dispatch and sync_logs inspection.
 * Interaction: Protected by authMiddleware; returns HTTP 202 Accepted; delegates to syncController.
 */

const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/platform-accounts', syncController.syncAllAccounts);
router.post('/platform-accounts/:id', syncController.syncAccount);
router.get('/logs', syncController.getLogs);

module.exports = router;

