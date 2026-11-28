-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('USER', 'MODERATOR', 'ADMIN', 'AUDITOR');

-- Normalize existing values before enforcing the authentication schema.
UPDATE "users" SET "email" = LOWER("email") WHERE "email" <> LOWER("email");

ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "user_role" USING UPPER("role")::"user_role";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_actor_user_id_fkey";

-- DropIndex
DROP INDEX "idx_audit_logs_actor";

-- AlterTable
ALTER TABLE "audit_logs" RENAME COLUMN "actor_user_id" TO "user_id";

-- AlterTable
ALTER TABLE "refresh_tokens" ADD COLUMN "family_id" UUID,
ADD COLUMN "user_id" UUID;

UPDATE "refresh_tokens" AS refresh_token
SET "family_id" = session."family_id",
    "user_id" = session."user_id"
FROM "user_sessions" AS session
WHERE refresh_token."session_id" = session."id";

ALTER TABLE "refresh_tokens" ALTER COLUMN "family_id" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;

-- CreateIndex
CREATE INDEX "idx_audit_logs_actor" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_family_id_idx" ON "refresh_tokens"("family_id");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

