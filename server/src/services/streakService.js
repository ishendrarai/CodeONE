/**
 * src/services/streakService.js
 * Layer: Services / Domain Logic
 * Responsibility: Calculates timezone-aware global streaks, 1-day recovery mode,
 *                 and 365-day contribution heatmaps exclusively from immutable submissions.
 * Interaction: Invoked by analyticsController; utilizes dateHelpers.
 */

const prisma = require('../config/database');
const { formatDateInTimezone, diffInCalendarDays } = require('../utils/dateHelpers');

async function calculateGlobalStreak(userId, timezone = 'UTC', options = {}) {
  return {
    currentStreak: 0,
    longestStreak: 0,
    recoveryUsed: false,
  };
}

async function getYearlyHeatmap(userId, year, timezone = 'UTC') {
  return [];
}

module.exports = {
  calculateGlobalStreak,
  getYearlyHeatmap,
};

