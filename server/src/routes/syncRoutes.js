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
const validate = require('../middleware/validationMiddleware');
const { uuidParamSchema, syncLogsQuerySchema } = require('../utils/validators');

router.use(authMiddleware);

router.post('/platform-accounts', syncController.syncAllAccounts);
router.post('/platform-accounts/:id', validate(uuidParamSchema, 'params'), syncController.syncAccount);
router.get('/logs', validate(syncLogsQuerySchema, 'query'), syncController.getLogs);

module.exports = router;

