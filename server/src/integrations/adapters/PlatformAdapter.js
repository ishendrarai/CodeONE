/**
 * src/integrations/adapters/PlatformAdapter.js
 * Layer: Integrations / Adapters
 * Responsibility: Base contract interface for all external competitive programming platform connectors.
 * Interaction: Extended by CodeforcesAdapter, AtCoderAdapter, CodewarsAdapter, and ManualImportAdapter.
 * Policy: Governed by the 12-point Permanent API Integration Policy. Never store external passwords.
 */

class PlatformAdapter {
  constructor(platformName) {
    this.platformName = platformName;
  }

  /**
   * Returns operational feature flags for this platform adapter.
   * @returns {{ submissions: boolean, ratingHistory: boolean, contests: boolean, verification: boolean }}
   */
  capabilities() {
    throw new Error('capabilities() must be implemented by adapter subclass');
  }

  /**
   * Verifies public handle ownership via profile challenge token or OAuth.
   * @param {string} handle
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  async verifyOwnership(handle, userId) {
    throw new Error('verifyOwnership() must be implemented by adapter subclass');
  }

  /**
   * Fetches latest public profile snapshot (rating, rank).
   * @param {string} handle
   * @returns {Promise<{ rating: number|null, rank: string|null }>}
   */
  async fetchProfile(handle) {
    throw new Error('fetchProfile() must be implemented by adapter subclass');
  }

  /**
   * Fetches submission telemetry since a specified timestamp or cursor.
   * @param {string} handle
   * @param {Date|null} since
   * @returns {Promise<Array<{ externalId: string, problemId: string, title: string, verdict: string, language: string, submittedAt: Date }>>}
   */
  async fetchSubmissions(handle, since) {
    throw new Error('fetchSubmissions() must be implemented by adapter subclass');
  }

  /**
   * Fetches contest rating progression records.
   * @param {string} handle
   * @returns {Promise<Array<{ contestId: string, oldRating: number, newRating: number, recordedAt: Date }>>}
   */
  async fetchRatingHistory(handle) {
    throw new Error('fetchRatingHistory() must be implemented by adapter subclass');
  }

  /**
   * Fetches upcoming and historical contest schedules.
   * @param {string} handle
   * @returns {Promise<Array<{ externalId: string, name: string, startTime: Date, durationSeconds: number, url: string }>>}
   */
  async fetchContests(handle) {
    throw new Error('fetchContests() must be implemented by adapter subclass');
  }
}

module.exports = PlatformAdapter;

