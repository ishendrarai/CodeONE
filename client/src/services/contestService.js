/**
 * src/services/contestService.js
 * Layer: Frontend / Service Layer
 * Responsibility: API communication for contest calendar listings and user contest participations.
 * Interaction: Invoked by useContests hook and Contests page.
 */

import api from './api';

export async function fetchContests(params = {}) {
  const { data } = await api.get('/contests', { params });
  return data.data;
}

export async function fetchContestParticipations(params = {}) {
  const { data } = await api.get('/contests/participations', { params });
  return data.data;
}

