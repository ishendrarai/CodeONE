/**
 * src/routes/problemRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/problems endpoint for searching and filtering the global problem catalogue.
 * Interaction: Protected by authMiddleware; delegates to problemController.
 */

const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', problemController.getCatalogueProblems);

module.exports = router;
