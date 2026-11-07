/**
 * src/services/analyticsService.js
 * Layer: Frontend / Service Layer
 * Responsibility: API communication for dashboard summary, global streaks, heatmaps,
 *                 platform deep-dives, rating trends, and topic mastery.
 * Interaction: Invoked by useAnalytics hook and dashboard/analytics page views.
 */

import api from './api';

export async function fetchDashboardSummary() {
  const { data } = await api.get('/analytics/dashboard');
  return data.data;
}

export async function fetchStreakAnalytics(year) {
  const { data } = await api.get('/analytics/streaks', { params: { year } });
  return data.data;
}

export async function fetchPlatformAnalytics(platform) {
  const { data } = await api.get(`/analytics/platforms/${platform}`);
  return data.data;
}

export async function fetchRatingTrajectories(platform = null) {
  const { data } = await api.get('/analytics/ratings', { params: { platform } });
  return data.data;
}

export async function fetchTopicMastery() {
  const { data } = await api.get('/analytics/topics');
  return data.data;
}
