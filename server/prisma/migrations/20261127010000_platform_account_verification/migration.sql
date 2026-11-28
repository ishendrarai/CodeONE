ALTER TABLE "platform_accounts"
  ADD COLUMN IF NOT EXISTS "verification_token_hash" VARCHAR(64),
  ADD COLUMN IF NOT EXISTS "verification_expires_at" TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS "idx_platform_verified_handle_unique"
  ON "platform_accounts" ("platform_name", LOWER("username"))
  WHERE "verification_status" = 'verified';
