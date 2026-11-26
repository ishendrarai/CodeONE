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

-- CreateTable
CREATE TABLE "platform_accounts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "platform_name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "verification_status" VARCHAR(20) NOT NULL DEFAULT 'unverified',
    "verified_at" TIMESTAMPTZ,
    "rating" INTEGER,
    "rank" VARCHAR(50),
    "last_synced" TIMESTAMPTZ,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sync_frequency" INTEGER NOT NULL DEFAULT 3600,

    CONSTRAINT "platform_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems" (
    "id" UUID NOT NULL,
    "platform" VARCHAR(50) NOT NULL,
    "problem_id" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "difficulty" VARCHAR(20),
    "difficulty_rating" INTEGER,
    "url" TEXT NOT NULL,
    "acceptance_rate" DECIMAL(5,2),
    "added_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_tags" (
    "problem_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "problem_tags_pkey" PRIMARY KEY ("problem_id","tag_id")
);

-- CreateTable
CREATE TABLE "user_problems" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "problem_id" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "is_bookmarked" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "solved_at" TIMESTAMPTZ,
    "notes" TEXT,

    CONSTRAINT "user_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" UUID NOT NULL,
    "platform_account_id" UUID NOT NULL,
    "problem_id" UUID,
    "external_id" VARCHAR(100) NOT NULL,
    "verdict" VARCHAR(30) NOT NULL,
    "language" VARCHAR(50),
    "submitted_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating_history" (
    "id" UUID NOT NULL,
    "platform_account_id" UUID NOT NULL,
    "contest_id" UUID,
    "old_rating" INTEGER,
    "new_rating" INTEGER NOT NULL,
    "recorded_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "rating_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contests" (
    "id" UUID NOT NULL,
    "platform" VARCHAR(50) NOT NULL,
    "external_id" VARCHAR(100),
    "name" VARCHAR(255) NOT NULL,
    "start_time" TIMESTAMPTZ NOT NULL,
    "duration_seconds" INTEGER NOT NULL,
    "url" TEXT,
    "source" VARCHAR(50),

    CONSTRAINT "contests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contest_participations" (
    "id" UUID NOT NULL,
    "platform_account_id" UUID NOT NULL,
    "contest_id" UUID NOT NULL,
    "rank" INTEGER,
    "solved_count" INTEGER,
    "rating_change" INTEGER,

    CONSTRAINT "contest_participations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "target" INTEGER NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "body" TEXT,
    "read_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" UUID NOT NULL,
    "platform_account_id" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMPTZ,
    "records_fetched" INTEGER NOT NULL DEFAULT 0,
    "error_message" TEXT,

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_platform_accounts_user" ON "platform_accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "platform_accounts_user_id_platform_name_key" ON "platform_accounts"("user_id", "platform_name");

-- CreateIndex
CREATE INDEX "idx_problems_difficulty" ON "problems"("difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "problems_platform_problem_id_key" ON "problems"("platform", "problem_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "idx_user_problems_user_status" ON "user_problems"("user_id", "status");

-- CreateIndex
CREATE INDEX "idx_user_problems_solved_at" ON "user_problems"("solved_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_problems_user_id_problem_id_key" ON "user_problems"("user_id", "problem_id");

-- CreateIndex
CREATE INDEX "idx_submissions_account_time" ON "submissions"("platform_account_id", "submitted_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "submissions_platform_account_id_external_id_key" ON "submissions"("platform_account_id", "external_id");

-- CreateIndex
CREATE INDEX "idx_rating_history_account_time" ON "rating_history"("platform_account_id", "recorded_at");

-- CreateIndex
CREATE INDEX "idx_contests_start" ON "contests"("start_time");

-- CreateIndex
CREATE UNIQUE INDEX "contests_platform_external_id_key" ON "contests"("platform", "external_id");

-- CreateIndex
CREATE UNIQUE INDEX "contest_participations_platform_account_id_contest_id_key" ON "contest_participations"("platform_account_id", "contest_id");

-- CreateIndex
CREATE INDEX "idx_notifications_user_unread" ON "notifications"("user_id", "read_at");

-- CreateIndex
CREATE INDEX "idx_sync_logs_account_time" ON "sync_logs"("platform_account_id", "started_at" DESC);

-- CreateIndex
CREATE INDEX "idx_audit_logs_actor" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_family_id_idx" ON "refresh_tokens"("family_id");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_accounts" ADD CONSTRAINT "platform_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_problems" ADD CONSTRAINT "user_problems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_problems" ADD CONSTRAINT "user_problems_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_platform_account_id_fkey" FOREIGN KEY ("platform_account_id") REFERENCES "platform_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_history" ADD CONSTRAINT "rating_history_platform_account_id_fkey" FOREIGN KEY ("platform_account_id") REFERENCES "platform_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_history" ADD CONSTRAINT "rating_history_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contest_participations" ADD CONSTRAINT "contest_participations_platform_account_id_fkey" FOREIGN KEY ("platform_account_id") REFERENCES "platform_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contest_participations" ADD CONSTRAINT "contest_participations_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_logs" ADD CONSTRAINT "sync_logs_platform_account_id_fkey" FOREIGN KEY ("platform_account_id") REFERENCES "platform_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

