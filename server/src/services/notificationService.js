/**
 * src/services/notificationService.js
 * Layer: Services / Domain Logic
 * Responsibility: Manages in-app notifications (contest reminders, streak alerts, goal milestones)
 *                 and tracks read status via read_at timestamps.
 * Interaction: Invoked by notificationController, goalService, and contestRefresh job.
 */

const prisma = require('../config/database');

async function getNotifications(userId, options = {}) {
  return { notifications: [], unreadCount: 0 };
}

async function createNotification(userId, type, title, body) {
  return null;
}

async function markAsRead(userId, notificationId) {
  return true;
}

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
};

