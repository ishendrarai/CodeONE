/**
 * src/controllers/userController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles current user profile retrieval and account settings modifications.
 * Interaction: Receives HTTP request, extracts caller identity from req.user.sub, delegates to userService.
 */

const userService = require('../services/userService');

async function getMe(req, res, next) {
  try {
    const user = await userService.getUserProfile(req.user.sub);
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updateMe(req, res, next) {
  try {
    const updated = await userService.updateUserSettings(req.user.sub, req.body);
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMe,
  updateMe,
};
