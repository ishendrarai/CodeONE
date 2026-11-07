/**
 * src/services/userService.js
 * Layer: Frontend / Service Layer
 * Responsibility: API communication for profile retrieval, settings updates, and linked platform accounts.
 * Interaction: Invoked by useProfile and useAuth custom hooks.
 */

import api from './api';

export async function getCurrentUserProfile() {
  const { data } = await api.get('/users/me');
  return data.data;
}

export async function updateUserProfile(updates) {
  const { data } = await api.patch('/users/me', updates);
  return data.data;
}

export async function getLinkedPlatformAccounts() {
  const { data } = await api.get('/platform-accounts');
  return data.data;
}

export async function linkPlatformAccount(platform, username) {
  const { data } = await api.post('/platform-accounts', { platform, username });
  return data.data;
}

export async function verifyPlatformOwnership(accountId, verificationCode) {
  const { data } = await api.post(`/platform-accounts/${accountId}/verify`, { verificationCode });
  return data.data;
}

export async function unlinkPlatformAccount(accountId) {
  const { data } = await api.delete(`/platform-accounts/${accountId}`);
  return data.data;
}

