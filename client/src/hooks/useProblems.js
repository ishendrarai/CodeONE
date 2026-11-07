/**
 * src/hooks/useProblems.js
 * Layer: Frontend / Custom Hooks (TanStack Query)
 * Responsibility: Manages server-state caching for problem catalogue, problem states, and submissions.
 * Interaction: Invokes problemService; handles cache invalidation on problem state mutations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCatalogueProblems,
  fetchUserProblemState,
  updateUserProblemState,
  fetchUserSubmissions,
} from '../services/problemService';

export function useCatalogueProblems(params = {}) {
  return useQuery({
    queryKey: ['problems', 'catalogue', params],
    queryFn: () => fetchCatalogueProblems(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserProblemState(problemId) {
  return useQuery({
    queryKey: ['problems', 'user-state', problemId],
    queryFn: () => fetchUserProblemState(problemId),
    enabled: !!problemId,
  });
}

export function useUpdateUserProblem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ problemId, updates }) => updateUserProblemState(problemId, updates),
    onSuccess: (_, { problemId }) => {
      queryClient.invalidateQueries({ queryKey: ['problems', 'user-state', problemId] });
      queryClient.invalidateQueries({ queryKey: ['analytics', 'dashboard'] });
    },
  });
}

export function useSubmissions(params = {}) {
  return useQuery({
    queryKey: ['submissions', params],
    queryFn: () => fetchUserSubmissions(params),
    staleTime: 2 * 60 * 1000,
  });
}
