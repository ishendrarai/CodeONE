/**
 * src/hooks/useContests.js
 * Layer: Frontend / Custom Hooks (TanStack Query)
 * Responsibility: Manages server-state caching for upcoming and past contests calendar.
 * Interaction: Invokes contestService; powers Contests page.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchContests, fetchContestParticipations } from '../services/contestService';

export function useContests(params = {}) {
  return useQuery({
    queryKey: ['contests', params],
    queryFn: () => fetchContests(params),
    staleTime: 30 * 60 * 1000, // 30-minute cache window
    refetchOnWindowFocus: false,
  });
}

export function useContestParticipations(params = {}) {
  return useQuery({
    queryKey: ['contests', 'participations', params],
    queryFn: () => fetchContestParticipations(params),
    staleTime: 15 * 60 * 1000,
  });
}

