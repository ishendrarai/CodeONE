/**
 * src/services/authService.js
 * Layer: Frontend / Service Layer
 * Responsibility: API communication for authentication endpoints (register, login, logout, refresh).
 * Interaction: Invokes Axios client and coordinates with AuthContext and in-memory token store.
 */

import api, { setAccessToken } from './api';

export async function registerUser(credentials) {
  const { data } = await api.post('/auth/register', credentials);
  if (data.data?.accessToken) {
    setAccessToken(data.data.accessToken);
  }
  return data.data;
}

export async function loginUser(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  if (data.data?.accessToken) {
    setAccessToken(data.data.accessToken);
  }
  return data.data;
}

export async function logoutUser() {
  try {
    await api.post('/auth/logout');
  } finally {
    setAccessToken(null);
  }
}

export async function refreshSession() {
  const { data } = await api.post('/auth/refresh');
  if (data.data?.accessToken) {
    setAccessToken(data.data.accessToken);
  }
  return data.data;
}
