/**
 * src/integrations/adapters/PlatformAdapter.types.ts
 * Layer: Integrations / Adapters (P0 Contract)
 * Responsibility: Universal TypeScript contract, normalized DTOs, capability flags,
 *                 operational states, and common API response envelopes for all platform adapters.
 * Policy: Governed by the 12-point Permanent API Integration Policy. Never store external passwords.
 */

export type PlatformName = 'codeforces' | 'atcoder' | 'codewars' | 'manual_import';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'failed';

export type SourceState =
  | 'connected'
  | 'partial_data'
  | 'rate_limited'
  | 'not_connected'
  | 'source_unavailable'
  | 'not_approved';

export type PlatformOperationalState = SourceState | 'reauthorization_required';

export type ProblemDifficulty = 'easy' | 'medium' | 'hard';

export type SubmissionVerdict =
  | 'accepted'
  | 'wrong_answer'
  | 'time_limit_exceeded'
  | 'memory_limit_exceeded'
  | 'runtime_error'
  | 'compilation_error'
  | 'partial'
  | 'other';

export interface AdapterCapabilities {
  profile: boolean;
  ownershipChallenge: boolean;
  submissions: boolean;
  ratingHistory: boolean;
  contests: boolean;
  verification?: boolean;
  partialData?: boolean;
  rateLimitDelayMs?: number;
  supportsIncrementalSync?: boolean;
}

export type PlatformCapabilities = AdapterCapabilities;

export interface PlatformAccountDTO {
  id: string;
  userId: string;
  platformName: PlatformName;
  username: string;
  verificationStatus: VerificationStatus;
  verifiedAt: Date | null;
  rating: number | null;
  rank: string | null;
  lastSynced: Date | null;
  isActive: boolean;
  syncFrequency: number;
}

export interface ProfileSnapshot {
  rating: number | null;
  rank: string | null;
  maxRating?: number | null;
  maxRank?: string | null;
}

export interface OwnershipVerificationResult {
  verified: boolean;
  canonicalHandle?: string;
  profileSnapshot?: ProfileSnapshot;
}

export interface NormalizedProfile {
  platform: PlatformName;
  handle: string;
  canonicalHandle: string;
  displayName?: string | null;
  rating: number | null;
  maxRating?: number | null;
  rank: string | null;
  maxRank?: string | null;
  avatarUrl?: string | null;
  profileUrl?: string | null;
  fetchedAt: Date;
  operationalState?: PlatformOperationalState;
  metadata?: Record<string, unknown>;
}

export interface NormalizedProblem {
  platform: PlatformName;
  problemId: string;
  title: string;
  difficulty: ProblemDifficulty | null;
  difficultyRating: number | null;
  url: string;
  tags: string[];
  acceptanceRate?: number | null;
}

export interface NormalizedSubmission {
  externalId: string;
  platform?: PlatformName;
  problemId: string;
  title: string;
  verdict: SubmissionVerdict | string;
  rawVerdict?: string;
  language: string | null;
  submittedAt: Date;
  problem?: NormalizedProblem;
}

export interface NormalizedRatingChange {
  contestId: string;
  contestName?: string;
  rank?: number | null;
  oldRating: number | null;
  newRating: number;
  recordedAt: Date;
}

export interface NormalizedContest {
  externalId: string;
  platform?: PlatformName;
  name: string;
  startTime: Date;
  durationSeconds: number;
  url: string | null;
  source?: string;
}

export interface AdapterErrorInfo {
  name: string;
  code: string;
  message: string;
  statusCode: number;
  platform: PlatformName | string;
  retryable: boolean;
  details?: Record<string, unknown>;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
}

export interface ApiErrorDetail {
  field?: string;
  issue: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type AdapterResult<T> =
  | { ok: true; data: T; state: PlatformOperationalState }
  | { ok: false; error: AdapterErrorInfo; state: PlatformOperationalState };

export interface IPlatformAdapter {
  readonly platformName: PlatformName | string;

  capabilities(): AdapterCapabilities;

  normalizeHandle(handle: string): string;

  verifyOwnership(handle: string, expectedToken: string): Promise<OwnershipVerificationResult>;

  fetchProfile(handle: string): Promise<NormalizedProfile>;

  fetchSubmissions(handle: string, since?: Date | null): Promise<NormalizedSubmission[]>;

  fetchRatingHistory(handle: string): Promise<NormalizedRatingChange[]>;

  fetchContests(handle?: string): Promise<NormalizedContest[]>;
}
