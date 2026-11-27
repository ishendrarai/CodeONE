import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let accessToken: string | null = null;
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const hasApiVersion = /\/v1\/?$/.test(baseURL.replace(/\/+$/, ''));
const versionedBaseURL = hasApiVersion ? baseURL : `${baseURL.replace(/\/+$/, '')}/v1`;

export function getApiUrl(path: string) {
  return `${versionedBaseURL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

const api = axios.create({
  baseURL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

function settleQueue(error: unknown, token?: string) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    } else {
      reject(new Error('Token refresh completed without an access token.'));
    }
  });
  failedQueue = [];
}

api.interceptors.request.use(
  (config) => {
    if (!hasApiVersion && config.url?.startsWith('/') && !config.url.startsWith('/v1/')) {
      config.url = `/v1${config.url}`;
    }

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const url = originalRequest?.url ?? '';
    const isExcludedAuthRequest =
      url.includes('/auth/login') || url.includes('/auth/refresh');

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isExcludedAuthRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    let newAccessToken: string;
    try {
      const { data } = await api.post('/auth/refresh');
      const refreshedToken = data.data?.accessToken;

      if (typeof refreshedToken !== 'string' || !refreshedToken) {
        throw new Error('Token refresh response did not include an access token.');
      }
      newAccessToken = refreshedToken;
    } catch (refreshError) {
      isRefreshing = false;
      setAccessToken(null);
      settleQueue(refreshError);
      window.dispatchEvent(new Event('auth:session-expired'));

      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }

      return Promise.reject(refreshError);
    }

    setAccessToken(newAccessToken);
    isRefreshing = false;
    settleQueue(null, newAccessToken);
    originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
    return api(originalRequest);
  },
);

export default api;
