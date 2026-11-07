/**
 * src/controllers/contestController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles upcoming and past contest calendar listings and user contest participations.
 * Interaction: Receives HTTP request, delegates to contestService.
 */

const contestService = require('../services/contestService');

async function getContests(req, res, next) {
  try {
    const { upcoming, platform, limit } = req.query;
    const contests = await contestService.getUpcomingContests({
      upcoming: upcoming === 'true',
      platform,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
    return res.status(200).json({ success: true, data: contests });
  } catch (err) {
    next(err);
  }
}

async function getParticipations(req, res, next) {
  try {
    const participations = await contestService.getUserContestParticipations(req.user.sub, req.query);
    return res.status(200).json({ success: true, data: participations });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getContests,
  getParticipations,
};
