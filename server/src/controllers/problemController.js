/**
 * src/controllers/problemController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles search, multi-tag filtering, and pagination over the shared problem catalogue.
 * Interaction: Receives HTTP request, parses query filters, delegates to problemService.
 */

const problemService = require('../services/problemService');

async function getCatalogueProblems(req, res, next) {
  try {
    const { platform, difficulty, tags, search, page = 1, limit = 20 } = req.query;
    const result = await problemService.searchCatalogue(
      { platform, difficulty, tags, search },
      { page: parseInt(page, 10), limit: parseInt(limit, 10) }
    );
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCatalogueProblems,
};
