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
      submissions: true,
      ratingHistory: false, // Third-party API provides partial/stats data
      contests: true,
      verification: true,
    };
  }

  async verifyOwnership(handle, challengeCode) {
    return false;
  }

  async fetchProfile(handle) {
    return { rating: null, rank: null };
  }

  async fetchSubmissions(handle, since) {
    // Phase 4: Calls GET /user/submissions?user={handle}&from_second={since}
    return [];
  }

  async fetchRatingHistory(handle) {
    return [];
  }

  async fetchContests() {
    return [];
  }
}

module.exports = AtCoderAdapter;

