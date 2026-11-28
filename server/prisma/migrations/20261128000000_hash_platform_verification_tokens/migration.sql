CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE "platform_accounts"
  ADD COLUMN IF NOT EXISTS "verification_token_hash" VARCHAR(64);

UPDATE "platform_accounts"
SET "verification_token_hash" = encode(digest("verification_token", 'sha256'), 'hex')
WHERE "verification_token" IS NOT NULL
  AND "verification_token_hash" IS NULL;

ALTER TABLE "platform_accounts"
  DROP COLUMN IF EXISTS "verification_token";
