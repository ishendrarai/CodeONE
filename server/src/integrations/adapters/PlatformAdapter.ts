/**
 * src/integrations/adapters/PlatformAdapter.ts
 * Layer: Integrations / Adapters (Blueprint §5.2 Canonical Contract)
 * Responsibility: Authoritative TypeScript interface module exposing PlatformAdapter, SourceState,
 *                 AdapterCapabilities, OwnershipVerificationResult, and normalized DTO contracts.
 */

import type {
  AdapterCapabilities,
  AdapterErrorInfo,
  AdapterResult,
  ApiErrorDetail,
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
  IPlatformAdapter,
  NormalizedContest,
  NormalizedProblem,
  NormalizedProfile,
  NormalizedRatingChange,
  NormalizedSubmission,
  OwnershipVerificationResult,
  PlatformAccountDTO,
  PlatformCapabilities,
  PlatformName,
  PlatformOperationalState,
  ProblemDifficulty,
  ProfileSnapshot,
  SourceState,
  SubmissionVerdict,
  VerificationStatus,
} from './PlatformAdapter.types';

export type PlatformAdapter = IPlatformAdapter;

export type {
  AdapterCapabilities,
  AdapterErrorInfo,
  AdapterResult,
  ApiErrorDetail,
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
  IPlatformAdapter,
  NormalizedContest,
  NormalizedProblem,
  NormalizedProfile,
  NormalizedRatingChange,
  NormalizedSubmission,
  OwnershipVerificationResult,
  PlatformAccountDTO,
  PlatformCapabilities,
  PlatformName,
  PlatformOperationalState,
  ProblemDifficulty,
  ProfileSnapshot,
  SourceState,
  SubmissionVerdict,
  VerificationStatus,
};
