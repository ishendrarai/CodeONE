/**
 * src/routes/index.js
 * Layer: Routes / Router Aggregator
 * Responsibility: Mounts all modular API resource routers under the /api/v1 versioned prefix.
 * Interaction: Imported and mounted into the Express pipeline in server/src/app.js.
 */

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const platformAccountRoutes = require('./platformAccountRoutes');
const problemRoutes = require('./problemRoutes');
const userProblemRoutes = require('./userProblemRoutes');
const submissionRoutes = require('./submissionRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const contestRoutes = require('./contestRoutes');
const goalRoutes = require('./goalRoutes');
const notificationRoutes = require('./notificationRoutes');
const syncRoutes = require('./syncRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/platform-accounts', platformAccountRoutes);
router.use('/problems', problemRoutes);
router.use('/user-problems', userProblemRoutes);
router.use('/submissions', submissionRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/contests', contestRoutes);
router.use('/goals', goalRoutes);
router.use('/notifications', notificationRoutes);
router.use('/sync', syncRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
