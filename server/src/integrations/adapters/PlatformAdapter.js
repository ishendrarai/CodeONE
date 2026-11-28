/**
 * src/integrations/adapters/PlatformAdapter.js
 * Layer: Integrations / Adapters
 * Responsibility: Base contract class for all external competitive programming platform connectors.
 * Interaction: Extended by CodeforcesAdapter, AtCoderAdapter, CodewarsAdapter, and ManualImportAdapter.
 * Policy: Governed by the 12-point Permanent API Integration Policy. Never store external passwords.
 */

const { InvalidHandleError } = require('./errors');

const SOURCE_STATES = Object.freeze({
  CONNECTED: 'connected',
  PARTIAL_DATA: 'partial_data',
  RATE_LIMITED: 'rate_limited',
  NOT_CONNECTED: 'not_connected',
  SOURCE_UNAVAILABLE: 'source_unavailable',
  NOT_APPROVED: 'not_approved',
});

class PlatformAdapter {
  constructor(platformName) {
    if (!platformName || typeof platformName !== 'string') {
      throw new Error('PlatformAdapter requires a valid platformName string');
    }
    this.platformName = platformName;
  }

  /**
   * Returns operational feature flags for this platform adapter.
   * @returns {import('./PlatformAdapter.types').AdapterCapabilities}
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
   * @param {string} _handle
   * @param {string} _expectedToken
   * @returns {Promise<import('./PlatformAdapter.types').OwnershipVerificationResult>}
   */
  async verifyOwnership(_handle, _expectedToken) {
    throw new Error('verifyOwnership() must be implemented by adapter subclass');
  }

  /**
   * Fetches latest public profile snapshot (canonicalHandle, rating, rank, normalized fields).
   * @param {string} _handle
   * @returns {Promise<import('./PlatformAdapter.types').NormalizedProfile>}
   */
  async fetchProfile(_handle) {
    throw new Error('fetchProfile() must be implemented by adapter subclass');
  }

  /**
   * Fetches submission telemetry since a specified timestamp or cursor.
   * @param {string} _handle
   * @param {Date|null} [_since]
   * @returns {Promise<Array<import('./PlatformAdapter.types').NormalizedSubmission>>}
   */
  async fetchSubmissions(_handle, _since = null) {
    throw new Error('fetchSubmissions() must be implemented by adapter subclass');
  }

  /**
   * Fetches contest rating progression records.
   * @param {string} _handle
   * @returns {Promise<Array<import('./PlatformAdapter.types').NormalizedRatingChange>>}
   */
  async fetchRatingHistory(_handle) {
    throw new Error('fetchRatingHistory() must be implemented by adapter subclass');
  }

  /**
   * Fetches upcoming and historical contest schedules.
   * @param {string} [_handle]
   * @returns {Promise<Array<import('./PlatformAdapter.types').NormalizedContest>>}
   */
  async fetchContests(_handle) {
    throw new Error('fetchContests() must be implemented by adapter subclass');
  }
}

PlatformAdapter.SOURCE_STATES = SOURCE_STATES;

module.exports = PlatformAdapter;
