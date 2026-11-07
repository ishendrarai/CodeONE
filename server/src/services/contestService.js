/**
 * src/services/contestService.js
 * Layer: Services / Domain Logic
 * Responsibility: Manages contest calendar discovery, scheduled ingestion (CLIST.by/Codeforces),
 *                 and user contest participation performance records.
 * Interaction: Invoked by contestController and contestRefresh job.
 */

const prisma = require('../config/database');

async function getUpcomingContests(filters) {
  return [];
}

async function getUserContestParticipations(userId, filters) {
  return [];
}

async function refreshContestCalendar() {
  return { ingestedCount: 0 };
}

module.exports = {
  getUpcomingContests,
  getUserContestParticipations,
  refreshContestCalendar,
};

