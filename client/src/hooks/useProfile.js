/**
 * src/hooks/useProfile.js
 * Layer: Frontend / Custom Hooks (TanStack Query)
 * Responsibility: Manages user profile settings and platform account linking mutations.
 * Interaction: Invokes userService; invalidates query keys on account link/unlink.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCurrentUserProfile,
  updateUserProfile,
  getLinkedPlatformAccounts,
  linkPlatformAccount,
  verifyPlatformOwnership,
  unlinkPlatformAccount,
} from '../services/userService';

export function useUserProfile() {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: getCurrentUserProfile,
    staleTime: 10 * 60 * 1000,
  });
}

export function usePlatformAccounts() {
  return useQuery({
    queryKey: ['platform-accounts'],
    queryFn: getLinkedPlatformAccounts,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLinkPlatformAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ platform, username }) => linkPlatformAccount(platform, username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    },
  });
}

export function useVerifyPlatformOwnership() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ accountId, verificationCode }) =>
      verifyPlatformOwnership(accountId, verificationCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useUnlinkPlatformAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (accountId) => unlinkPlatformAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

