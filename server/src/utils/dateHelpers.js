/**
 * src/utils/dateHelpers.js
 * Layer: Utilities / Analytics
 * Responsibility: Timezone-aware date normalization, calendar day difference,
 *                 and leap year calculations for streaks and heatmaps.
 * Interaction: Utilized by streakService, contestService, and goalService.
 */

function formatDateInTimezone(date, timeZone = 'UTC') {
  const d = new Date(date);
  return d.toLocaleDateString('en-CA', { timeZone }); // Format: YYYY-MM-DD
}

function diffInCalendarDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

module.exports = {
  formatDateInTimezone,
  diffInCalendarDays,
};

