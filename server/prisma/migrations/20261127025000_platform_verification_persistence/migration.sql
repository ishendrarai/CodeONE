-- Stage 3 (P1): Persistent verification challenge columns and verified handle uniqueness on platform_accounts

ALTER TABLE "platform_accounts"
  ADD COLUMN IF NOT EXISTS "verification_token" VARCHAR(64),
  ADD COLUMN IF NOT EXISTS "verification_expires_at" TIMESTAMPTZ;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'chk_platform_accounts_verification_status'
  ) THEN
    ALTER TABLE "platform_accounts"
      ADD CONSTRAINT "chk_platform_accounts_verification_status"
      CHECK ("verification_status" IN ('unverified', 'pending', 'verified', 'failed'));
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "idx_platform_verified_handle_unique"
  ON "platform_accounts"("platform_name", LOWER("username"))
  WHERE "verification_status" = 'verified';
