/**
 * src/hooks/useGoals.js
 * Layer: Frontend / Custom Hooks (TanStack Query)
 * Responsibility: Manages query caching and mutations for daily/weekly/monthly goals.
 * Interaction: Invokes goalService; powers ActiveGoals widget and Goals page.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGoals, createGoal, updateGoal, deleteGoal } from '../services/goalService';

export function useGoals(activeOnly = true) {
  return useQuery({
    queryKey: ['goals', { activeOnly }],
    queryFn: () => fetchGoals(activeOnly),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createGoal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, updates }) => updateGoal(goalId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (goalId) => deleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

