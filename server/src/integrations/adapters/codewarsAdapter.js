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
      profile: false,
      ownershipChallenge: false,
      submissions: true, // Completed katas only
      ratingHistory: false,
      contests: false,
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
    // Phase 4: Calls GET /users/{handle}/code-challenges/completed
    return [];
  }

  async fetchRatingHistory(_handle) {
    return [];
  }

  async fetchContests() {
    return [];
  }
}

module.exports = CodewarsAdapter;

