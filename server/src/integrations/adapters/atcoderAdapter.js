/**
 * src/integrations/adapters/atcoderAdapter.js
 * Layer: Integrations / Adapters
 * Responsibility: Priority 2 Third-party API adapter for AtCoder (via AtCoder Problems / kenkoooo API).
 * Policy & Pacing: Enforces >1000ms delay between calls; reports 'partial data' where ratings require separate sources.
 * Interaction: Injected into syncService and platformAccountService.
 */

const PlatformAdapter = require('./PlatformAdapter');

class AtCoderAdapter extends PlatformAdapter {
  constructor() {
    super('atcoder');
    this.baseUrl = 'https://kenkoooo.com/atcoder/atcoder-api/v3';
    this.rateLimitDelayMs = 1500;
  }

  capabilities() {
    return {
      profile: false,
      ownershipChallenge: false,
      submissions: true,
      ratingHistory: false, // Third-party API provides partial/stats data
      contests: true,
      verification: true,
      partialData: true,
    };
  }

  async verifyOwnership(handle, challengeCode) {
    void challengeCode;
    return { verified: false, canonicalHandle: this.normalizeHandle(handle) };
  }

  async fetchProfile(handle) {
    const canonicalHandle = this.normalizeHandle(handle);
    return {
      platform: this.platformName,
      handle: canonicalHandle,
      canonicalHandle,
      rating: null,
      rank: null,
      fetchedAt: new Date(),
      operationalState: 'partial_data',
    };
  }

  async fetchSubmissions(_handle, _since) {
    // Phase 4: Calls GET /user/submissions?user={handle}&from_second={since}
    return [];
  }

  async fetchRatingHistory(_handle) {
    return [];
  }

  async fetchContests() {
    return [];
  }
}

module.exports = AtCoderAdapter;

