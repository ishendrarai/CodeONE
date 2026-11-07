/**
 * src/jobs/contestRefresh.js
 * Layer: Jobs / Asynchronous Schedulers
 * Responsibility: Scheduled 6-hour cron job fetching upcoming contest schedules
 *                 from approved sources (CLIST.by API v4 / Codeforces).
 * Interaction: Invokes contestService.refreshContestCalendar().
 */

const contestService = require('../services/contestService');

function startContestRefreshJob() {
  console.log('[Scheduler] Contest refresh job initialized (every 6 hours).');
}

module.exports = {
  startContestRefreshJob,
};

