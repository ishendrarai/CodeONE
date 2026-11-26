/**
 * src/integrations/adapters/errors.js
 * Layer: Integrations / Adapters
 * Responsibility: Standardized error hierarchy for all platform adapters so controllers
 *                 and services handle rate limits, timeouts, invalid handles, and upstream
 *                 outages uniformly without leaking platform-specific details.
 */

const { ERROR_CODES } = require('../../utils/constants');

class PlatformAdapterError extends Error {
  constructor(
    message,
    {
      statusCode = 502,
      code = ERROR_CODES.SOURCE_UNAVAILABLE,
      platform = 'unknown',
      retryable = false,
      details = null,
    } = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.platform = platform;
    this.retryable = retryable;
    if (details) {
      this.details = details;
    }
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      platform: this.platform,
      retryable: this.retryable,
      ...(this.details ? { details: this.details } : {}),
    };
  }
}

class RateLimitError extends PlatformAdapterError {
  constructor(platform, message = 'External platform rate limit exceeded.', retryAfterMs = 2000) {
    super(message, {
      statusCode: 429,
      code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
      platform,
      retryable: true,
      details: { retryAfterMs },
    });
    this.retryAfterMs = retryAfterMs;
  }
}

class SourceUnavailableError extends PlatformAdapterError {
  constructor(platform, message = 'External platform service is temporarily unavailable.', details = null) {
    super(message, {
      statusCode: 503,
      code: ERROR_CODES.SOURCE_UNAVAILABLE,
      platform,
      retryable: true,
      details,
    });
  }
}

class TimeoutError extends PlatformAdapterError {
  constructor(platform, timeoutMs = 5000, message = 'External platform request timed out.') {
    super(message, {
      statusCode: 504,
      code: ERROR_CODES.SOURCE_UNAVAILABLE,
      platform,
      retryable: true,
      details: { timeoutMs },
    });
    this.timeoutMs = timeoutMs;
  }
}

class InvalidHandleError extends PlatformAdapterError {
  constructor(platform, handle, message = 'Platform handle not found or invalid.') {
    super(message, {
      statusCode: 404,
      code: ERROR_CODES.NOT_FOUND,
      platform,
      retryable: false,
      details: { handle },
    });
    this.handle = handle;
  }
}

class MalformedResponseError extends PlatformAdapterError {
  constructor(platform, message = 'Received malformed or unexpected response from external platform.', details = null) {
    super(message, {
      statusCode: 502,
      code: ERROR_CODES.SOURCE_UNAVAILABLE,
      platform,
      retryable: false,
      details,
    });
  }
}

class NotApprovedError extends PlatformAdapterError {
  constructor(platform, message = 'Platform integration is not approved under the API Integration Policy.') {
    super(message, {
      statusCode: 403,
      code: ERROR_CODES.AUTHORIZATION_ERROR,
      platform,
      retryable: false,
    });
  }
}

class NotSupportedError extends PlatformAdapterError {
  constructor(platform, capability) {
    super(`Capability '${capability}' is not supported by the '${platform}' adapter.`, {
      statusCode: 501,
      code: ERROR_CODES.INTERNAL_ERROR,
      platform,
      retryable: false,
      details: { capability },
    });
  }
}

module.exports = {
  PlatformAdapterError,
  RateLimitError,
  SourceUnavailableError,
  TimeoutError,
  InvalidHandleError,
  MalformedResponseError,
  NotApprovedError,
  NotSupportedError,
};
