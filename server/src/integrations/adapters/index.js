/**
 * src/integrations/adapters/index.js
 * Layer: Integrations / Adapters
 * Responsibility: Registry/factory returning independent PlatformAdapter instances by platform name.
 */

const CodeforcesAdapter = require('./codeforcesAdapter');
const AtCoderAdapter = require('./atcoderAdapter');
const CodewarsAdapter = require('./codewarsAdapter');
const ManualImportAdapter = require('./manualImportAdapter');
const { NotApprovedError, PlatformAdapterError } = require('./errors');
const { ERROR_CODES, PLATFORMS } = require('../../utils/constants');

const ADAPTER_FACTORIES = {
  [PLATFORMS.CODEFORCES]: () => new CodeforcesAdapter(),
  [PLATFORMS.ATCODER]: () => new AtCoderAdapter(),
  [PLATFORMS.CODEWARS]: () => new CodewarsAdapter(),
  manual_import: () => new ManualImportAdapter(),
};

const RESTRICTED_PLATFORMS = new Set(['leetcode', 'codechef']);

function getAdapter(platformName) {
  const key = typeof platformName === 'string' ? platformName.trim().toLowerCase() : '';
  if (RESTRICTED_PLATFORMS.has(key)) {
    throw new NotApprovedError(key);
  }
  const factory = ADAPTER_FACTORIES[key];
  if (!factory) {
    throw new PlatformAdapterError(`Unsupported platform '${platformName}'.`, {
      statusCode: 400,
      code: ERROR_CODES.VALIDATION_ERROR,
      platform: platformName || 'unknown',
      retryable: false,
    });
  }
  return factory();
}

module.exports = {
  getAdapter,
};
