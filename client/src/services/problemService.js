/**
 * src/services/problemService.js
 * Layer: Frontend / Service Layer
 * Responsibility: API communication for problem catalogue search, user problem state updates,
 *                 and paginated submission history.
 * Interaction: Invoked by useProblems hook and problem workspace components.
 */

import api from './api';

export async function fetchCatalogueProblems(params = {}) {
  const { data } = await api.get('/problems', { params });
  return data;
}

export async function fetchUserProblemState(problemId) {
  const { data } = await api.get(`/user-problems/${problemId}`);
  return data.data;
}

export async function updateUserProblemState(problemId, updates) {
  const { data } = await api.patch(`/user-problems/${problemId}`, updates);
  return data.data;
}

export async function fetchUserSubmissions(params = {}) {
  const { data } = await api.get('/submissions', { params });
  return data;
}
