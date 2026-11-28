CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(150) NOT NULL,
  "password_hash" TEXT,
  "avatar_url" TEXT,
  "role" VARCHAR(20) NOT NULL DEFAULT 'user',
  "email_verified" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_login" TIMESTAMPTZ,
  "settings" JSONB NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "failed_login_attempts" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "lock_until" TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "google_id" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "github_id" VARCHAR(255);

CREATE UNIQUE INDEX IF NOT EXISTS "users_google_id_key" ON "users"("google_id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_github_id_key" ON "users"("github_id");

CREATE TABLE IF NOT EXISTS "oauth_accounts" (
  "id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "provider" VARCHAR(30) NOT NULL,
  "provider_user_id" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "oauth_accounts_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "oauth_accounts_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "oauth_accounts_provider_provider_user_id_key"
  ON "oauth_accounts"("provider", "provider_user_id");

CREATE TABLE IF NOT EXISTS "user_sessions" (
  "id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "family_id" UUID NOT NULL,
  "ip_address" VARCHAR(45),
  "user_agent" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_seen_at" TIMESTAMPTZ,
  "expires_at" TIMESTAMPTZ NOT NULL,
  "revoked_at" TIMESTAMPTZ,
  CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "user_sessions_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "idx_user_sessions_user" ON "user_sessions"("user_id");
CREATE INDEX IF NOT EXISTS "user_sessions_family_id_idx" ON "user_sessions"("family_id");

CREATE TABLE IF NOT EXISTS "refresh_tokens" (
  "id" UUID NOT NULL,
  "session_id" UUID NOT NULL,
  "token_hash" VARCHAR(255) NOT NULL,
  "is_revoked" BOOLEAN NOT NULL DEFAULT false,
  "expires_at" TIMESTAMPTZ NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "replaced_by" UUID,
  CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "refresh_tokens_session_id_fkey"
    FOREIGN KEY ("session_id") REFERENCES "user_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "refresh_tokens_replaced_by_fkey"
    FOREIGN KEY ("replaced_by") REFERENCES "refresh_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");

CREATE TABLE IF NOT EXISTS "audit_logs" (
  "id" UUID NOT NULL,
  "actor_user_id" UUID,
  "actor_role" VARCHAR(50) NOT NULL,
  "action" VARCHAR(100) NOT NULL,
  "resource_type" VARCHAR(50) NOT NULL,
  "resource_id" VARCHAR(100),
  "ip_address" VARCHAR(45),
  "user_agent" TEXT,
  "status" VARCHAR(20) NOT NULL,
  "metadata" JSONB NOT NULL DEFAULT '{}'::jsonb,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "audit_logs_actor_user_id_fkey"
    FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "idx_audit_logs_actor" ON "audit_logs"("actor_user_id");
CREATE INDEX IF NOT EXISTS "idx_audit_logs_action" ON "audit_logs"("action");
CREATE INDEX IF NOT EXISTS "idx_audit_logs_created_at" ON "audit_logs"("created_at");
