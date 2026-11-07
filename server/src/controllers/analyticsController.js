/**
 * src/controllers/analyticsController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles analytics dashboard queries, streaks, 365-day heatmaps,
 *                 platform breakdowns, and Level 1 topic weakness insights.
 * Interaction: Receives HTTP request, delegates to analyticsService, streakService, and weaknessDetectionService.
 */

const analyticsService = require('../services/analyticsService');
const streakService = require('../services/streakService');
const weaknessDetectionService = require('../services/weaknessDetectionService');

async function getDashboard(req, res, next) {
  try {
    const summary = await analyticsService.getDashboardSummary(req.user.sub);
    return res.status(200).json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
}

async function getStreaks(req, res, next) {
  try {
    const { year = new Date().getFullYear() } = req.query;
    const streak = await streakService.calculateGlobalStreak(req.user.sub);
    const heatmap = await streakService.getYearlyHeatmap(req.user.sub, parseInt(year, 10));
    return res.status(200).json({
      success: true,
      data: {
        ...streak,
        heatmap,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getPlatformAnalytics(req, res, next) {
  try {
    const analytics = await analyticsService.getPlatformAnalytics(req.user.sub, req.params.platform);
    return res.status(200).json({ success: true, data: analytics });
  } catch (err) {
    next(err);
  }
}

async function getRatings(req, res, next) {
  try {
    const ratings = await analyticsService.getRatingTrajectories(req.user.sub, req.query.platform);
    return res.status(200).json({ success: true, data: ratings });
  } catch (err) {
    next(err);
  }
}

async function getTopics(req, res, next) {
  try {
    const weakTopics = await weaknessDetectionService.detectWeakTopics(req.user.sub);
    const recommendations = await weaknessDetectionService.getDailyRecommendations(req.user.sub);
    return res.status(200).json({
      success: true,
      data: {
        weakTopics,
        recommendations,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDashboard,
  getStreaks,
  getPlatformAnalytics,
  getRatings,
  getTopics,
};
