/**
 * src/integrations/adapters/PlatformAdapter.contract.ts
 * Layer: Integrations / Adapters (TypeScript Contract Verification)
 * Responsibility: Compile-time verification that a concrete adapter satisfies IPlatformAdapter
 *                 and all normalized DTOs, capability flags, and API response structures.
 */

import type {
  AdapterResult,
  ApiResponse,
  IPlatformAdapter,
  NormalizedContest,
  NormalizedProblem,
  NormalizedProfile,
  NormalizedRatingChange,
  NormalizedSubmission,
  PlatformAccountDTO,
  PlatformCapabilities,
} from './PlatformAdapter.types';

export class ContractMockAdapter implements IPlatformAdapter {
  public readonly platformName = 'codeforces' as const;

  capabilities(): PlatformCapabilities {
    return {
      submissions: true,
      ratingHistory: true,
      contests: true,
      verification: true,
      partialData: false,
      rateLimitDelayMs: 2000,
      supportsIncrementalSync: true,
    };
  }

  normalizeHandle(handle: string): string {
    return handle.trim();
  }

  async verifyOwnership(handle: string, challengeCode: string): Promise<boolean> {
    return Boolean(this.normalizeHandle(handle) && challengeCode);
  }

  async fetchProfile(handle: string): Promise<NormalizedProfile> {
    return {
      platform: this.platformName,
      handle: this.normalizeHandle(handle),
      rating: null,
      rank: null,
      fetchedAt: new Date(),
      operationalState: 'connected',
    };
  }

  async fetchSubmissions(handle: string, since?: Date | null): Promise<NormalizedSubmission[]> {
    void handle;
    void since;
    return [];
  }

  async fetchRatingHistory(handle: string): Promise<NormalizedRatingChange[]> {
    void handle;
    return [];
  }

  async fetchContests(handle?: string): Promise<NormalizedContest[]> {
    void handle;
    return [];
  }
}

export function wrapSuccessResponse<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

export function wrapAdapterResult<T>(data: T): AdapterResult<T> {
  return { ok: true, data, state: 'connected' };
}

export type ContractTypeBundle = {
  account: PlatformAccountDTO;
  problem: NormalizedProblem;
};
