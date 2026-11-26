# 🗄️ CodeONE Database Architecture Overview

> **Database:** PostgreSQL 15+  
> **ORM & Migration Tool:** Prisma ORM (`prisma/schema.prisma`)  
> **Structural Design:** 15 Logical Groups / 17 Physical SQL Tables  
> **Specification Reference:** *CodeONE Technical Documentation — Chapter 4*

---

## 📌 1. Architectural Philosophy & Design Principles

The CodeONE database architecture enforces four primary engineering invariants:

1. **Strict 3NF Relational Normalization:** Preserves relational integrity across user accounts, platform handles, submission streams, problems catalogue, and contest participation.
2. **Separation of Mutable State vs. Immutable History:**
   * **`user_problems` (Mutable Current State):** Tracks a user's current status (`solved`, `in_progress`, `review_later`, `todo`), personal notes, and bookmarks.
   * **`submissions` (Immutable Telemetry):** Stores timestamped, immutable submission logs (`external_id`, `verdict`, `language`, `submitted_at`). Global streaks and 365-day heatmaps are derived exclusively from this table.
3. **Cryptographically Secure UUID Primary Keys:** All primary keys utilize UUID v4 (`gen_random_uuid()`), preventing sequential enumeration and horizontal IDOR attacks.
4. **Append-Only Security Audit Logging:** `audit_logs` records authentication, authorization, role modifications, and admin actions. The application role is granted `INSERT` and limited `SELECT` privileges only.

---

## 📊 2. Complete Table Overview (15 Logical Groups / 17 Physical Tables)

| Logical Group # | Physical SQL Table Name | Primary Purpose & Key Responsibilities |
|---|---|---|
| **1. User Management** | `users` | Core accounts, password hash, role (`user`, `moderator`, `admin`, `auditor`), and settings JSONB. |
| **2. Authentication & OAuth** | `oauth_accounts` | Third-party OAuth 2.0 identity bindings (`google`, `github`). |
| **3. User Sessions** | `user_sessions` | Server-tracked session lifecycle with `family_id` for token reuse detection. |
| **4. Refresh Tokens** | `refresh_tokens` | Rotating refresh tokens storing SHA-256 `token_hash` and `replaced_by` lineage. |
| **5. Platform Accounts** | `platform_accounts` | Linked coding handles, verification status (`unverified`, `pending`, `verified`, `failed`), and sync frequencies. |
| **6. Problem Catalogue** | `problems` | Multi-platform problem catalogue with difficulty ratings and acceptance rates. |
| **6. Problem Catalogue** | `tags` | Algorithmic topic taxonomy (23+ categories). |
| **6. Problem Catalogue** | `problem_tags` | Many-to-many join table between problems and tags. |
| **7. User Problems** | `user_problems` | Mutable per-user problem state (status, bookmark, attempts, solved_at, notes). |
| **8. Submissions** | `submissions` | Immutable submission history powering global streaks and activity heatmaps. |
| **9. Rating History** | `rating_history` | Historical contest rating transitions (`old_rating`, `new_rating`, `recorded_at`). |
| **10. Contests** | `contests` | Unified contest calendar (`platform`, `start_time`, `duration_seconds`, `source`). |
| **11. Contest Participations** | `contest_participations` | User contest results (`rank`, `solved_count`, `rating_change`). |
| **12. Goals** | `goals` | User coding targets (`daily`, `weekly`, `monthly`) with progress counters. |
| **13. Notifications** | `notifications` | In-app alerts (`contest_reminder`, `streak_alert`) with `read_at` timestamps. |
| **14. Sync Logs** | `sync_logs` | Asynchronous platform sync tracking (`running`, `success`, `partial`, `failed`, `rate_limited`). |
| **15. Audit Logs** | `audit_logs` | Append-only security audit trail recording actor, action, status, and metadata. |

---

## 🔗 3. Foreign Key Cardinality & Cascade Behavior

| Parent Entity (1) | Child Entity (N) | Cardinality | Foreign Key Column | ON DELETE Rule |
|---|---|---|---|---|
| `users` | `platform_accounts` | 1 : N | `platform_accounts.user_id` | **CASCADE** |
| `users` | `oauth_accounts` | 1 : N | `oauth_accounts.user_id` | **CASCADE** |
| `users` | `user_sessions` | 1 : N | `user_sessions.user_id` | **CASCADE** |
| `user_sessions` | `refresh_tokens` | 1 : N | `refresh_tokens.session_id` | **CASCADE** |
| `refresh_tokens` | `refresh_tokens` | 1 : 1 (Self) | `refresh_tokens.replaced_by` | **SET NULL** |
| `users` | `user_problems` | 1 : N | `user_problems.user_id` | **CASCADE** |
| `problems` | `user_problems` | 1 : N | `user_problems.problem_id` | **CASCADE** |
| `problems` | `problem_tags` | 1 : N | `problem_tags.problem_id` | **CASCADE** |
| `tags` | `problem_tags` | 1 : N | `problem_tags.tag_id` | **CASCADE** |
| `platform_accounts` | `submissions` | 1 : N | `submissions.platform_account_id` | **CASCADE** |
| `problems` | `submissions` | 1 : N | `submissions.problem_id` | **SET NULL** |
| `platform_accounts` | `rating_history` | 1 : N | `rating_history.platform_account_id` | **CASCADE** |
| `contests` | `rating_history` | 1 : N | `rating_history.contest_id` | **SET NULL** |
| `platform_accounts` | `contest_participations` | 1 : N | `contest_participations.platform_account_id` | **CASCADE** |
| `contests` | `contest_participations` | 1 : N | `contest_participations.contest_id` | **CASCADE** |
| `platform_accounts` | `sync_logs` | 1 : N | `sync_logs.platform_account_id` | **CASCADE** |
| `users` | `goals` | 1 : N | `goals.user_id` | **CASCADE** |
| `users` | `notifications` | 1 : N | `notifications.user_id` | **CASCADE** |
| `users` | `audit_logs` | 1 : N | `audit_logs.actor_user_id` | **SET NULL** |

---

## ⚡ 4. Indexing & Query Optimization Strategy

The architecture incorporates 13 explicit B-tree indexes paired with 9 automatic UNIQUE indexes:

* **`idx_submissions_account_time` (`platform_account_id`, `submitted_at DESC`):** Critical composite index accelerating timezone-aware global streak evaluations and 365-day heatmaps.
* **`idx_user_problems_user_status` (`user_id`, `status`):** Accelerates dashboard solved counters and problem workspace filters.
* **`idx_rating_history_account_time` (`platform_account_id`, `recorded_at`):** Powers chronological per-platform rating progression charts.
* **`idx_contests_start` (`start_time`):** Optimizes upcoming contest countdown filtering (`WHERE start_time > now() ORDER BY start_time`).
* **`idx_notifications_user_unread` (`user_id`, `read_at`):** Accelerates unread alert count lookups.
* **`idx_audit_logs_actor / action / created_at`:** Dedicated indexes supporting security and compliance audits.

---

## 🚀 5. Migration & Operational Discipline

1. **Declarative Source of Truth:** `server/prisma/schema.prisma` defines the database model.
2. **Development Migrations:** Run `npx prisma migrate dev --name <migration_name>` in `server/`.
3. **Production Releases:** Executed via `npx prisma migrate deploy` in CI/CD before container startup.
4. **Zero Destructive Actions:** Modifying or dropping production columns requires additive migration phases.

