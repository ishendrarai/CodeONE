/**
 * src/config/redis.js
 * Layer: Configuration / Caching (Staged Infrastructure)
 * Responsibility: Optional Redis 7+ client initialization with exponential backoff
 *                 and graceful non-fatal fallback when caching is disabled.
 * Interaction: Injected into caching middleware, rate limiters, and service aggregations.
 */

let redisClient = null;

if (process.env.REDIS_URL) {
  const Redis = require('ioredis');
  redisClient = new Redis(process.env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  redisClient.on('error', (err) => {
    console.warn('Redis warning (graceful fallback active):', err.message);
  });
}

module.exports = redisClient;
