/**
 * src/integrations/adapters/PlatformAdapter.contract.ts
 * Layer: Integrations / Adapters (TypeScript Contract Verification)
 * Responsibility: Compile-time verification that concrete adapters satisfy PlatformAdapter
 *                 (Blueprint §5.2), SourceState, AdapterCapabilities, and normalized DTOs.
 */

import type {
  AdapterCapabilities,
  AdapterResult,
  ApiResponse,
  NormalizedContest,
  NormalizedProblem,
  NormalizedProfile,
  NormalizedRatingChange,
  NormalizedSubmission,
  OwnershipVerificationResult,
  PlatformAccountDTO,
  PlatformAdapter,
  SourceState,
} from './PlatformAdapter';

export class ContractMockAdapter implements PlatformAdapter {
  public readonly platformName = 'codeforces' as const;

  capabilities(): AdapterCapabilities {
    return {
      profile: true,
      ownershipChallenge: true,
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

  async verifyOwnership(
    handle: string,
    expectedToken: string
  ): Promise<OwnershipVerificationResult> {
    const canonicalHandle = this.normalizeHandle(handle);
    return {
      verified: Boolean(canonicalHandle && expectedToken),
      canonicalHandle,
      profileSnapshot: { rating: null, rank: null },
    };
  }

  async fetchProfile(handle: string): Promise<NormalizedProfile> {
    const canonicalHandle = this.normalizeHandle(handle);
    return {
      platform: this.platformName,
      handle: canonicalHandle,
      canonicalHandle,
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

export function wrapAdapterResult<T>(
  data: T,
  state: SourceState = 'connected'
): AdapterResult<T> {
  return { ok: true, data, state };
}

export const ALL_SOURCE_STATES: readonly SourceState[] = [
  'connected',
  'partial_data',
  'rate_limited',
  'not_connected',
  'source_unavailable',
  'not_approved',
] as const;

export type ContractTypeBundle = {
  account: PlatformAccountDTO;
  problem: NormalizedProblem;
  sourceState: SourceState;
};
