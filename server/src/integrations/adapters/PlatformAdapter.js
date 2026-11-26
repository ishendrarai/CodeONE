/**
 * src/integrations/adapters/PlatformAdapter.js
 * Layer: Integrations / Adapters
 * Responsibility: Base contract interface for all external competitive programming platform connectors.
 * Interaction: Extended by CodeforcesAdapter, AtCoderAdapter, CodewarsAdapter, and ManualImportAdapter.
 * Policy: Governed by the 12-point Permanent API Integration Policy. Never store external passwords.
 */

const { InvalidHandleError } = require('./errors');

class PlatformAdapter {
  constructor(platformName) {
    if (!platformName || typeof platformName !== 'string') {
      throw new Error('PlatformAdapter requires a valid platformName string');
    }
    this.platformName = platformName;
  }

  /**
   * Returns operational feature flags for this platform adapter.
   * @returns {import('./PlatformAdapter.types').PlatformCapabilities}
   */
  capabilities() {
    throw new Error('capabilities() must be implemented by adapter subclass');
  }

  /**
   * Normalizes a public handle (trims whitespace; subclasses may apply platform casing rules).
   * @param {string} handle
   * @returns {string}
   */
  normalizeHandle(handle) {
    if (typeof handle !== 'string' || !handle.trim()) {
      throw new InvalidHandleError(this.platformName, handle, 'Handle must be a non-empty string.');
    }
    return handle.trim();
  }

  /**
   * Verifies public handle ownership via profile challenge token or OAuth.
   * @param {string} handle
   * @param {string} challengeCode
   * @returns {Promise<boolean>}
   */
  async verifyOwnership(handle, challengeCode) {
    throw new Error('verifyOwnership() must be implemented by adapter subclass');
  }

  /**
   * Fetches latest public profile snapshot (rating, rank, normalized fields).
   * @param {string} handle
   * @returns {Promise<import('./PlatformAdapter.types').NormalizedProfile>}
   */
  async fetchProfile(handle) {
    throw new Error('fetchProfile() must be implemented by adapter subclass');
  }

  /**
   * Fetches submission telemetry since a specified timestamp or cursor.
   * @param {string} handle
   * @param {Date|null} [since]
   * @returns {Promise<Array<import('./PlatformAdapter.types').NormalizedSubmission>>}
   */
  async fetchSubmissions(handle, since = null) {
    throw new Error('fetchSubmissions() must be implemented by adapter subclass');
  }

  /**
   * Fetches contest rating progression records.
   * @param {string} handle
   * @returns {Promise<Array<import('./PlatformAdapter.types').NormalizedRatingChange>>}
   */
  async fetchRatingHistory(handle) {
    throw new Error('fetchRatingHistory() must be implemented by adapter subclass');
  }

  /**
   * Fetches upcoming and historical contest schedules.
   * @param {string} [handle]
   * @returns {Promise<Array<import('./PlatformAdapter.types').NormalizedContest>>}
   */
  async fetchContests(handle) {
    throw new Error('fetchContests() must be implemented by adapter subclass');
  }
}

module.exports = PlatformAdapter;
