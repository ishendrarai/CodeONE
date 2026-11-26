/**
 * src/integrations/adapters/codeforcesAdapter.js
 * Layer: Integrations / Adapters
 * Responsibility: Priority 1 Official REST API adapter for Codeforces (https://codeforces.com/api).
 * Policy & Pacing: Strictly enforces 5000ms request timeout and >=2000ms serialized pacing
 *                  across concurrent requests (1 req / 2s). Public API access only.
 * Interaction: Injected into platformAccountService and syncService via adapter registry.
 */

const axios = require('axios');
const PlatformAdapter = require('./PlatformAdapter');
const {
  RateLimitError,
  SourceUnavailableError,
  TimeoutError,
  InvalidHandleError,
  MalformedResponseError,
} = require('./errors');

const DEFAULT_TIMEOUT_MS = 5000;
const DEFAULT_RATE_LIMIT_DELAY_MS = 2000;
const PROFILE_CACHE_TTL_MS = 60 * 1000; // 60 seconds

// Global module-level queue so concurrent requests/instances cannot bypass 1 req / 2s pacing
let requestQueue = Promise.resolve();
let lastRequestAt = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapDifficulty(rating) {
  if (typeof rating !== 'number' || Number.isNaN(rating)) return null;
  if (rating < 1200) return 'easy';
  if (rating <= 1800) return 'medium';
  return 'hard';
}

function mapVerdict(cfVerdict) {
  switch (cfVerdict) {
    case 'OK':
      return 'accepted';
    case 'WRONG_ANSWER':
      return 'wrong_answer';
    case 'TIME_LIMIT_EXCEEDED':
      return 'time_limit_exceeded';
    case 'MEMORY_LIMIT_EXCEEDED':
      return 'memory_limit_exceeded';
    case 'RUNTIME_ERROR':
      return 'runtime_error';
    case 'COMPILATION_ERROR':
      return 'compilation_error';
    case 'PARTIAL':
      return 'partial';
    default:
      return 'other';
  }
}

class CodeforcesAdapter extends PlatformAdapter {
  constructor(options = {}) {
    super('codeforces');
    this.baseUrl = options.baseUrl || 'https://codeforces.com/api';
    this.timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;
    this.rateLimitDelayMs = options.rateLimitDelayMs ?? DEFAULT_RATE_LIMIT_DELAY_MS;
    this.httpClient = options.httpClient || axios;
    this.profileCache = new Map();
  }

  capabilities() {
    return {
      submissions: true,
      ratingHistory: true,
      contests: true,
      verification: true,
      partialData: false,
      rateLimitDelayMs: this.rateLimitDelayMs,
      supportsIncrementalSync: true,
    };
  }

  normalizeHandle(handle) {
    const clean = super.normalizeHandle(handle);
    if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(clean)) {
      throw new InvalidHandleError(
        this.platformName,
        clean,
        'Invalid Codeforces handle format.'
      );
    }
    return clean;
  }

  /**
   * Serializes outbound HTTP GET requests to Codeforces API with >=2000ms pacing
   * and strict 5000ms timeout enforcement.
   */
  _enqueueRequest(endpoint, params = {}) {
    const task = requestQueue.then(async () => {
      const now = Date.now();
      const elapsed = now - lastRequestAt;
      if (lastRequestAt > 0 && elapsed < this.rateLimitDelayMs) {
        await sleep(this.rateLimitDelayMs - elapsed);
      }

      lastRequestAt = Date.now();
      return this._executeGet(endpoint, params);
    });

    // Keep the queue alive even if an individual request fails
    requestQueue = task.catch(() => {});
    return task;
  }

  async _executeGet(endpoint, params = {}) {
    const url = `${this.baseUrl}/${endpoint}`;
    let response;

    try {
      response = await this.httpClient.get(url, {
        params,
        timeout: this.timeoutMs,
      });
    } catch (err) {
      if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT' || /timeout/i.test(err.message || '')) {
        throw new TimeoutError(this.platformName, this.timeoutMs, 'Codeforces API request timed out.');
      }

      const status = err.response?.status;
      if (status === 429) {
        throw new RateLimitError(this.platformName, 'Codeforces API rate limit exceeded.', this.rateLimitDelayMs);
      }
      if (status === 400 || status === 404) {
        const comment = err.response?.data?.comment || '';
        if (/not found/i.test(comment)) {
          throw new InvalidHandleError(this.platformName, params.handle || params.handles || '', comment);
        }
      }
      if (status >= 500) {
        throw new SourceUnavailableError(this.platformName, `Codeforces API returned HTTP ${status}.`);
      }

      throw new SourceUnavailableError(
        this.platformName,
        `Network failure contacting Codeforces API: ${err.message || 'Unknown error'}`
      );
    }

    const payload = response?.data;
    if (!payload || typeof payload !== 'object' || typeof payload.status !== 'string') {
      throw new MalformedResponseError(this.platformName, 'Codeforces API returned an invalid response envelope.');
    }

    if (payload.status === 'FAILED') {
      const comment = typeof payload.comment === 'string' ? payload.comment : 'Codeforces API request failed.';
      if (/not found/i.test(comment)) {
        throw new InvalidHandleError(
          this.platformName,
          params.handle || params.handles || '',
          comment
        );
      }
      if (/limit/i.test(comment)) {
        throw new RateLimitError(this.platformName, comment, this.rateLimitDelayMs);
      }
      throw new MalformedResponseError(this.platformName, comment);
    }

    if (payload.status !== 'OK' || payload.result === undefined) {
      throw new MalformedResponseError(this.platformName, 'Codeforces API response missing OK result.');
    }

    return payload.result;
  }

  async _fetchRawUserInfo(handle, { bypassCache = false } = {}) {
    const cleanHandle = this.normalizeHandle(handle);
    const cacheKey = cleanHandle.toLowerCase();

    if (!bypassCache) {
      const cached = this.profileCache.get(cacheKey);
      if (cached && Date.now() < cached.expiresAt) {
        return cached.data;
      }
    }

    const result = await this._enqueueRequest('user.info', { handles: cleanHandle });
    if (!Array.isArray(result) || result.length === 0 || !result[0] || typeof result[0] !== 'object') {
      throw new InvalidHandleError(this.platformName, cleanHandle, 'Codeforces user profile not found.');
    }

    const user = result[0];
    this.profileCache.set(cacheKey, {
      data: user,
      expiresAt: Date.now() + PROFILE_CACHE_TTL_MS,
    });

    return user;
  }

  /**
   * Verifies handle ownership by checking public profile fields (firstName, lastName, organization)
   * for the one-time challenge code. Always bypasses cache to read live profile state.
   */
  async verifyOwnership(handle, challengeCode) {
    if (typeof challengeCode !== 'string' || !challengeCode.trim()) {
      return false;
    }

    const user = await this._fetchRawUserInfo(handle, { bypassCache: true });
    const token = challengeCode.trim();
    const publicFields = [user.firstName, user.lastName, user.organization]
      .filter((val) => typeof val === 'string')
      .map((val) => val.trim());

    return publicFields.some((field) => field.includes(token));
  }

  /**
   * Fetches and normalizes public Codeforces profile information.
   */
  async fetchProfile(handle) {
    const user = await this._fetchRawUserInfo(handle, { bypassCache: false });
    const normalizedHandle = typeof user.handle === 'string' ? user.handle : this.normalizeHandle(handle);
    const rating = typeof user.rating === 'number' ? user.rating : null;
    const rank = typeof user.rank === 'string' ? user.rank : null;

    return {
      platform: this.platformName,
      handle: normalizedHandle,
      displayName:
        [user.firstName, user.lastName].filter((s) => typeof s === 'string' && s.trim()).join(' ') || null,
      rating,
      maxRating: typeof user.maxRating === 'number' ? user.maxRating : null,
      rank,
      maxRank: typeof user.maxRank === 'string' ? user.maxRank : null,
      avatarUrl: typeof user.titlePhoto === 'string' ? user.titlePhoto : null,
      profileUrl: `https://codeforces.com/profile/${encodeURIComponent(normalizedHandle)}`,
      fetchedAt: new Date(),
      operationalState: 'connected',
    };
  }

  /**
   * Fetches and normalizes user submissions, optionally filtered by `since` (Date).
   */
  async fetchSubmissions(handle, since = null, options = {}) {
    const cleanHandle = this.normalizeHandle(handle);
    const count = options.count || 1000;
    const from = options.from || 1;

    const result = await this._enqueueRequest('user.status', {
      handle: cleanHandle,
      from,
      count,
    });

    if (!Array.isArray(result)) {
      throw new MalformedResponseError(this.platformName, 'Expected array in Codeforces user.status result.');
    }

    const sinceMs = since instanceof Date && !Number.isNaN(since.getTime()) ? since.getTime() : null;
    const normalized = [];

    for (const sub of result) {
      if (!sub || typeof sub !== 'object' || sub.id == null || !sub.problem) {
        continue;
      }

      const submittedAt =
        typeof sub.creationTimeSeconds === 'number' ? new Date(sub.creationTimeSeconds * 1000) : null;
      if (!submittedAt || Number.isNaN(submittedAt.getTime())) {
        continue;
      }

      if (sinceMs !== null && submittedAt.getTime() <= sinceMs) {
        continue;
      }

      const contestId = sub.problem.contestId ?? sub.contestId ?? 'unknown';
      const index = sub.problem.index || '';
      const problemId = `${contestId}${index}`;
      const difficultyRating = typeof sub.problem.rating === 'number' ? sub.problem.rating : null;

      normalized.push({
        externalId: String(sub.id),
        platform: this.platformName,
        problemId,
        title: typeof sub.problem.name === 'string' ? sub.problem.name : problemId,
        verdict: mapVerdict(sub.verdict),
        rawVerdict: typeof sub.verdict === 'string' ? sub.verdict : 'UNKNOWN',
        language: typeof sub.programmingLanguage === 'string' ? sub.programmingLanguage : null,
        submittedAt,
        problem: {
          platform: this.platformName,
          problemId,
          title: typeof sub.problem.name === 'string' ? sub.problem.name : problemId,
          difficulty: mapDifficulty(difficultyRating),
          difficultyRating,
          url:
            sub.problem.contestId && index
              ? `https://codeforces.com/contest/${sub.problem.contestId}/problem/${encodeURIComponent(index)}`
              : `https://codeforces.com/problemset/problem/${contestId}/${encodeURIComponent(index)}`,
          tags: Array.isArray(sub.problem.tags)
            ? sub.problem.tags.filter((t) => typeof t === 'string')
            : [],
        },
      });
    }

    return normalized;
  }

  /**
   * Fetches and normalizes contest rating history for the handle.
   */
  async fetchRatingHistory(handle) {
    const cleanHandle = this.normalizeHandle(handle);
    const result = await this._enqueueRequest('user.rating', { handle: cleanHandle });

    if (!Array.isArray(result)) {
      throw new MalformedResponseError(this.platformName, 'Expected array in Codeforces user.rating result.');
    }

    return result
      .filter((item) => item && typeof item === 'object' && item.contestId != null && typeof item.newRating === 'number')
      .map((item) => ({
        contestId: String(item.contestId),
        contestName: typeof item.contestName === 'string' ? item.contestName : undefined,
        rank: typeof item.rank === 'number' ? item.rank : null,
        oldRating: typeof item.oldRating === 'number' ? item.oldRating : null,
        newRating: item.newRating,
        recordedAt:
          typeof item.ratingUpdateTimeSeconds === 'number'
            ? new Date(item.ratingUpdateTimeSeconds * 1000)
            : new Date(),
      }));
  }

  /**
   * Fetches upcoming/recent Codeforces contests from official contest.list.
   */
  async fetchContests() {
    const result = await this._enqueueRequest('contest.list', { gym: false });

    if (!Array.isArray(result)) {
      throw new MalformedResponseError(this.platformName, 'Expected array in Codeforces contest.list result.');
    }

    return result
      .filter((c) => c && typeof c === 'object' && c.id != null && typeof c.startTimeSeconds === 'number')
      .map((c) => ({
        externalId: String(c.id),
        platform: this.platformName,
        name: typeof c.name === 'string' ? c.name : `Codeforces Contest ${c.id}`,
        startTime: new Date(c.startTimeSeconds * 1000),
        durationSeconds: typeof c.durationSeconds === 'number' ? c.durationSeconds : 0,
        url: `https://codeforces.com/contest/${c.id}`,
        source: 'codeforces',
      }));
  }

  static _resetRateLimitStateForTesting() {
    requestQueue = Promise.resolve();
    lastRequestAt = 0;
  }
}

module.exports = CodeforcesAdapter;
