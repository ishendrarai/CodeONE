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
      profile: true,
      ownershipChallenge: true,
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
      canonicalHandle: 'tourist',
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
          result: [{ handle: 'Ishendra', firstName: 'Ishendra', rating: 1500, rank: 'specialist', organization: 'CODEONE-VERIFY-ABC123' }],
        },
      })
      .mockResolvedValueOnce({
        data: {
          status: 'OK',
          result: [{ handle: 'Ishendra', firstName: 'Ishendra', organization: 'GLA University' }],
        },
      });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    await expect(adapter.verifyOwnership('ishendra', 'CODEONE-VERIFY-ABC123')).resolves.toMatchObject({
      verified: true,
      canonicalHandle: 'Ishendra',
      profileSnapshot: { rating: 1500, rank: 'specialist' },
    });
    await expect(adapter.verifyOwnership('ishendra', 'CODEONE-VERIFY-ABC123')).resolves.toMatchObject({
      verified: false,
      canonicalHandle: 'Ishendra',
    });
    expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
  });

  test('verifyOwnership matches challenge tokens case-insensitively and preserves canonical handle', async () => {
    mockHttpClient.get
      .mockResolvedValueOnce({
        data: {
          status: 'OK',
          result: [
            {
              handle: 'Um_nik',
              firstName: 'Prefix codeone-verify-abc123 suffix',
              rating: 3450,
              rank: 'legendary grandmaster',
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          status: 'OK',
          result: [
            {
              handle: 'Benq',
              organization: 'CodeOne-Verify-AbC123',
            },
          ],
        },
      });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0 });
    await expect(adapter.verifyOwnership('um_nik', '  CODEONE-VERIFY-ABC123  ')).resolves.toMatchObject({
      verified: true,
      canonicalHandle: 'Um_nik',
      profileSnapshot: { rating: 3450, rank: 'legendary grandmaster' },
    });
    await expect(adapter.verifyOwnership('benq', 'codeone-verify-abc123')).resolves.toMatchObject({
      verified: true,
      canonicalHandle: 'Benq',
    });
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

  test('throws InvalidHandleError when Codeforces reports handle not found without retrying', async () => {
    mockHttpClient.get.mockResolvedValueOnce({
      data: {
        status: 'FAILED',
        comment: 'handles: User with handle no_such_user not found',
      },
    });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0, retryBaseDelayMs: 1 });
    await expect(adapter.fetchProfile('no_such_user')).rejects.toThrow(InvalidHandleError);
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });

  test('throws TimeoutError when request exceeds 5000ms timeout without retrying', async () => {
    const timeoutErr = new Error('timeout of 5000ms exceeded');
    timeoutErr.code = 'ECONNABORTED';
    mockHttpClient.get.mockRejectedValueOnce(timeoutErr);

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0, retryBaseDelayMs: 1 });
    await expect(adapter.fetchProfile('tourist')).rejects.toThrow(TimeoutError);
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });

  test('throws RateLimitError after exhausting max retries on HTTP 429', async () => {
    const err429 = new Error('Too Many Requests');
    err429.response = { status: 429 };
    mockHttpClient.get.mockRejectedValue(err429);

    const adapter = new CodeforcesAdapter({
      httpClient: mockHttpClient,
      rateLimitDelayMs: 0,
      retryBaseDelayMs: 1,
      maxRetryDelayMs: 5,
    });
    await expect(adapter.fetchProfile('tourist')).rejects.toThrow(RateLimitError);
    expect(mockHttpClient.get).toHaveBeenCalledTimes(3);
  });

  test('throws MalformedResponseError on invalid response envelope or non-array result without retrying', async () => {
    mockHttpClient.get
      .mockResolvedValueOnce({ data: null })
      .mockResolvedValueOnce({ data: { status: 'OK', result: 'not-an-array' } });

    const adapter = new CodeforcesAdapter({ httpClient: mockHttpClient, rateLimitDelayMs: 0, retryBaseDelayMs: 1 });
    await expect(adapter.fetchProfile('tourist')).rejects.toThrow(MalformedResponseError);
    await expect(adapter.fetchSubmissions('tourist')).rejects.toThrow(MalformedResponseError);
    expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
  });

  test('throws SourceUnavailableError after exhausting retries on network failure or HTTP 503', async () => {
    const netErr = new Error('connect ECONNREFUSED');
    mockHttpClient.get.mockRejectedValue(netErr);

    const adapter = new CodeforcesAdapter({
      httpClient: mockHttpClient,
      rateLimitDelayMs: 0,
      retryBaseDelayMs: 1,
      maxRetryDelayMs: 5,
    });
    await expect(adapter.fetchRatingHistory('tourist')).rejects.toThrow(SourceUnavailableError);
    expect(mockHttpClient.get).toHaveBeenCalledTimes(3);
  });

  test('retries transient HTTP 429, Call limit exceeded, and HTTP 5xx with exponential backoff + jitter', async () => {
    const err429 = new Error('Too Many Requests');
    err429.response = { status: 429 };
    const err503 = new Error('Service Unavailable');
    err503.response = { status: 503 };

    mockHttpClient.get
      .mockRejectedValueOnce(err429)
      .mockResolvedValueOnce({ data: { status: 'FAILED', comment: 'Call limit exceeded' } })
      .mockResolvedValueOnce({
        data: { status: 'OK', result: [{ handle: 'tourist', rating: 3700 }] },
      })
      .mockRejectedValueOnce(err503)
      .mockResolvedValueOnce({
        data: { status: 'OK', result: [{ handle: 'Petr', rating: 3500 }] },
      });

    const randomSpy = jest.fn().mockReturnValue(0.5);
    const adapter = new CodeforcesAdapter({
      httpClient: mockHttpClient,
      rateLimitDelayMs: 0,
      retryBaseDelayMs: 2,
      maxRetryDelayMs: 20,
      randomFn: randomSpy,
    });

    const profileA = await adapter.fetchProfile('tourist');
    expect(profileA.canonicalHandle).toBe('tourist');
    expect(randomSpy).toHaveBeenCalled();

    const profileB = await adapter.fetchProfile('petr');
    expect(profileB.canonicalHandle).toBe('Petr');
    expect(mockHttpClient.get).toHaveBeenCalledTimes(5);
  });

  test('computes bounded exponential backoff with jitter and Retry-After support', () => {
    const adapter = new CodeforcesAdapter({
      httpClient: mockHttpClient,
      retryBaseDelayMs: 100,
      maxRetryDelayMs: 500,
      randomFn: () => 1.0, // upper envelope
    });

    expect(adapter._calculateBackoffDelayMs(0, new SourceUnavailableError('codeforces'))).toBe(100);
    expect(adapter._calculateBackoffDelayMs(1, new SourceUnavailableError('codeforces'))).toBe(200);
    expect(adapter._calculateBackoffDelayMs(3, new SourceUnavailableError('codeforces'))).toBe(500);
    expect(adapter._calculateBackoffDelayMs(0, new RateLimitError('codeforces', '429', 300))).toBe(300);
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

  test('enforces serialized >=2000ms pacing across retry attempts', async () => {
    const callTimestamps = [];
    const err503 = new Error('Service Unavailable');
    err503.response = { status: 503 };

    mockHttpClient.get
      .mockImplementationOnce(async () => {
        callTimestamps.push(Date.now());
        throw err503;
      })
      .mockImplementationOnce(async () => {
        callTimestamps.push(Date.now());
        return {
          data: {
            status: 'OK',
            result: [{ handle: 'tourist', rating: 3700 }],
          },
        };
      });

    const adapter = new CodeforcesAdapter({
      httpClient: mockHttpClient,
      maxRetries: 1,
      retryBaseDelayMs: 10,
    });
    const profile = await adapter.fetchProfile('tourist');

    expect(profile.canonicalHandle).toBe('tourist');
    expect(callTimestamps).toHaveLength(2);
    expect(callTimestamps[1] - callTimestamps[0]).toBeGreaterThanOrEqual(1950);
  }, 10000);
});
