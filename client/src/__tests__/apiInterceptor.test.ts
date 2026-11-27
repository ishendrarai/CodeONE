import {
  AxiosError,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api, { getAccessToken, setAccessToken } from '../services/api';

function response<T>(
  config: InternalAxiosRequestConfig,
  data: T,
  status = 200,
): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Unauthorized',
    headers: {},
    config,
  };
}

function unauthorized(config: InternalAxiosRequestConfig) {
  const errorResponse = response(config, { message: 'Unauthorized' }, 401);
  return Promise.reject(
    new AxiosError(
      'Unauthorized',
      AxiosError.ERR_BAD_REQUEST,
      config,
      undefined,
      errorResponse,
    ),
  );
}

describe('API auth response interceptor', () => {
  const defaultAdapter = api.defaults.adapter as AxiosAdapter;

  beforeEach(() => {
    setAccessToken('expired-token');
    window.history.replaceState({}, '', '/login');
  });

  afterEach(() => {
    setAccessToken(null);
    api.defaults.adapter = defaultAdapter;
    window.history.replaceState({}, '', '/');
  });

  it('refreshes once and retries simultaneous unauthorized requests with the new token', async () => {
    let releaseRefresh!: () => void;
    const refreshGate = new Promise<void>((resolve) => {
      releaseRefresh = resolve;
    });
    let refreshCalls = 0;
    let unauthorizedCalls = 0;
    const retriedWithTokens: Array<string | undefined> = [];

    api.defaults.adapter = vi.fn(async (config) => {
      if (config.url?.includes('/auth/refresh')) {
        refreshCalls += 1;
        await refreshGate;
        return response(config, { data: { accessToken: 'new-access-token' } });
      }

      if (config.url?.includes('/protected/')) {
        const token = config.headers.get('Authorization');
        if (token !== 'Bearer new-access-token') {
          unauthorizedCalls += 1;
          return unauthorized(config);
        }
        retriedWithTokens.push(token);
        return response(config, { success: true });
      }

      throw new Error(`Unexpected request: ${config.url}`);
    });

    const requests = Promise.all([
      api.get('/protected/one'),
      api.get('/protected/two'),
    ]);

    await vi.waitFor(() => {
      expect(unauthorizedCalls).toBe(2);
      expect(refreshCalls).toBe(1);
    });
    await Promise.resolve();
    releaseRefresh();

    const results = await requests;
    expect(results).toHaveLength(2);
    expect(refreshCalls).toBe(1);
    expect(retriedWithTokens).toEqual(['Bearer new-access-token', 'Bearer new-access-token']);
    expect(getAccessToken()).toBe('new-access-token');
  });

  it('clears the in-memory token when refresh fails', async () => {
    const sessionExpired = vi.fn();
    window.addEventListener('auth:session-expired', sessionExpired);

    api.defaults.adapter = vi.fn(async (config) => {
      if (config.url?.includes('/auth/refresh')) {
        return unauthorized(config);
      }
      if (config.url?.includes('/protected/')) {
        return unauthorized(config);
      }
      throw new Error(`Unexpected request: ${config.url}`);
    });

    await expect(api.get('/protected/resource')).rejects.toMatchObject({
      response: { status: 401 },
    });

    expect(getAccessToken()).toBeNull();
    expect(sessionExpired).toHaveBeenCalledTimes(1);
    window.removeEventListener('auth:session-expired', sessionExpired);
  });
});
