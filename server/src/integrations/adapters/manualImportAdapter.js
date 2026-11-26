/**
 * src/integrations/adapters/manualImportAdapter.js
 * Layer: Integrations / Adapters
 * Responsibility: Safe fallback adapter for platforms whose Terms of Service restrict automated scraping
 *                 (e.g., LeetCode, CodeChef), allowing users to upload validated JSON/CSV exports.
 * Interaction: Injected into syncService and platformAccountService.
 */

const PlatformAdapter = require('./PlatformAdapter');

class ManualImportAdapter extends PlatformAdapter {
  constructor() {
    super('manual_import');
  }

  capabilities() {
    return {
      profile: false,
      ownershipChallenge: false,
      submissions: true,
      ratingHistory: false,
      contests: false,
      verification: true,
      partialData: true,
    };
  }

  async verifyOwnership(handle, challengeCode) {
    void challengeCode;
    // Verified by ownership of authenticated CodeONE user account
    return { verified: true, canonicalHandle: this.normalizeHandle(handle) };
  }

  async parseExportFile(_fileBuffer, _mimeType) {
    // Phase 4: Parses and validates uploaded JSON/CSV records against schema
    return {
      problems: [],
      submissions: [],
    };
  }
}

module.exports = ManualImportAdapter;

