/**
 * src/services/goalService.js
 * Layer: Frontend / Service Layer
 * Responsibility: API communication for coding targets and goals management.
 * Interaction: Invoked by useGoals hook and Goals page.
 */

import api from './api';

export async function fetchGoals(activeOnly = true) {
  const { data } = await api.get('/goals', { params: { active: activeOnly } });
  return data.data;
}

export async function createGoal(goalPayload) {
  const { data } = await api.post('/goals', goalPayload);
  return data.data;
}

export async function updateGoal(goalId, updates) {
  const { data } = await api.patch(`/goals/${goalId}`, updates);
  return data.data;
}

export async function deleteGoal(goalId) {
  const { data } = await api.delete(`/goals/${goalId}`);
  return data.data;
}

