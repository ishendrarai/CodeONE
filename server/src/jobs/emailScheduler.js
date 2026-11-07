/**
 * src/jobs/emailScheduler.js
 * Layer: Jobs / Asynchronous Schedulers
 * Responsibility: Scheduled non-blocking email dispatch for weekly progress digests,
 *                 contest reminders (1h before start), and goal achievements.
 * Interaction: Invoked by Nodemailer email service based on user settings preferences.
 */

function startEmailScheduler() {
  console.log('[Scheduler] Email notification scheduler initialized.');
}

module.exports = {
  startEmailScheduler,
};
