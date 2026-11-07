/**
 * src/routes/submissionRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/submissions endpoint for querying paginated immutable submission logs.
 * Interaction: Protected by authMiddleware; delegates to submissionController.
 */

const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', submissionController.getSubmissions);

module.exports = router;

