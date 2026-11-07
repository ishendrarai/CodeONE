/**
 * src/integrations/adapters/codewarsAdapter.js
 * Layer: Integrations / Adapters
 * Responsibility: Priority 2 Official API v1 adapter for Codewars (dev.codewars.com).
 * Policy: Official but minimal API; declares 'partial data' since failed attempts and ratings are omitted.
 * Interaction: Injected into syncService and platformAccountService.
 */

const PlatformAdapter = require('./PlatformAdapter');

class CodewarsAdapter extends PlatformAdapter {
  constructor() {
    super('codewars');
    this.baseUrl = 'https://www.codewars.com/api/v1';
  }

  capabilities() {
    return {
      submissions: true, // Completed katas only
      ratingHistory: false,
      contests: false,
      verification: true,
    };
  }

  async verifyOwnership(handle, challengeCode) {
    return false;
  }

  async fetchProfile(handle) {
    // Phase 4: Calls GET /users/{handle}
    return { rating: null, rank: null };
  }

  async fetchSubmissions(handle, since) {
    // Phase 4: Calls GET /users/{handle}/code-challenges/completed
    return [];
  }

  async fetchRatingHistory(handle) {
    return [];
  }

  async fetchContests() {
    return [];
  }
}

module.exports = CodewarsAdapter;

