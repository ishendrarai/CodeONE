/**
 * src/jobs/goalCheck.js
 * Layer: Jobs / Asynchronous Schedulers
 * Responsibility: Scheduled daily background job evaluating active goal progress windows
 *                 and dispatching streak alerts based on user's local timezone.
 * Interaction: Invokes goalService and notificationService.
 */

const goalService = require('../services/goalService');

function startGoalCheckJob() {
  console.log('[Scheduler] Goal evaluation & streak alert job initialized.');
}

module.exports = {
  startGoalCheckJob,
};

