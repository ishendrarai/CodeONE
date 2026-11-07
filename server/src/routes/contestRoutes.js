/**
 * src/routes/contestRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/contests and /api/v1/contest-participations endpoints.
 * Interaction: Protected by authMiddleware; delegates to contestController.
 */

const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contestController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', contestController.getContests);
router.get('/participations', contestController.getParticipations);

module.exports = router;
