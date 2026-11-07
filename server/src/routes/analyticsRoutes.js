/**
 * src/routes/analyticsRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/analytics endpoints for dashboard, streaks, ratings, and topics.
 * Interaction: Protected by authMiddleware; delegates to analyticsController.
 */

const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/dashboard', analyticsController.getDashboard);
router.get('/streaks', analyticsController.getStreaks);
router.get('/platforms/:platform', analyticsController.getPlatformAnalytics);
router.get('/ratings', analyticsController.getRatings);
router.get('/topics', analyticsController.getTopics);

module.exports = router;
