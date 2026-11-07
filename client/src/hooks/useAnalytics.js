/**
 * src/hooks/useAnalytics.js
 * Layer: Frontend / Custom Hooks (TanStack Query)
 * Responsibility: Manages server-state caching for dashboard KPI summary, streaks, heatmaps, and ratings.
 * Interaction: Invokes analyticsService; powers Dashboard and Analytics pages.
 */

import { useQuery } from '@tanstack/react-query';
import {
  fetchDashboardSummary,
  fetchStreakAnalytics,
  fetchPlatformAnalytics,
  fetchRatingTrajectories,
  fetchTopicMastery,
} from '../services/analyticsService';

export function useDashboard() {
  return useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: fetchDashboardSummary,
    staleTime: 5 * 60 * 1000,
  });
}

export function useStreakData(year = new Date().getFullYear()) {
  return useQuery({
    queryKey: ['analytics', 'streaks', year],
    queryFn: () => fetchStreakAnalytics(year),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePlatformAnalytics(platform) {
  return useQuery({
    queryKey: ['analytics', 'platform', platform],
    queryFn: () => fetchPlatformAnalytics(platform),
    enabled: !!platform,
    staleTime: 10 * 60 * 1000,
  });
}

export function useRatingTrajectories(platform = null) {
  return useQuery({
    queryKey: ['analytics', 'ratings', platform],
    queryFn: () => fetchRatingTrajectories(platform),
    staleTime: 15 * 60 * 1000,
  });
}

export function useTopicMastery() {
  return useQuery({
    queryKey: ['analytics', 'topics'],
    queryFn: fetchTopicMastery,
    staleTime: 10 * 60 * 1000,
  });
}
