/**
 * tests/unit/adapters/codeforcesAdapter.test.js
 * Layer: Tests / Unit / Adapters
 * Responsibility: Contract and unit tests for CodeforcesAdapter using mocked HTTP responses.
 *                 Verifies normalization, missing data, 5000ms timeout, 1 req/2s rate limiting,
 *                 concurrent request serialization, malformed responses, and network errors.
 * Policy: Never make live outbound network requests in CI.
 */

const CodeforcesAdapter = require('../../../src/integrations/adapters/codeforcesAdapter');
const {
  RateLimitError,
  SourceUnavailableError,
  TimeoutError,
  InvalidHandleError,
  MalformedResponseError,
} = require('../../../src/integrations/adapters/errors');

describe('CodeforcesAdapter (P1)', () => {
  let mockHttpClient;

  beforeEach(() => {
    CodeforcesAdapter._resetRateLimitStateForTesting();
    mockHttpClient = {
      get: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('instantiates adapter and verifies capabilities flags', () => {
    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient });
    const caps = adapter.capabilities();
    expect(caps).toMatchObject({
      submissions: true,
      ratingHistory: true,
      contests: true,
      verification: true,
      rateLimitDelayMs: 2000,
    });
    expect(adapter.timeoutMs).toBe(5000);
  });

  test('fetches and normalizes valid user profile and caches subsequent read', async () => {
    mockHttpClient.get.mockResolvedValueOnce({
      data: {
        status: 'OK',
        result: [
          {
            handle: 'tourist',
            firstName: 'Gennady',
            lastName: 'Korotkevich',
            rating: 3700,
            maxRating: 3979,
            rank: 'legendary grandmaster',
            maxRank: 'legendary grandmaster',
            titlePhoto: 'https://userpic.codeforces.org/422/title/50a270ed.jpg',
          },
        ],
      },
    });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    const profile = await adapter.fetchProfile('  tourist  ');

    expect(mockHttpClient.get).toHaveBeenCalledWith('https://codeforces.com/api/user.info', {
      params: { handles: 'tourist' },
      timeout: 5000,
    });
    expect(profile).toMatchObject({
      platform: 'codeforces',
      handle: 'tourist',
      displayName: 'Gennady Korotkevich',
      rating: 3700,
      maxRating: 3979,
      rank: 'legendary grandmaster',
      operationalState: 'connected',
    });

    // Second call should hit 60s profile cache without calling HTTP client again
    const cachedProfile = await adapter.fetchProfile('tourist');
    expect(cachedProfile.handle).toBe('tourist');
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });

  test('verifyOwnership checks firstName, lastName, and organization bypassing cache', async () => {
    mockHttpClient.get
      .mockResolvedValueOnce({
        data: {
          status: 'OK',
          result: [{ handle: 'ishendra', firstName: 'Ishendra', organization: 'CODEONE-VERIFY-ABC123' }],
        },
      })
      .mockResolvedValueOnce({
        data: {
          status: 'OK',
          result: [{ handle: 'ishendra', firstName: 'Ishendra', organization: 'GLA University' }],
        },
      });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    await expect(adapter.verifyOwnership('ishendra', 'CODEONE-VERIFY-ABC123')).resolves.toBe(true);
    await expect(adapter.verifyOwnership('ishendra', 'CODEONE-VERIFY-ABC123')).resolves.toBe(false);
    expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
  });

  test('handles missing/unrated profile fields gracefully without crashing', async () => {
    mockHttpClient.get.mockResolvedValueOnce({
      data: {
        status: 'OK',
        result: [{ handle: 'newbie_user' }],
      },
    });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    const profile = await adapter.fetchProfile('newbie_user');

    expect(profile).toMatchObject({
      platform: 'codeforces',
      handle: 'newbie_user',
      displayName: null,
      rating: null,
      maxRating: null,
      rank: null,
      maxRank: null,
      avatarUrl: null,
    });
  });

  test('throws InvalidHandleError when Codeforces reports handle not found', async () => {
    mockHttpClient.get.mockResolvedValueOnce({
      data: {
        status: 'FAILED',
        comment: 'handles: User with handle no_such_user not found',
      },
    });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    await expect(adapter.fetchProfile('no_such_user')).rejects.toThrow(InvalidHandleError);
  });

  test('throws TimeoutError when request exceeds 5000ms timeout', async () => {
    const timeoutErr = new Error('timeout of 5000ms exceeded');
    timeoutErr.code = 'ECONNABORTED';
    mockHttpClient.get.mockRejectedValueOnce(timeoutErr);

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    await expect(adapter.fetchProfile('tourist')).rejects.toThrow(TimeoutError);
  });

  test('throws RateLimitError on HTTP 429 response', async () => {
    const err429 = new Error('Too Many Requests');
    err429.response = { status: 429 };
    mockHttpClient.get.mockRejectedValueOnce(err429);

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    await expect(adapter.fetchProfile('tourist')).rejects.toThrow(RateLimitError);
  });

  test('throws MalformedResponseError on invalid response envelope or non-array result', async () => {
    mockHttpClient.get
      .mockResolvedValueOnce({ data: null })
      .mockResolvedValueOnce({ data: { status: 'OK', result: 'not-an-array' } });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    await expect(adapter.fetchProfile('tourist')).rejects.toThrow(MalformedResponseError);
    await expect(adapter.fetchSubmissions('tourist')).rejects.toThrow(MalformedResponseError);
  });

  test('throws SourceUnavailableError on network failure or HTTP 503', async () => {
    const netErr = new Error('connect ECONNREFUSED');
    mockHttpClient.get.mockRejectedValueOnce(netErr);

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    await expect(adapter.fetchRatingHistory('tourist')).rejects.toThrow(SourceUnavailableError);
  });

  test('normalizes submissions, difficulty, verdicts, and filters by since date', async () => {
    mockHttpClient.get.mockResolvedValueOnce({
      data: {
        status: 'OK',
        result: [
          {
            id: 1002,
            creationTimeSeconds: 1700000200,
            verdict: 'OK',
            programmingLanguage: 'GNU C++20 (64)',
            problem: {
              contestId: 1900,
              index: 'C',
              name: 'Anji Binary Tree',
              rating: 1300,
              tags: ['dfs and similar', 'dp', 'trees'],
            },
          },
          {
            id: 1001,
            creationTimeSeconds: 1700000000,
            verdict: 'WRONG_ANSWER',
            problem: {
              contestId: 1900,
              index: 'A',
              name: 'Cover in Water',
              tags: [],
            },
          },
        ],
      },
    });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    const subs = await adapter.fetchSubmissions('tourist', new Date(1700000100 * 1000));

    expect(subs).toHaveLength(1);
    expect(subs[0]).toMatchObject({
      externalId: '1002',
      platform: 'codeforces',
      problemId: '1900C',
      title: 'Anji Binary Tree',
      verdict: 'accepted',
      rawVerdict: 'OK',
      language: 'GNU C++20 (64)',
      problem: {
        difficulty: 'medium',
        difficultyRating: 1300,
        tags: ['dfs and similar', 'dp', 'trees'],
      },
    });
  });

  test('normalizes rating history and contest list', async () => {
    mockHttpClient.get
      .mockResolvedValueOnce({
        data: {
          status: 'OK',
          result: [
            {
              contestId: 1900,
              contestName: 'Codeforces Round 911',
              rank: 42,
              oldRating: 1500,
              newRating: 1620,
              ratingUpdateTimeSeconds: 1700005000,
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          status: 'OK',
          result: [
            {
              id: 1901,
              name: 'Educational Codeforces Round 158',
              startTimeSeconds: 1700100000,
              durationSeconds: 7200,
            },
          ],
        },
      });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    const ratings = await adapter.fetchRatingHistory('tourist');
    const contests = await adapter.fetchContests();

    expect(ratings[0]).toMatchObject({
      contestId: '1900',
      rank: 42,
      oldRating: 1500,
      newRating: 1620,
    });
    expect(contests[0]).toMatchObject({
      externalId: '1901',
      platform: 'codeforces',
      durationSeconds: 7200,
      source: 'codeforces',
    });
  });

  test('enforces serialized >=2000ms pacing across concurrent requests', async () => {
    const callTimestamps = [];
    mockHttpClient.get.mockImplementation(async () => {
      callTimestamps.push(Date.now());
      return {
        data: {
          status: 'OK',
          result: [{ handle: 'tourist', rating: 3700 }],
        },
      };
    });

    const adapterA = new CodeforcesAdapter({ httpClient: mockHttpClient });
    const adapterB = new CodeforcesAdapter({ httpClient: mockHttpClient });

    await Promise.all([
      adapterA.fetchRatingHistory('tourist'),
      adapterB.fetchRatingHistory('petr'),
    ]);

    expect(callTimestamps).toHaveLength(2);
    expect(callTimestamps[1] - callTimestamps[0]).toBeGreaterThanOrEqual(1950);
  }, 10000);
});
