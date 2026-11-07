/**
 * src/controllers/submissionController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles paginated queries over caller's immutable submission history.
 * Interaction: Receives HTTP request, extracts req.user.sub, delegates to submissionService.
 */

const submissionService = require('../services/submissionService');

async function getSubmissions(req, res, next) {
  try {
    const { platform, verdict, page = 1, limit = 20 } = req.query;
    const result = await submissionService.getSubmissions(
      req.user.sub,
      { platform, verdict },
      { page: parseInt(page, 10), limit: parseInt(limit, 10) }
    );
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSubmissions,
};

