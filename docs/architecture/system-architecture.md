# 🏗️ CodeONE System Architecture

> **Architecture Type:** API-First Modular Monolith  
> **Source of Truth:** CodeONE Technical Documentation (Chapter 2)

---

## 📌 1. High-Level Topology

CodeONE is organized into four distinct architectural tiers:

1. **Client Presentation Tier:** Single-Page Application (SPA) built with React 18, Vite, Tailwind CSS, TanStack Query, and Recharts.
2. **API & Middleware Tier:** Layered Node.js 22+ LTS Express.js application exposing versioned REST JSON endpoints under `/api/v1`.
3. **Platform Adapter Layer:** Isolated adapters enforcing the 12-point Permanent API Integration Policy:
   - Priority 1 (Official API): Codeforces (1 req/2s pacing).
   - Priority 2 (Third-Party API): AtCoder via AtCoder Problems (>1s pacing).
   - Priority 2 (Official v1 API): Codewars.
   - Fallback: Manual Data Import (JSON/CSV) for platforms with scraping restrictions (LeetCode, CodeChef).
4. **Persistence & Staged Caching Tier:** PostgreSQL 15+ managed centrally via Prisma ORM (17 SQL tables across 15 logical groups) with optional staged Redis 7+ cache.

---

## 🔄 2. Core Request & Synchronization Workflows

* **Synchronous API Requests:** Helmet → CORS Allowlist → express.json → Logger → Rate Limiter → JWT Auth (15m in-memory) → 4-Role RBAC → Joi Validation → Controller → Service → Prisma ORM → Standard JSON Envelope.
* **Asynchronous Platform Sync (HTTP 202 Accepted):** Triggering account synchronization creates a persistent record in `sync_logs` (status: `running`), immediately responds with `202 Accepted`, and normalizes external telemetry asynchronously without blocking the Node.js event loop.

