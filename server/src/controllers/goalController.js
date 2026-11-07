/**
 * src/controllers/goalController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles creation, retrieval, updates, and deletion of coding targets.
 * IDOR Protection: Enforces user_id = req.user.sub.
 * Interaction: Receives HTTP request, delegates to goalService.
 */

const goalService = require('../services/goalService');

async function getGoals(req, res, next) {
  try {
    const goals = await goalService.getGoals(req.user.sub, req.query.active === 'true');
    return res.status(200).json({ success: true, data: goals });
  } catch (err) {
    next(err);
  }
}

async function createGoal(req, res, next) {
  try {
    const goal = await goalService.createGoal(req.user.sub, req.body);
    return res.status(201).json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
}

async function updateGoal(req, res, next) {
  try {
    const updated = await goalService.updateGoal(req.user.sub, req.params.id, req.body);
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteGoal(req, res, next) {
  try {
    await goalService.deleteGoal(req.user.sub, req.params.id);
    return res.status(200).json({ success: true, message: 'Goal deleted successfully.' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};

