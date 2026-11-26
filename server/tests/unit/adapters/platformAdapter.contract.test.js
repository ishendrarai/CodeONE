/**
 * tests/unit/adapters/platformAdapter.contract.test.js
 * Layer: Tests / Unit / Adapters
 * Responsibility: Verifies the PlatformAdapter base contract, mock adapter implementation,
 *                 standardized error hierarchy, missing/incomplete data handling, and adapter isolation.
 */

const PlatformAdapter = require('../../../src/integrations/adapters/PlatformAdapter');
const {
  PlatformAdapterError,
  RateLimitError,
  SourceUnavailableError,
  TimeoutError,
  InvalidHandleError,
  MalformedResponseError,
  NotApprovedError,
  NotSupportedError,
} = require('../../../src/integrations/adapters/errors');
const { ERROR_CODES } = require('../../../src/utils/constants');

class MockPlatformAdapter extends PlatformAdapter {
  constructor(fixture = {}) {
    super('codeforces');
    this.fixture = fixture;
  }

  capabilities() {
    return {
      submissions: true,
      ratingHistory: true,
      contests: true,
      verification: true,
      partialData: false,
      rateLimitDelayMs: 2000,
    };
  }

  async verifyOwnership(handle, challengeCode) {
    const cleanHandle = this.normalizeHandle(handle);
    if (!challengeCode || typeof challengeCode !== 'string') {
      return false;
    }
    return cleanHandle === this.fixture.handle && this.fixture.bio?.includes(challengeCode);
  }

  async fetchProfile(handle) {
    const cleanHandle = this.normalizeHandle(handle);
    if (this.fixture.notFound) {
      throw new InvalidHandleError(this.platformName, cleanHandle);
    }
    return {
      platform: this.platformName,
      handle: cleanHandle,
      rating: this.fixture.rating ?? null,
      rank: this.fixture.rank ?? null,
      fetchedAt: new Date('2026-11-27T00:00:00.000Z'),
      operationalState: this.fixture.rating == null ? 'partial_data' : 'connected',
    };
  }

  async fetchSubmissions(handle, since = null) {
    this.normalizeHandle(handle);
    const rows = this.fixture.submissions || [];
    if (!since) return rows;
    return rows.filter((s) => s.submittedAt >= since);
  }

  async fetchRatingHistory(handle) {
    this.normalizeHandle(handle);
    return this.fixture.ratingHistory || [];
  }

  async fetchContests() {
    return this.fixture.contests || [];
  }
}

describe('PlatformAdapter Contract (P0)', () => {
  describe('Base abstract contract enforcement', () => {
    it('requires a valid platformName string on construction', () => {
      expect(() => new PlatformAdapter()).toThrow('PlatformAdapter requires a valid platformName string');
      expect(() => new PlatformAdapter('')).toThrow('PlatformAdapter requires a valid platformName string');
    });

    it('throws unimplemented errors for all abstract contract methods', async () => {
      const base = new PlatformAdapter('test_platform');
      expect(() => base.capabilities()).toThrow('capabilities() must be implemented');
      await expect(base.verifyOwnership('user', 'CODE')).rejects.toThrow('verifyOwnership() must be implemented');
      await expect(base.fetchProfile('user')).rejects.toThrow('fetchProfile() must be implemented');
      await expect(base.fetchSubmissions('user')).rejects.toThrow('fetchSubmissions() must be implemented');
      await expect(base.fetchRatingHistory('user')).rejects.toThrow('fetchRatingHistory() must be implemented');
      await expect(base.fetchContests()).rejects.toThrow('fetchContests() must be implemented');
    });

    it('normalizes valid handles and rejects empty handles with InvalidHandleError', () => {
      const base = new PlatformAdapter('codeforces');
      expect(base.normalizeHandle('  tourist  ')).toBe('tourist');
      expect(() => base.normalizeHandle('   ')).toThrow(InvalidHandleError);
      expect(() => base.normalizeHandle(null)).toThrow(InvalidHandleError);
    });
  });

  describe('Mock adapter contract & missing data handling', () => {
    it('implements all PlatformAdapter methods and handles missing profile fields gracefully', async () => {
      const mock = new MockPlatformAdapter({
        handle: 'new_coder',
        bio: 'CODEONE-VERIFY-123456',
      });

      expect(mock.capabilities()).toMatchObject({
        submissions: true,
        ratingHistory: true,
        contests: true,
        verification: true,
      });

      await expect(mock.verifyOwnership('  new_coder ', 'CODEONE-VERIFY-123456')).resolves.toBe(true);
      await expect(mock.verifyOwnership('new_coder', 'WRONG-CODE')).resolves.toBe(false);

      const profile = await mock.fetchProfile('new_coder');
      expect(profile).toMatchObject({
        platform: 'codeforces',
        handle: 'new_coder',
        rating: null,
        rank: null,
        operationalState: 'partial_data',
      });
      expect(profile.fetchedAt).toBeInstanceOf(Date);

      await expect(mock.fetchSubmissions('new_coder')).resolves.toEqual([]);
      await expect(mock.fetchRatingHistory('new_coder')).resolves.toEqual([]);
      await expect(mock.fetchContests()).resolves.toEqual([]);
    });

    it('throws InvalidHandleError when profile does not exist', async () => {
      const mock = new MockPlatformAdapter({ notFound: true });
      await expect(mock.fetchProfile('missing_user')).rejects.toThrow(InvalidHandleError);
    });
  });

  describe('Standardized adapter error hierarchy', () => {
    it('maps RateLimitError, SourceUnavailableError, TimeoutError, InvalidHandleError, MalformedResponseError, NotApprovedError, NotSupportedError', () => {
      const rateErr = new RateLimitError('codeforces', 'Slow down', 2000);
      expect(rateErr).toBeInstanceOf(PlatformAdapterError);
      expect(rateErr.statusCode).toBe(429);
      expect(rateErr.code).toBe(ERROR_CODES.RATE_LIMIT_EXCEEDED);
      expect(rateErr.retryable).toBe(true);
      expect(rateErr.toJSON()).toMatchObject({
        name: 'RateLimitError',
        statusCode: 429,
        platform: 'codeforces',
        retryable: true,
      });

      const unavailableErr = new SourceUnavailableError('codeforces');
      expect(unavailableErr.statusCode).toBe(503);
      expect(unavailableErr.code).toBe(ERROR_CODES.SOURCE_UNAVAILABLE);
      expect(unavailableErr.retryable).toBe(true);

      const timeoutErr = new TimeoutError('codeforces', 5000);
      expect(timeoutErr.statusCode).toBe(504);
      expect(timeoutErr.timeoutMs).toBe(5000);
      expect(timeoutErr.retryable).toBe(true);

      const handleErr = new InvalidHandleError('codeforces', 'bad_user');
      expect(handleErr.statusCode).toBe(404);
      expect(handleErr.code).toBe(ERROR_CODES.NOT_FOUND);
      expect(handleErr.retryable).toBe(false);

      const malformedErr = new MalformedResponseError('codeforces');
      expect(malformedErr.statusCode).toBe(502);
      expect(malformedErr.retryable).toBe(false);

      const notApprovedErr = new NotApprovedError('leetcode');
      expect(notApprovedErr.statusCode).toBe(403);
      expect(notApprovedErr.code).toBe(ERROR_CODES.AUTHORIZATION_ERROR);

      const notSupportedErr = new NotSupportedError('codewars', 'ratingHistory');
      expect(notSupportedErr.statusCode).toBe(501);
    });
  });

  describe('Adapter independence', () => {
    it('keeps Codeforces, AtCoder, Codewars, and ManualImport adapters independent', () => {
      const CodeforcesAdapter = require('../../../src/integrations/adapters/codeforcesAdapter');
      const AtCoderAdapter = require('../../../src/integrations/adapters/atcoderAdapter');
      const CodewarsAdapter = require('../../../src/integrations/adapters/codewarsAdapter');
      const ManualImportAdapter = require('../../../src/integrations/adapters/manualImportAdapter');

      const adapters = [
        new CodeforcesAdapter(),
        new AtCoderAdapter(),
        new CodewarsAdapter(),
        new ManualImportAdapter(),
      ];

      const names = adapters.map((a) => a.platformName);
      expect(names).toEqual(['codeforces', 'atcoder', 'codewars', 'manual_import']);
      adapters.forEach((adapter) => {
        expect(adapter).toBeInstanceOf(PlatformAdapter);
        expect(typeof adapter.capabilities).toBe('function');
        expect(typeof adapter.normalizeHandle).toBe('function');
      });
    });
  });
});
