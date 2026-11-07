/**
 * src/controllers/userProblemController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles retrieval and updates of mutable user problem states (status, bookmarks, notes).
 * IDOR Protection: Enforces user_id = req.user.sub.
 * Interaction: Receives HTTP request, delegates to problemService.
 */

const problemService = require('../services/problemService');

async function getUserProblem(req, res, next) {
  try {
    const result = await problemService.getUserProblemState(req.user.sub, req.params.problemId);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function updateUserProblem(req, res, next) {
  try {
    const result = await problemService.updateUserProblemState(req.user.sub, req.params.problemId, req.body);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUserProblem,
  updateUserProblem,
};

