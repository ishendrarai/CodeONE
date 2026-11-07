/**
 * src/controllers/notificationController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles in-app notifications listing and marking notifications as read.
 * IDOR Protection: Enforces user_id = req.user.sub.
 * Interaction: Receives HTTP request, delegates to notificationService.
 */

const notificationService = require('../services/notificationService');

async function getNotifications(req, res, next) {
  try {
    const { page = 1, limit = 20, unreadOnly } = req.query;
    const result = await notificationService.getNotifications(req.user.sub, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      unreadOnly: unreadOnly === 'true',
    });
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

async function markAsRead(req, res, next) {
  try {
    await notificationService.markAsRead(req.user.sub, req.params.id);
    return res.status(200).json({ success: true, message: 'Notification marked as read.' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getNotifications,
  markAsRead,
};

