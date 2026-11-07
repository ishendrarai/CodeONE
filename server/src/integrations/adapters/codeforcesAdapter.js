/**
 * src/integrations/adapters/codeforcesAdapter.js
 * Layer: Integrations / Adapters
 * Responsibility: Priority 1 Official REST API adapter for Codeforces (codeforces.com/api).
 * Policy & Pacing: Strictly enforces >=2000ms delay between consecutive requests (1 req/2s).
 * Interaction: Injected into syncService and platformAccountService.
 */

const PlatformAdapter = require('./PlatformAdapter');

class CodeforcesAdapter extends PlatformAdapter {
  constructor() {
    super('codeforces');
    this.baseUrl = 'https://codeforces.com/api';
    this.rateLimitDelayMs = 2000;
  }

  capabilities() {
    return {
      submissions: true,
      ratingHistory: true,
      contests: true,
      verification: true,
    };
  }

  async verifyOwnership(handle, challengeCode) {
    // Phase 4: Queries user.info to verify challengeCode placed in public profile field
    return false;
  }

  async fetchProfile(handle) {
    // Phase 4: Calls GET /user.info?handles={handle}
    return { rating: null, rank: null };
  }

  async fetchSubmissions(handle, since) {
    // Phase 4: Calls GET /user.status?handle={handle}
    return [];
  }

  async fetchRatingHistory(handle) {
    // Phase 4: Calls GET /user.rating?handle={handle}
    return [];
  }

  async fetchContests() {
    // Phase 4: Calls GET /contest.list?gym=false
    return [];
  }
}

module.exports = CodeforcesAdapter;

