# 🚀 CodeONE — Consolidate Your Competitive Programming Journey

> **A proposed unified analytics layer for competitive programmers.**
> *Track. Analyse. Improve. Stay consistent.*

![Node](https://img.shields.io/badge/Node.js-22+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)
![Redis](https://img.shields.io/badge/Redis-optional-red)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Research%20%26%20Documentation-informational)

---

## 📌 Table of Contents

1. [✨ Overview](#-1-overview)
2. [📊 Project Status](#-2-project-status)
3. [🔥 Feature Matrix](#-3-feature-matrix)
4. [🌐 Live Demo & Screenshots](#-4-live-demo--screenshots)
5. [🛠 Tech Stack](#-5-tech-stack)
6. [🏗 Architecture](#-6-architecture)
7. [🔌 Platform Integration Strategy](#-7-platform-integration-strategy)
8. [🗄 Database Schema (Proposed)](#-8-database-schema-proposed)
9. [📡 API Documentation](#-9-api-documentation)
10. [🔐 Authentication & Security](#-10-authentication--security)
11. [📈 Analytics Engine](#-11-analytics-engine)
12. [🤖 AI Features](#-12-ai-features)
13. [⚡ Performance](#-13-performance)
14. [🧪 Testing & Quality Assurance](#-14-testing--quality-assurance)
15. [🛣 Development Roadmap](#-15-development-roadmap)
16. [⚙️ Installation & Deployment](#-16-installation--deployment)
17. [⚠️ Known Limitations](#-17-known-limitations)
18. [❓ FAQ](#-18-faq)
19. [🧠 Design Decisions](#-19-design-decisions)
20. [🤝 Contributing](#-20-contributing)
21. [👥 Contributors](#-21-contributors)
22. [📄 License](#-22-license)
23. [📬 Contact](#-23-contact)
24. [🌟 Star History](#-24-star-history)
25. [🎯 Final Words](#-25-final-words)

---

## ✨ 1. Overview

**CodeONE** is a proposed full-stack competitive programming analytics platform for developers, students, and interview aspirants who solve problems across multiple platforms.

> **Project status:** This README describes the proposed system and researched integration options. It is not proof of a completed or deployed product. The source repository/application was not available during the documentation review. Feature statuses, architecture diagrams, API examples and setup instructions must be validated against the actual source code before being described as implemented.

> **Important note on "API documented":** In this README, "API documented" means a public document or source was located. It does **not** mean CodeONE has connected to that API, tested it, or that its use is legally approved. The *API classification* of a platform (official, third-party, unofficial) is separate from CodeONE's *implementation status*; every platform entry is **RESEARCHED / NOT IMPLEMENTED** unless a future repository audit proves otherwise. No platform integration is represented as implemented or tested in this README.

The project aims to reduce dashboard fragmentation by building a **single analytics workspace** for:

- 📊 **Progress tracking** — unified view across linked platforms
- 🔥 **Streak monitoring** — keep your momentum
- 📈 **Difficulty analysis** — identify your comfort zones
- 🧠 **Topic mastery** — track weak areas systematically
- 🏆 **Contest planning** — never miss important competitions
- 📉 **Performance trends** — visualize growth over time
- 🎯 **Goal management** — set and achieve daily/weekly targets

### ❌ The Problem

Competitive programmers face:

- ❌ **Fragmented tracking** — switching between 5+ platform dashboards
- ❌ **No unified analytics** — no single view of overall progress
- ❌ **Streak blindness** — activity on one platform doesn't count on another
- ❌ **Pattern ignorance** — unclear which topics need focus
- ❌ **Contest chaos** — easy to forget important competitions

### ✅ The Proposed Solution

CodeONE acts as a **performance intelligence layer** on top of existing platforms. Users link their platform accounts, CodeONE syncs permitted data, and the analytics engine produces:

- ✅ A single dashboard for all linked platforms
- ✅ Global streak tracking across platforms
- ✅ Strength and weakness analytics
- ✅ A centralized contest calendar with reminders
- ✅ Historical rating and activity trends

> It's not just a tracker. It's a **consistency engine**.

### 🎯 Target Users

- Competitive programmers who practice on more than one platform
- Students and interview aspirants who want structured progress tracking
- Coaches, clubs and communities that monitor learner progress (self-hosted)

### 🔥 Core Features vs. Long-Term Vision

| Core Features | Long-Term Vision |
|---|---|
| Authentication and account linking | Coverage of additional platforms (subject to approved access) |
| Unified dashboard | AI study plans and chatbot |
| Streaks and daily activity | Predictive performance estimates |
| Problem tracking, notes, bookmarks | Social features (profiles, leaderboards, groups) |
| Contest calendar and reminders | Mobile app and browser extensions |
| Rating history and submission statistics | Advanced tooling (interview mode, mock contests) |
| Rule-based weakness detection and recommendations | |

### 🏆 Key Highlights

- ✨ **Unified analytics concept** — one place to review data from permitted coding-platform sources
- 🔥 **Streak tracking** — planned activity and consistency views based on available timestamps
- 🧠 **Rule-based insights** — planned topic and difficulty analysis
- 🎯 **Goal management** — planned daily and weekly targets
- 🏆 **Contest calendar** — planned contest discovery from permitted sources
- 🌙 **Responsive UI direction**
- 🔒 **Privacy-aware design** — proposed data minimization and account-ownership controls
- 📌 **Transparent project status** — proposed capabilities and implementation status are documented separately

---

## 📊 2. Project Status

| Indicator | Meaning |
|---|---|
| ✅ **Implemented** | Working, with evidence available (code, tests, or demo) |
| 🚧 **In Progress** | Actively being built |
| 📋 **Planned** | Designed, not started |
| 🔬 **Research Required** | Feasibility, access or permission not established |
| ❓ **Not Verified** | Status unknown; no evidence available yet |

> **Rule:** No feature is marked ✅ Implemented until evidence exists. Maintainers should update statuses as the codebase is audited. Where this README describes security controls, performance figures or integrations, "proposed" means designed but unverified.

### 📋 Current Status Summary

| Area | Status |
|---|---|
| Product vision and README | ✅ Implemented (this document) |
| Platform API research | ✅ Implemented (documentation review dated 6 November 2026; no live integration tests) |
| Frontend, backend, database | ❓ Not Verified |
| Platform connectors | ❓ Not Verified (Codeforces is the first planned connector) |
| Security controls | 📋 Planned / ❓ Not Verified |
| Deployment and hosted demo | 📋 Planned |

---

## 🔥 3. Feature Matrix

| Feature | Status | Notes |
|---|---|---|
| Email/password authentication | ❓ Not Verified | Access + refresh token design in [Section 10](#-10-authentication--security) |
| Google / GitHub OAuth | ❓ Not Verified | Via `oauth_accounts` |
| Platform account linking | ❓ Not Verified | Ownership verification required |
| Codeforces sync | ❓ Not Verified | Official API; first integration priority |
| AtCoder sync (via AtCoder Problems) | 🔬 Research Required | Third-party dependency |
| Codewars sync | 🔬 Research Required | Official but minimally maintained API |
| LeetCode integration | 🔬 Research Required | No documented public API; Terms restrict scraping |
| CodeChef integration | 🔬 Research Required | No verified API; Terms restrict scraping |
| Manual data import | 📋 Planned | Fallback for platforms without approved access |
| Unified dashboard | ❓ Not Verified | |
| Global streak and heatmap | 📋 Planned | |
| Problem management (status, notes, bookmarks) | ❓ Not Verified | `user_problems` |
| Difficulty progression and topic mastery | 📋 Planned | |
| Contest calendar and reminders | 📋 Planned | Source pending terms review |
| Goals and targets | 📋 Planned | |
| Rule-based weakness detection | 📋 Planned | AI Level 1 |
| AI study plans / chatbot | 📋 Planned | AI Level 2 |
| Performance estimation and predictions | 🔬 Research Required | AI Level 3; needs sufficient data |
| Data export (JSON/CSV) | 📋 Planned | |
| Social features | 📋 Planned | |
| Mobile app / browser extensions | 📋 Planned | |

### 🧩 Detailed Feature Scope

> Describes the proposed scope. Statuses are in the matrix above; nothing here should be read as already implemented.

#### Unified Analytics Dashboard
- **Daily activity heatmap** — GitHub-style contribution graph
- **Global streak tracker** — combined streak across platforms
- **Platform comparison** — side-by-side performance metrics
- **Difficulty distribution** — Easy/Medium/Hard breakdown
- **Submission trends** — problems solved over time
- **Topic mastery** — Array, DP, Graph, etc. proficiency

#### Smart Problem Management
- **Multi-platform search** — find problems across supported sites
- **Advanced filtering** — by platform, tags, difficulty, status
- **Status tracking** — Solved / In Progress / Review Later / Todo
- **Topic categorization** — 20+ programming topics
- **Bookmark system** — save important problems
- **Notes** — personal notes per problem

#### Streak Intelligence
- **Current streak** and **longest streak**
- **Streak breakdown** — per-platform analysis
- **Year-long heatmap** — visual contribution calendar
- **Consistency alerts** — rule-based first; AI-assisted later
- **Recovery mode** — optional grace period (clearly labelled)

#### Contest Intelligence
- **Unified calendar** and **smart countdown** timers
- **Direct links** — one-click registration
- **Past contest analysis** — performance tracking
- **Rating graphs** — Codeforces and AtCoder; CodeChef only if access is approved
- **Contest reminders** — email/push notifications

#### Advanced Profile Management
- **Multi-platform linking** via public handles (with ownership verification)
- **Manual data import fallback** — user-provided exports for platforms without approved API access (supported formats are Research Required)
- **Goal tracking** — daily/weekly/monthly targets
- **Progress reports** — weekly email summaries
- **Notification preferences** and **privacy controls** (public/private profile)
- **Export data** — JSON/CSV
- **Dark mode**

#### Analytics & Insights
- **Time-based analysis** — daily/weekly/monthly views
- **Difficulty progression**
- **Topic weakness detection**
- **Consistency score** — gamified activity metric
- **Comparison mode** — compare with friends or global averages (opt-in, privacy-controlled)
- **Custom date ranges**

---

## 🌐 4. Live Demo & Screenshots

### 🚧 Live Demo

> 🚧 **Demo coming soon.** No hosted instance is live. Run locally using the [installation steps](#-16-installation--deployment).

No demo credentials are published because a seeded account and authentication flow have not been verified.

### 📸 Screenshots

> Screenshots will be added only when real captures from a running build are available. Until then, the table shows the planned views and their target components (design reference only).

| Planned View | Primary Content | Target Component |
|---|---|---|
| Dashboard Overview | Cross-platform solve counters, rank overview, recent submissions | `Dashboard.jsx`, `StatsCard.jsx` |
| Streak Analytics | 365-day activity heatmap, current and longest streaks | `StreakHeatmap.jsx` |
| Problems Management | Filterable multi-platform table with status tags and notes | `ProblemList.jsx`, `ProblemFilter.jsx` |
| Contest Calendar | Countdown timers, registration links, time-zone adjusted dates | `Contests.jsx` |

---

## 🛠 5. Tech Stack

> **Proposed stack.** These choices are the intended architecture; actual repository dependencies and versions were not inspected.

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache | Redis (optional initially) |
| Authentication | JWT + OAuth |
| Background Jobs | To be finalized (see below) |
| Deployment | Vercel (frontend) + suitable backend hosting |

### 📚 Supporting Libraries (Proposed)

| Area | Libraries |
|---|---|
| Frontend | Tailwind CSS, Recharts, Axios, React Router, TanStack Query (React Query), React Hook Form |
| Backend | Joi (validation), Argon2id or bcrypt (password hashing), `jsonwebtoken`, Nodemailer, Passport (OAuth), `helmet`, `express-rate-limit`, `cors` |
| Testing | Jest, Supertest, React Testing Library |
| Tooling | ESLint, Prettier, Docker, GitHub Actions |

<details>
<summary><b>Library purposes (original stack notes)</b></summary>

| Technology | Purpose |
|---|---|
| React.js 18 | Component-based UI |
| Vite | Fast build tool |
| Tailwind CSS | Utility-first styling |
| Recharts | Data visualization |
| Axios | HTTP client |
| React Router | Client-side routing |
| React Query | Server state management |
| React Hook Form | Form validation |
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| TypeScript | Type safety (optional; decide early) |
| Joi | Request validation |
| bcrypt / Argon2id | Password hashing |
| jsonwebtoken | JWT authentication |
| Nodemailer | Email service |
| PostgreSQL | Primary database |
| Redis | Caching (optional initially) |
| Prisma | ORM layer |
| Docker | Containerization |
| GitHub Actions | CI/CD pipeline |
| Prometheus + Grafana | Metrics and dashboards (later) |
| Let's Encrypt | SSL certificates |

</details>

### 🪜 Staged Introduction Plan

Complexity is introduced only when a real requirement appears.

| Component | Introduce when | Until then |
|---|---|---|
| **Redis** | Measured slow dashboard/analytics queries, or distributed rate limiting is needed | PostgreSQL queries and indexes; in-process rate limiting |
| **Background jobs** | Scheduled syncs or contest ingestion outgrow a simple in-process scheduler (e.g. `node-cron`) | Manual and on-demand sync. Candidates: `node-cron` first, BullMQ (requires Redis) later |
| **Nginx / load balancer** | Self-hosting on a VM or multi-instance deployment | Platform-managed hosting handles TLS and routing |
| **Prometheus / Grafana** | Production traffic exists and needs monitoring | Structured logs and host-provided metrics |
| **TypeScript** | Team decision before large codebase growth | Choose once, early; avoid mixing |

---

## 🏗 6. Architecture

**Proposed architecture type:** Modular monolith (API-first). This is a design proposal; the repository and running application were not available for verification.

### 🔷 High-Level Architecture

```mermaid
flowchart TB
    A[React + Vite Frontend] --> B[Express API]
    B --> C[Auth Module]
    B --> D[Analytics Module]
    B --> E[Sync Module]
    B --> F[Contest Module]
    C --> H[(PostgreSQL)]
    D --> H
    E --> H
    F --> H
    D -. optional .-> I[(Redis Cache)]
    E --> G[Platform Adapter Layer]
    F --> G
    G --> K[Codeforces]
    G --> L[AtCoder via AtCoder Problems]
    G --> M[Codewars]
    G --> N[Manual Import]
    G -. approval required .-> O[LeetCode / CodeChef / others]
```

### 🔌 Platform Adapter Architecture

Every platform sits behind a common adapter interface so the Sync module never depends on platform-specific details. Adding or disabling a platform does not touch analytics code.

```text
Sync Module
   |
PlatformAdapter (interface)
   |-- capabilities()                      -> which data this adapter can provide
   |-- verifyOwnership(handle, userId)
   |-- fetchProfile(handle)
   |-- fetchSubmissions(handle, since)
   |-- fetchRatingHistory(handle)
   |-- fetchContests(handle)
   |
   |-- CodeforcesAdapter      (official API)
   |-- AtCoderAdapter         (third-party provider)
   |-- CodewarsAdapter        (official, minimal API)
   |-- ManualImportAdapter    (user-provided files)
   `-- (future adapters, only after approval)
```

Adapter rules:

- Normalize external data into CodeONE's internal models before storage.
- Declare capabilities, so the UI can show `partial data` honestly.
- Isolate rate limiting, retries and error mapping per adapter.
- Return explicit states: `connected`, `partial data`, `rate limited`, `source unavailable`, `reauthorization required`, `not approved`.
- Never read or store external platform passwords or session cookies.

### 🧱 Backend Layering

```mermaid
flowchart TB
    API[Express App]
    API --> MW[Middleware: auth, validation, rate limit, logging]
    MW --> Routes[Routes]
    Routes --> Controllers[Controllers]
    Controllers --> Services[Services / business logic]
    Services --> Prisma[Prisma data access]
    Services --> Adapters[Platform adapters]
    Services -. optional .-> Cache[Redis]
```

### 📐 Request Flow Example

```text
1. Client calls POST /api/v1/sync/platform-accounts/:id
2. Express authenticates the access token (middleware)
3. Rate limiting checks the quota
4. Validation middleware checks path/body
5. Controller confirms the account belongs to the caller (IDOR check)
6. Sync service creates a sync_logs row (status: running) and responds 202 Accepted
7. Adapter fetches data from the external source within its rate limits
8. Normalized data is upserted into submissions / rating_history / problems
9. Analytics inputs are refreshed; cache (if enabled) is invalidated
10. sync_logs is updated (success / partial / failed); the request logger records request metrics
11. Client polls GET /api/v1/sync/logs or the account's last_synced timestamp
```

---

## 🔌 7. Platform Integration Strategy

**Research snapshot:** 6 November 2026. This section distinguishes APIs operated by a platform from unofficial endpoints and independent third-party services. **The availability of an endpoint is not permission to use it.** Terms, licensing, commercial-use rights, rate limits and privacy requirements must be reviewed before any integration is approved.

### 🏷️ Integration Categories

| Category | Meaning | Default priority |
|---|---|---|
| 🟢 **Official API** | Documented access provided by the platform/operator | Highest, subject to scope and terms |
| 🔵 **Third-party API** | Independent provider collects or republishes platform data | Conditional; dependency and licensing review |
| 🟡 **Unofficial API** | Undocumented endpoint, community wrapper or scraper; stability and permission risk | Low; explicit risk/permission review |
| 📥 **Manual Import** | User-provided data (e.g. exported files) | Safe fallback; parsing must be validated |
| ⚪ **Research Required** (original label: UNVERIFIED / NOT FOUND) | Supported access not established; no supported user-analytics API was verified | Do not assume an API exists |

All entries below are **researched, not implemented**, unless a future repository audit proves otherwise.

### 🗺️ Integration Matrix

| Platform | Category | Potential data | Key caveats | Priority |
|---|---|---|---|---|
| **Codeforces** | 🟢 Official | Profile, submissions (`user.status`), rating history, contests, problem catalogue | [API methods](https://codeforces.com/apiHelp/methods). Public methods work anonymously; private data needs key/signature. Documented limit: one request per two seconds. Source code access restricted | **P1 — first integration** |
| **Codewars** | 🟢 Official | Profile, honor, ranks, completed challenges | [API v1](https://dev.codewars.com/). No auth for documented endpoints, but the docs call it minimal/inconsistent and not actively developed; v2 has no ETA | P2 |
| **Aizu Online Judge** | 🟢 Official | User records, status logs, problems | [AOJ API](https://judge.u-aizu.ac.jp/onlinejudge/api.jsp). XML; "under construction"; asks service developers to make contact first | P2 |
| **DMOJ** | 🟢 Official (per instance) | Users, problems, contests, submissions (`/api/v2/...`) | [Routes in source](https://github.com/DMOJ/online-judge/blob/master/dmoj/urls.py). Each installation is independent; no single global API | P2 |
| **AtCoder** | 🔵 Third-party (AtCoder Problems) | Contests, problems, user submissions, derived stats | [API docs](https://github.com/kenkoooo/AtCoderProblems/blob/main/doc/api.md). Unofficial, wait >1 s between requests, may be deprecated; submissions endpoint returns up to 500 after a timestamp | P2 |
| **DOMjudge / ICPC** | 🟢 Official (per contest) | Contest teams, problems, submissions, scoreboard | [DOMjudge API](https://www.domjudge.org/docs/manual/9.0/develop.html#api), [ICPC Contest API](https://ccs-specs.icpc.io/2026-01/contest_api). Credentials and a known installation required | P3 |
| **HackerRank** | 🟢 Official (enterprise) | Tests, candidates, reports, interviews | [API overview](https://support.hackerrank.com/articles/2067417637-api-overview). Enterprise-only; not a public practice-history API | P3 |
| **HackerEarth** | 🟢 Official (limited scope) | Code evaluation | [API info](https://help.hackerearth.com/hc/en-us/articles/360002661854-how-do-i-use-hackerearth-s-api-). No general profile/history API established | P3 |
| **CodeSignal** | 🟢 Official (organization) | Org-scoped GraphQL data, webhooks | [API overview](https://support.codesignal.com/hc/en-us/articles/18050947755031-CodeSignal-APIs). Needs org setup and permissions | P3 |
| **Topcoder** | 🟢 Official (scope unclear) | Challenge/submission workflow data | [Developer site](https://www.topcoder.com/), [submissions API](https://github.com/topcoder-archive/submissions-api). No stable public bulk-history access established | P3 |
| **NowCoder** | 🟢 Official (enterprise) | Test/paper management, candidates, reports | [API docs](https://docs.nowcoder.com/). Enterprise OAuth/API-key model | P3 |
| **LeetCode** | 🟡 Unofficial / 🔵 Third-party | Public profile stats, recent accepted submissions, calendar, contests | Internal GraphQL at `leetcode.com/graphql` is undocumented. [Terms](https://leetcode.com/terms/) prohibit crawling and scraping. Third-party example: [API.SH](https://api.sh/leetcode-api) (paid, not endorsed by LeetCode). **HIGH RISK — NOT APPROVED** without written authorization. Never collect session cookies | P4 |
| **CodeChef** | 🟡 Unofficial | Community tools may expose profile/rating/contest data | [Terms](https://www.codechef.com/terms) prohibit spidering, crawling and scraping. **Do not use without written permission** | P4 |
| **Luogu** | 🟡 Unofficial | Community-documented profile/problem/record data | [Community notes](https://github.com/0f-0b/luogu-api-docs); not an official contract. High risk until permission confirmed | P4 |
| **HackerRank public-profile scrapers** | 🟡 Unofficial | Limited public profile/badge data | Not operated by HackerRank; do not confuse with its enterprise API | P4 |
| **SPOJ, Kattis, CSES** | ⚪ Research Required | — | No supported public analytics API verified. Do not infer one from the website | Unverified |
| **Manual import (any platform)** | 📥 Manual Import | Whatever the user-provided file contains | Applies only where the platform provides an official export or the user supplies their own data. Whether LeetCode/HackerRank provide suitable official exports is **Research Required**. Validate format, size and ownership | Fallback |

### 🏆 Contest Calendar Sources

| Source | Category | Notes |
|---|---|---|
| **CLIST.by API** (`clist.by/api/v4/`) | 🔵 Third-party aggregator (documented API of the aggregator) | Upcoming contests across 50+ platforms (as advertised by the provider) with filters such as `upcoming=true`, `order_by=start`. It is not operated by the platforms themselves. Review API terms, key requirements, rate limits and attribution before approval |
| **DOMjudge / ICPC Contest API** | 🟢 Official per contest | Only for known contest installations |
| **AtCoder Problems datasets** | 🔵 Third-party | AtCoder contest/problem metadata; community-maintained |

**Proposed decision (pending terms review):** use CLIST.by as the primary contest ingestion source via a scheduled job (for example every 6 hours) writing into the `contests` table, instead of scraping individual contest pages.

### 🔎 Detailed Platform Research (Original Notes)

<details>
<summary><b>A. Platforms with documented official APIs</b></summary>

| Platform | Official API / documentation | Data relevant to CodeONE | Access, limitations and suitability |
|---|---|---|---|
| **Codeforces** | [API methods](https://codeforces.com/apiHelp/methods) | `user.info`, `user.status`, `user.rating`, `contest.list`, `contest.ratingChanges`, `contest.standings`, `problemset.problems` | Strongest fit. Public methods can be called anonymously; private data requires an API key/signature. Documented maximum of one request every two seconds. Public submission history via `user.status`; source code access is separately restricted. |
| **Codewars** | [API v1](https://dev.codewars.com/) | Public profile, honor, ranks, skills, completed and authored challenges, challenge metadata | Useful for profile and completed-kata history. No authentication for documented v1 endpoints. The API's own docs call it minimal/inconsistent and say it was never actively developed; v2 has no published ETA. Official but maintenance-risky. |
| **Aizu Online Judge (AOJ)** | [AOJ API](https://judge.u-aizu.ac.jp/onlinejudge/api.jsp) | User details, solved records, status logs, problems, categories, contest data | XML web-service endpoints. Docs say the API is under construction and may change without notice, and ask developers planning services to contact AOJ. Confirm current base URLs and permission first. |
| **DMOJ** | [API routes in the official codebase](https://github.com/DMOJ/online-judge/blob/master/dmoj/urls.py) | Instance-level users, problems, contests, submissions (`/api/v2/...`) | Official functionality exists in the software, but each installation is independently hosted; availability, auth, visibility and limits depend on the instance. Not one global DMOJ API. |
| **DOMjudge** | [REST API](https://www.domjudge.org/docs/manual/9.0/develop.html#api), [ICPC Contest API](https://ccs-specs.icpc.io/2026-01/contest_api) | Contest metadata, teams, problems, submissions, judging results, scoreboard | Official contest-system API, normally hosted per contest. Many operations need credentials; some endpoints expose sensitive contest/submission data. Best for university/ICPC events, not global profiles. |
| **HackerRank** | [API overview](https://support.hackerrank.com/articles/2067417637-api-overview) | Enterprise tests, candidates, reports, interviews, users, teams, questions | Designed for HackerRank for Work; requires enterprise access/token. Does not establish a public API for a student's general practice history. Do not label it full profile integration. |
| **HackerEarth** | [API information](https://help.hackerearth.com/hc/en-us/articles/360002661854-how-do-i-use-hackerearth-s-api-) | Code evaluation/compiler execution | API V4 documented for code evaluation. No general public API for a user's practice profile or submission history established. Useful only for authorized code-evaluation workflows. |
| **CodeSignal** | [API overview](https://support.codesignal.com/hc/en-us/articles/18050947755031-CodeSignal-APIs), [developer portal](https://developer.codesignal.com/) | Organization-scoped GraphQL data; webhooks | Requires organization setup, API-key permissions and/or support enablement. Not an open API for individuals' public profiles. Conditional fit for an authorized institutional integration. |
| **Topcoder** | [Topcoder](https://www.topcoder.com/), [submissions API](https://github.com/topcoder-archive/submissions-api) | Challenge and submission workflow data, depending on API family/permissions | Public references do not establish a stable, unrestricted endpoint for arbitrary users' histories. Confirm current docs, credentials, scopes and maintenance before listing as a connector. |
| **NowCoder** | [API docs](https://docs.nowcoder.com/) | Enterprise test/paper management, candidates, status, reports | OAuth 2.0/API-key access tied to enterprise accounts; primarily recruitment/assessment, not a public practice-profile API. |

</details>

<details>
<summary><b>B. Unofficial APIs and community endpoints</b></summary>

| Platform | Unofficial API / documentation | Potential data | Reliability and policy assessment |
|---|---|---|---|
| **LeetCode** | Internal GraphQL endpoint `https://leetcode.com/graphql`; wrapper example: [LeetCode Query](https://github.com/JacobLinCool/LeetCode-Query) | Public profile/solved counts, recent accepted submissions, activity calendar, contest ranking may be retrievable | No documented public official API. Endpoint is undocumented and can change. [Terms](https://leetcode.com/terms/) expressly prohibit crawling, scraping and spidering. **Do not scrape or automate without written authorization.** Never collect or proxy session cookies. HIGH RISK / NOT APPROVED. |
| **CodeChef** | Community clients and scrapers exist; no supported public official profile API verified | Community tools may expose profile, rating, contest or solved data; completeness varies | [Terms](https://www.codechef.com/terms) prohibit spidering, crawling and scraping. **Do not use without written permission.** Seek an official partnership/API or leave the connector unavailable. |
| **Luogu** | [Community API notes](https://github.com/0f-0b/luogu-api-docs) | Community-documented profile, problem, record, contest data | Not an official contract. Stability, access controls, limits and permitted use not established. HIGH RISK until Luogu confirms permission. |
| **HackerRank public-profile scrapers** | Example: [HackerRank Stats API project](https://github.com/tashifkhan/hackerrank-stats-api) | Limited public profile/badge data | Not operated by HackerRank; do not confuse with its enterprise API. Completeness and maintenance unverified; avoid production dependency without permission and tests. |

</details>

<details>
<summary><b>C. Third-party data providers</b></summary>

| Provider | Classification | Coverage / potential use | Dependency and verification notes |
|---|---|---|---|
| **AtCoder Problems** | 🔵 Third-party community service | AtCoder contests, problems, user submissions, accepted counts, rankings, language stats, derived streaks | [API docs](https://github.com/kenkoooo/AtCoderProblems/blob/main/doc/api.md) say it is unofficial, ask clients to wait more than one second between requests, and warn APIs may be deprecated. Submissions endpoint returns up to 500 after a timestamp. Strong fit, but external-service and policy dependency. |
| **API.SH — LeetCode API** | 🔵 Third-party commercial provider | REST endpoints for public LeetCode profiles, recent accepted submissions, contests, problem metadata | [Provider docs](https://api.sh/leetcode-api) describe paid per-call usage and public-data-only access. Not a LeetCode API and not endorsed by LeetCode. Verify provider terms, provenance, retention, SLA, pricing and permission. A vendor's compliance claim does not replace platform authorization. |
| **Other community wrappers / aggregators** | 🔵 Third-party | May normalize data from several platforms | No additional multi-platform provider is approved by this research. Evaluate each separately; do not add one just because it advertises broad coverage. |

</details>

<details>
<summary><b>D. Platforms where a supported public profile API was not verified</b></summary>

| Platform | Research result | Recommended documentation status |
|---|---|---|
| **SPOJ** | No supported public API for general user profile/submission analytics verified. The website shows submission history in the signed-in profile, which does not establish API permission. | `API_UNVERIFIED`; do not scrape without written permission |
| **Kattis** | No general public API for arbitrary users' practice history/rating analytics verified. Contest-system integrations may exist in specific institutional contexts. | `API_UNVERIFIED`; investigate only with a specific Kattis instance/operator |
| **CSES Problem Set** | No supported public user analytics/submission-history API verified | `API_UNVERIFIED`; do not infer an API from the website |

</details>

<details>
<summary><b>E. Platform integration fit for CodeONE</b></summary>

| Priority | Platform | Why |
|---|---|---|
| **P1 — best documented profile-data fit** | Codeforces | Official public API exposes profile, submissions, ratings, contests and problem metadata |
| **P2 — candidate with explicit caveats** | Codewars, Aizu Online Judge, DMOJ instances, AtCoder via AtCoder Problems | Useful data exists, but maintenance, instance scope or third-party dependency must be handled |
| **P3 — permission / enterprise dependent** | HackerRank, HackerEarth, CodeSignal, Topcoder, NowCoder, DOMjudge | Official APIs exist, but purpose/access model does not automatically match public student analytics |
| **P4 — do not rely on without written approval** | LeetCode, CodeChef, Luogu, HackerRank scrapers | Undocumented endpoints, scraping restrictions or uncertain permission create material risk |
| **Unverified** | SPOJ, Kattis, CSES | No supported public user-analytics API verified |

</details>

### 🥇 Initial Integration Order

1. **Codeforces** — first connector and the reference implementation of the adapter interface
2. **AtCoder Problems, Codewars** — after the adapter interface is proven, each with an isolated adapter and fallback state
3. **Manual import** — safe path for platforms without approved access
4. **LeetCode, CodeChef** — **not built as essential dependencies** without approved access

### 📜 Permanent API Integration Policy

1. Prefer platform-operated, documented official APIs.
2. Confirm exact data fields and whether the API is open to ordinary users, enterprise customers, contest admins or only the platform.
3. Review current Terms, API terms, privacy policy, licensing, rate limits, attribution and commercial-use conditions before approval.
4. Do not scrape, crawl, spider, reverse engineer, bypass authentication, defeat CAPTCHAs, evade rate limits, or collect another user's credentials.
5. Do not request or store external platform passwords or session cookies. Prefer public usernames, user-authorized OAuth, or platform-approved verification.
6. Treat unofficial endpoints as unstable: require documented risk acceptance, a permission assessment, an isolated adapter, monitoring and a fallback state.
7. Treat third-party providers as vendors: review provenance, privacy, retention, pricing, limits, uptime, dependency concentration and exit strategy.
8. Do not call a connector "full integration" until all advertised fields are implemented, tested and validated against the permitted access model.
9. Show per-platform sync timestamps and clear states (`connected`, `partial data`, `rate limited`, `source unavailable`, `reauthorization required`).
10. Keep an **API Integration Registry**: platform, provider, classification, official docs, permitted fields, auth model, rate limits, ToS review status, limitations, risk rating, fallback, owner, last verification date.
11. Re-check documentation and terms before each release and after change notices.
12. If permission is unclear, classify the connector as `NOT APPROVED`; public accessibility is not permission.

### ⚖️ Research & Legal-Status Disclaimer

This is technical due diligence, not legal advice. The research verified the existence and documented purpose of the sources above; it did **not** obtain written permission from operators, test endpoints under production conditions, or certify lawful use in any jurisdiction. Re-check official policies before implementation or public deployment.

**Verification date:** 6 November 2026. **Level:** documentation/source review, not live integration testing.

### 🔗 API Research Sources & Verification Record

| Platform / provider | Primary reference | What was verified |
|---|---|---|
| Codeforces | [API help](https://codeforces.com/apiHelp/) | Public JSON API, methods, authorization model, request limit |
| LeetCode | [Terms of Service](https://leetcode.com/terms/) | Restrictions on crawling/scraping; internal GraphQL not documented as public |
| AtCoder Problems | [API docs](https://github.com/kenkoooo/AtCoderProblems/blob/main/doc/api.md) | Unofficial status, endpoints, pacing, deprecation warning |
| CodeChef | [Terms of Service](https://www.codechef.com/terms) | Prohibited-use wording on scraping |
| HackerRank | [API overview](https://support.hackerrank.com/articles/2067417637-api-overview) | Enterprise use cases, token model |
| Codewars | [API v1](https://dev.codewars.com/) | Profile/completed challenges; maintenance caveat |
| HackerEarth | [API info](https://help.hackerearth.com/hc/en-us/articles/360002661854-how-do-i-use-hackerearth-s-api-) | Code-evaluation API V4 |
| CodeSignal | [API overview](https://support.codesignal.com/hc/en-us/articles/18050947755031-CodeSignal-APIs) | Org GraphQL API and webhooks |
| Aizu Online Judge | [API docs](https://judge.u-aizu.ac.jp/onlinejudge/api.jsp) | XML APIs; under-construction warning |
| DMOJ | [Routes in source](https://github.com/DMOJ/online-judge/blob/master/dmoj/urls.py) | API v2 routes; per-instance deployment |
| DOMjudge / ICPC | [DOMjudge API](https://www.domjudge.org/docs/manual/9.0/develop.html#api), [ICPC CCS API](https://ccs-specs.icpc.io/2026-01/contest_api) | Contest-scoped API model |
| NowCoder | [Open Platform docs](https://docs.nowcoder.com/) | Enterprise OAuth/API-key model |
| Topcoder | [Submissions API project](https://github.com/topcoder-archive/submissions-api) | Reference only; public profile access not established |
| Luogu | [Community notes](https://github.com/0f-0b/luogu-api-docs) | Community documentation only |
| API.SH | [LeetCode API page](https://api.sh/leetcode-api) | Third-party advertised API and pricing model |
| SPOJ | [User tutorial](https://www.spoj.com/tutorials/USERS/) | History exists in the web UI; no supported public API verified |

**Verification limitations:** no authenticated API calls, load tests, legal review, or written-permission requests were performed. A documentation link is not proof of uptime, SLA, commercial-use permission or long-term support.

---

## 🗄 8. Database Schema (Proposed)

> **Important:** This is a **proposed schema** for design and review. It is not a verified migration or a deployed database, and no actual database modifications are implied by this document.

### 📊 Table Overview

| Table | Purpose | Origin |
|---|---|---|
| `users` | Accounts and roles | Original design |
| `platform_accounts` | Linked platform accounts and verification state | Original, extended |
| `problems`, `tags`, `problem_tags` | Problem catalogue | Original design |
| `user_problems` | **Current problem state** per user (status, notes, attempts) | Original, purpose clarified |
| `submissions` | Individual submission history | **Proposed addition** |
| `rating_history` | Historical rating records | **Proposed addition** |
| `contests` | Contest calendar | Original ER, DDL added |
| `contest_participations` | User contest performance (replaces `user_contests`) | **Proposed addition** |
| `oauth_accounts` | OAuth identity management | **Proposed addition** |
| `user_sessions` | Session lifecycle | **Proposed addition** |
| `refresh_tokens` | Refresh-token rotation and reuse detection | Original, linked to sessions |
| `sync_logs` | Synchronization tracking | **Proposed addition** |
| `notifications` | User notifications | **Proposed addition** |
| `goals` | Daily/weekly/monthly targets | Original ER, DDL added |
| `audit_logs` | Security events (append-only) | Original design |

**Design note:** `user_problems` answers "what is this user's current state for this problem?", while `submissions` answers "what exactly happened and when?". Streaks and activity analytics should be derived from `submissions` (accurate timestamps), not from `user_problems`.

### 🔷 Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ PLATFORM_ACCOUNTS : has
    USERS ||--o{ OAUTH_ACCOUNTS : authenticates_with
    USERS ||--o{ USER_SESSIONS : has
    USER_SESSIONS ||--o{ REFRESH_TOKENS : issues
    USERS ||--o{ USER_PROBLEMS : tracks
    USERS ||--o{ GOALS : sets
    USERS ||--o{ NOTIFICATIONS : receives
    PLATFORM_ACCOUNTS ||--o{ SUBMISSIONS : produces
    PLATFORM_ACCOUNTS ||--o{ RATING_HISTORY : records
    PLATFORM_ACCOUNTS ||--o{ CONTEST_PARTICIPATIONS : joins
    PLATFORM_ACCOUNTS ||--o{ SYNC_LOGS : synced_by
    CONTESTS ||--o{ CONTEST_PARTICIPATIONS : includes
    PROBLEMS ||--o{ USER_PROBLEMS : state_of
    PROBLEMS ||--o{ SUBMISSIONS : target_of
    PROBLEMS }o--o{ TAGS : tagged_with
    USERS ||--o{ AUDIT_LOGS : acts_in
```

<details>
<summary><b>ER diagram with attributes for core entities (original design, updated)</b></summary>

```mermaid
erDiagram
    USERS ||--o{ PLATFORM_ACCOUNTS : has
    USERS ||--o{ USER_PROBLEMS : tracks
    USERS ||--o{ GOALS : sets
    USERS ||--o{ NOTIFICATIONS : receives
    PROBLEMS ||--o{ USER_PROBLEMS : state_of
    PROBLEMS }o--o{ TAGS : tagged_with
    CONTESTS ||--o{ CONTEST_PARTICIPATIONS : includes
    PLATFORM_ACCOUNTS ||--o{ CONTEST_PARTICIPATIONS : joins

    USERS {
        uuid id PK
        string name
        string email UK
        string password_hash
        string avatar_url
        string role
        boolean email_verified
        timestamp created_at
        timestamp last_login
    }
    PLATFORM_ACCOUNTS {
        uuid id PK
        uuid user_id FK
        string platform_name
        string username
        string verification_status
        integer rating
        string rank
        timestamp last_synced
        boolean is_active
    }
    PROBLEMS {
        uuid id PK
        string platform
        string problem_id
        string title
        string difficulty
        integer difficulty_rating
        string url
        numeric acceptance_rate
        timestamp added_at
    }
    USER_PROBLEMS {
        uuid id PK
        uuid user_id FK
        uuid problem_id FK
        string status
        integer attempts
        timestamp solved_at
        text notes
    }
    TAGS {
        uuid id PK
        string name UK
        string category
    }
    GOALS {
        uuid id PK
        uuid user_id FK
        string type
        integer target
        integer current
        date start_date
        date end_date
    }
    CONTESTS {
        uuid id PK
        string platform
        string name
        timestamp start_time
        integer duration_seconds
        string url
    }
    CONTEST_PARTICIPATIONS {
        uuid id PK
        uuid platform_account_id FK
        uuid contest_id FK
        integer rank
        integer rating_change
    }
```

</details>

### 👤 Core Tables (Original Design, Refined)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,   -- UNIQUE already creates an index
    password_hash TEXT,                    -- NULL for OAuth-only accounts
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'user'
        CHECK (role IN ('user', 'moderator', 'admin', 'auditor')),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    last_login TIMESTAMPTZ,
    settings JSONB DEFAULT '{}'            -- e.g. timezone, privacy, notification prefs
);

CREATE TABLE platform_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform_name VARCHAR(50) NOT NULL,
    username VARCHAR(100) NOT NULL,
    verification_status VARCHAR(20) NOT NULL DEFAULT 'unverified'
        CHECK (verification_status IN ('unverified', 'pending', 'verified', 'failed')),
    verified_at TIMESTAMPTZ,
    rating INTEGER,                        -- latest snapshot; history lives in rating_history
    rank VARCHAR(50),
    last_synced TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    sync_frequency INTEGER DEFAULT 3600,   -- seconds; must respect provider limits
    UNIQUE (user_id, platform_name)
);
CREATE INDEX idx_platform_accounts_user ON platform_accounts(user_id);

CREATE TABLE problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(50) NOT NULL,
    problem_id VARCHAR(100) NOT NULL,      -- platform's own identifier
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20),                -- normalized label; nullable if platform has none
    difficulty_rating INTEGER,             -- e.g. Codeforces numeric rating
    url TEXT NOT NULL,
    acceptance_rate NUMERIC(5,2),
    added_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (platform, problem_id)
);
CREATE INDEX idx_problems_difficulty ON problems(difficulty);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE problem_tags (
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (problem_id, tag_id)
);

-- Current problem state only (history is in submissions)
CREATE TABLE user_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL
        CHECK (status IN ('solved', 'in_progress', 'review_later', 'todo')),
    is_bookmarked BOOLEAN DEFAULT FALSE,
    attempts INTEGER DEFAULT 1,
    solved_at TIMESTAMPTZ,
    notes TEXT,
    UNIQUE (user_id, problem_id)
);
CREATE INDEX idx_user_problems_user_status ON user_problems(user_id, status);
CREATE INDEX idx_user_problems_solved_at ON user_problems(solved_at);

CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('daily', 'weekly', 'monthly')),
    target INTEGER NOT NULL CHECK (target > 0),
    current INTEGER NOT NULL DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE contests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(50) NOT NULL,
    external_id VARCHAR(100),
    name VARCHAR(255) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    duration_seconds INTEGER NOT NULL,
    url TEXT,
    source VARCHAR(50),                    -- e.g. 'clist', 'codeforces'
    UNIQUE (platform, external_id)
);
CREATE INDEX idx_contests_start ON contests(start_time);
```

### ➕ Proposed Additions

```sql
-- Individual submission history (source of truth for streaks and activity)
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform_account_id UUID NOT NULL REFERENCES platform_accounts(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES problems(id) ON DELETE SET NULL,
    external_id VARCHAR(100) NOT NULL,     -- platform's submission id
    verdict VARCHAR(30) NOT NULL,
    language VARCHAR(50),
    submitted_at TIMESTAMPTZ NOT NULL,
    UNIQUE (platform_account_id, external_id)
);
CREATE INDEX idx_submissions_account_time ON submissions(platform_account_id, submitted_at DESC);

-- Historical rating records
CREATE TABLE rating_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform_account_id UUID NOT NULL REFERENCES platform_accounts(id) ON DELETE CASCADE,
    contest_id UUID REFERENCES contests(id) ON DELETE SET NULL,
    old_rating INTEGER,
    new_rating INTEGER NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX idx_rating_history_account_time ON rating_history(platform_account_id, recorded_at);

-- User contest performance
CREATE TABLE contest_participations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform_account_id UUID NOT NULL REFERENCES platform_accounts(id) ON DELETE CASCADE,
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    rank INTEGER,
    solved_count INTEGER,
    rating_change INTEGER,
    UNIQUE (platform_account_id, contest_id)
);

-- OAuth identity management
CREATE TABLE oauth_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(30) NOT NULL,         -- 'google', 'github'
    provider_user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (provider, provider_user_id)
);

-- Session lifecycle
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    family_id UUID NOT NULL,               -- token family for reuse detection
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    last_seen_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ
);
CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);

-- Refresh-token rotation (store hashes only, never raw tokens)
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    is_revoked BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    replaced_by UUID REFERENCES refresh_tokens(id)
);

-- Synchronization tracking
CREATE TABLE sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform_account_id UUID NOT NULL REFERENCES platform_accounts(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL
        CHECK (status IN ('running', 'success', 'partial', 'failed', 'rate_limited')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    finished_at TIMESTAMPTZ,
    records_fetched INTEGER DEFAULT 0,
    error_message TEXT
);
CREATE INDEX idx_sync_logs_account_time ON sync_logs(platform_account_id, started_at DESC);

-- User notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,             -- 'contest_reminder', 'streak_alert', ...
    title VARCHAR(150) NOT NULL,
    body TEXT,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, read_at);

-- Security events (append-only; see Section 10)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failure', 'denied')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

> SQL is illustrative. The real source of truth should be `prisma/schema.prisma` and generated migrations.

---

## 📡 9. API Documentation

> **Documentation examples only.** The endpoints and payloads below describe a proposed API contract. They have not been confirmed against a running CodeONE server. All endpoints are 📋 Planned / ❓ Not Verified.

### 📏 Conventions

| Topic | Convention |
|---|---|
| Base URL | Development: `http://localhost:5000/api/v1`. Production: not configured / not verified |
| Naming | Plural, lowercase, kebab-case resources (`/platform-accounts`, `/user-problems`); actions only for non-CRUD operations (`/sync/...`, `/auth/...`) |
| Authentication | `Authorization: Bearer <access_token>` unless the table says *Public* |
| Success envelope | `{ "success": true, "data": ..., "meta": ... }` |
| Pagination | `?page=1&limit=20` (default 20, max 100); response includes `meta.pagination` |
| Rate limiting | Per IP and per user. Auth endpoints: 5 requests/minute. General: 100 requests per 15 minutes (configurable). Exceeding returns `429` with `Retry-After` |
| Time format | ISO 8601 UTC |
| Long operations | Return `202 Accepted` and expose status via `/sync/logs` |

### 🚨 Standard Error Format

All errors use this structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      { "field": "email", "issue": "Invalid email format" }
    ]
  }
}
```

| HTTP | Code | Meaning |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Invalid request data |
| 401 | `AUTHENTICATION_ERROR` | Missing, invalid or expired token |
| 403 | `AUTHORIZATION_ERROR` | Authenticated but not permitted |
| 404 | `NOT_FOUND` | Resource not found (also used to avoid leaking other users' records) |
| 409 | `CONFLICT` | Duplicate resource (e.g. email already registered) |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 502/503 | `SOURCE_UNAVAILABLE` | External platform failed or rate limited the sync |
| 500 | `INTERNAL_ERROR` | Server error |

### 🧭 Endpoint Overview

**Auth** (`/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Create account |
| POST | `/auth/login` | Public | Log in; returns access token, sets refresh cookie |
| POST | `/auth/refresh` | Refresh cookie | Rotate refresh token, issue new access token |
| POST | `/auth/logout` | Yes | Revoke current session |
| GET | `/auth/oauth/:provider` | Public | Start OAuth flow (`google`, `github`) |
| GET | `/auth/oauth/:provider/callback` | Public | OAuth callback |

**Users, accounts and problems**

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/users/me` | Yes | Current user and linked platform accounts |
| PATCH | `/users/me` | Yes | Update profile and settings |
| GET | `/platform-accounts` | Yes | List linked accounts |
| POST | `/platform-accounts` | Yes | Link an account |
| POST | `/platform-accounts/:id/verify` | Yes | Start/complete ownership verification |
| DELETE | `/platform-accounts/:id` | Yes | Unlink account |
| GET | `/problems` | Yes | Search the problem catalogue |
| GET | `/user-problems` | Yes | List the caller's problem states |
| PATCH | `/user-problems/:problemId` | Yes | Update status / notes / bookmark |
| GET | `/submissions` | Yes | Paginated submission history |

**Analytics, contests, goals, notifications**

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/analytics/dashboard` | Yes | Dashboard summary |
| GET | `/analytics/streaks` | Yes | Streak and heatmap data |
| GET | `/analytics/platforms/:platform` | Yes | Per-platform analytics |
| GET | `/analytics/ratings` | Yes | Rating trends |
| GET | `/analytics/topics` | Yes | Topic mastery |
| GET | `/contests` | Yes | Contests (`?upcoming=true&platform=`) |
| GET | `/contest-participations` | Yes | The caller's contest results |
| GET / POST | `/goals` | Yes | List / create goals |
| PATCH / DELETE | `/goals/:id` | Yes | Update / delete a goal |
| GET | `/notifications` | Yes | List notifications |
| PATCH | `/notifications/:id/read` | Yes | Mark as read |

**Synchronization (separate from data endpoints)**

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/sync/platform-accounts` | Yes | Sync all of the caller's linked accounts (202) |
| POST | `/sync/platform-accounts/:id` | Yes | Sync one account (202) |
| GET | `/sync/logs` | Yes | Sync history and status |

**Administration (role-restricted)**

| Method | Endpoint | Role | Description |
|---|---|---|---|
| GET | `/admin/users` | Admin | List users (masked PII) |
| PATCH | `/admin/users/:id/role` | Admin | Change role (audited) |
| GET | `/admin/audit-logs` | Auditor, Admin | Read audit events (access itself audited) |

### 💡 Examples (Illustrative)

#### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{ "name": "John Doe", "email": "john@example.com", "password": "SecurePass123!" }
```

**201 Created** (the refresh token is set as an `HttpOnly` cookie, never in the JSON body):

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900,
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john@example.com",
      "avatarUrl": null,
      "createdAt": "2026-11-06T10:30:00Z"
    }
  }
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{ "email": "john@example.com", "password": "SecurePass123!" }
```

**200 OK** returns the same `data` shape as registration.

#### Get Current User

```http
GET /api/v1/users/me
Authorization: Bearer {accessToken}
```

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "platformAccounts": [
      { "id": "uuid", "platform": "codeforces", "username": "john_doe",
        "rating": 1850, "rank": "Expert", "verificationStatus": "verified",
        "lastSynced": "2026-11-06T09:00:00Z" }
    ]
  }
}
```

#### Link a Platform Account

```http
POST /api/v1/platform-accounts
Authorization: Bearer {accessToken}
Content-Type: application/json

{ "platform": "codeforces", "username": "john_doe" }
```

Returns `201 Created` with `verificationStatus: "unverified"`. Ownership must be verified before data is attributed to the user (see Section 10).

#### Dashboard Summary

```http
GET /api/v1/analytics/dashboard
Authorization: Bearer {accessToken}
```

```json
{
  "success": true,
  "data": {
    "totalSolved": 342,
    "currentStreak": 25,
    "longestStreak": 60,
    "lastSolvedAt": "2026-11-05T18:30:00Z",
    "difficultyBreakdown": { "easy": 120, "medium": 170, "hard": 52 },
    "platformBreakdown": { "codeforces": 250, "atcoder": 62, "codewars": 30 },
    "weeklyProgress": [
      { "date": "2026-10-30", "count": 5 },
      { "date": "2026-10-31", "count": 3 },
      { "date": "2026-11-01", "count": 7 }
    ],
    "sources": [
      { "platform": "codeforces", "state": "connected", "lastSynced": "2026-11-06T09:00:00Z" },
      { "platform": "atcoder", "state": "partial data", "lastSynced": "2026-11-05T21:00:00Z" }
    ]
  }
}
```

#### Streaks

```http
GET /api/v1/analytics/streaks?year=2026
Authorization: Bearer {accessToken}
```

```json
{
  "success": true,
  "data": {
    "currentStreak": 25,
    "longestStreak": 60,
    "totalDaysActive": 180,
    "heatmap": [
      { "date": "2026-01-01", "count": 3 },
      { "date": "2026-01-02", "count": 5 },
      { "date": "2026-01-03", "count": 0 }
    ]
  }
}
```

#### Submissions (Paginated)

```http
GET /api/v1/submissions?platform=codeforces&verdict=OK&page=1&limit=20
Authorization: Bearer {accessToken}
```

```json
{
  "success": true,
  "data": [
    { "id": "uuid", "platform": "codeforces", "problem": "1900A",
      "title": "Cover in Water", "verdict": "OK", "language": "C++17",
      "submittedAt": "2026-11-05T18:30:00Z" }
  ],
  "meta": { "pagination": { "page": 1, "limit": 20, "total": 134, "totalPages": 7 } }
}
```

#### Problems Query Parameters

`GET /api/v1/problems` supports: `platform`, `difficulty`, `tags` (comma-separated), `search`, `page`, `limit`. User-specific filters such as `status` belong on `GET /user-problems`.

#### Update Problem State

```http
PATCH /api/v1/user-problems/:problemId
Authorization: Bearer {accessToken}
Content-Type: application/json

{ "status": "solved", "notes": "Used dynamic programming approach", "isBookmarked": true }
```

#### Upcoming Contests

```http
GET /api/v1/contests?upcoming=true&platform=codeforces&limit=10
Authorization: Bearer {accessToken}
```

```json
{
  "success": true,
  "data": [
    { "id": "uuid", "platform": "codeforces", "name": "Codeforces Round (Div. 2)",
      "startTime": "2026-11-12T14:35:00Z", "durationSeconds": 7200,
      "url": "https://codeforces.com/contests",
      "registrationUrl": "https://codeforces.com/contests" }
  ]
}
```

#### Trigger a Sync

```http
POST /api/v1/sync/platform-accounts/123e4567-e89b-12d3-a456-426614174000
Authorization: Bearer {accessToken}
```

```json
{ "success": true,
  "data": { "syncLogId": "uuid", "status": "running" } }
```

### 💡 More Examples (Illustrative)

#### Platform-Specific Analytics

```http
GET /api/v1/analytics/platforms/codeforces
Authorization: Bearer {accessToken}
```

```json
{
  "success": true,
  "data": {
    "platform": "codeforces",
    "username": "john_doe",
    "totalSolved": 250,
    "rating": 1850,
    "rank": "Expert",
    "difficultyBreakdown": { "easy": 100, "medium": 110, "hard": 40 },
    "recentSubmissions": [
      { "problemTitle": "Cover in Water", "status": "accepted", "submittedAt": "2026-11-05T18:30:00Z" }
    ]
  }
}
```

#### Problem Catalogue (Paginated)

```http
GET /api/v1/problems?platform=codeforces&difficulty=easy&tags=dp,graph&search=two&page=1&limit=20
Authorization: Bearer {accessToken}
```

```json
{
  "success": true,
  "data": [
    { "id": "uuid", "platform": "codeforces", "title": "Example Problem", "difficulty": "easy",
      "url": "https://codeforces.com/problemset/problem/1/A", "tags": ["math", "implementation"] }
  ],
  "meta": { "pagination": { "page": 1, "limit": 20, "total": 342, "totalPages": 18 } }
}
```

#### User Problem State

```http
GET /api/v1/user-problems?status=solved&page=1&limit=20
Authorization: Bearer {accessToken}
```

Returns the caller's states (`status`, `solvedAt`, `notes`, `isBookmarked`) joined with problem details, using the same pagination envelope.

#### Update Profile

```http
PATCH /api/v1/users/me
Authorization: Bearer {accessToken}
Content-Type: application/json

{ "name": "John Smith", "avatarUrl": "https://example.com/avatar.jpg" }
```

#### Goals

```http
POST /api/v1/goals
Authorization: Bearer {accessToken}
Content-Type: application/json

{ "type": "daily", "target": 5, "startDate": "2026-11-06", "endDate": "2026-11-12" }
```

```http
GET /api/v1/goals?active=true
Authorization: Bearer {accessToken}
```

#### List Linked Platform Accounts

```http
GET /api/v1/platform-accounts
Authorization: Bearer {accessToken}
```

---

## 🔐 10. Authentication & Security

CodeONE is designed to protect user-specific analytics, private notes, goals, linked platform accounts and administrative actions. Security controls must be enforced by the backend; hiding frontend controls is not authorization.

> **Implementation status:** Everything in this section is a **proposed control** unless listed under *Verified controls*. Do not describe a control as production-ready until it is implemented, configured and covered by tests.

### 🔑 Authentication Methods

1. **Email/password** — Argon2id preferred; bcrypt acceptable with a current, benchmarked work factor
2. **Google OAuth 2.0**
3. **GitHub OAuth**

OAuth identities are stored in `oauth_accounts` and linked to a user only after the provider confirms a verified email, or the user is already authenticated and explicitly links the provider (prevents account takeover through unverified email matching).

### ⏱️ Token Lifecycle (Proposed)

- **Access token:** JWT, 15 minutes (900 seconds; `exp` = `iat` + 900). Held in memory; sent as a Bearer header; not stored in `localStorage`.
- **Refresh token:** 7 days, in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie (use `Lax` only if the OAuth redirect flow requires it). Only a **hash** is stored server-side (`refresh_tokens`).
- **Rotation:** every refresh invalidates the used token and issues a new one.
- **Reuse detection:** presenting a used or revoked refresh token revokes the whole session/token family.
- **Sessions:** `user_sessions` supports listing and revoking sessions, idle and absolute timeouts, and revocation on logout, password reset or suspicious activity. Idle and absolute timeouts should be configurable; a five-minute idle timeout may be offered as a strict option, but choose a usability-appropriate default.

```json
{
  "sub": "uuid-v4",
  "role": "user",
  "sid": "session-uuid",
  "iat": 1793000000,
  "exp": 1793000900
}
```

Keep the payload minimal; load the user's current role from the database when authorizing privileged actions.

### 🛡️ Security Controls — Proposed vs. Verified

| Control | State |
|---|---|
| Access-token lifecycle (15 min) | Proposed |
| Refresh-token rotation and reuse detection | Proposed |
| OAuth account linking rules | Proposed |
| Platform ownership verification | Proposed |
| Password hashing (Argon2id/bcrypt) | Proposed |
| RBAC (default deny) | Proposed |
| IDOR / object-level authorization | Proposed |
| Rate limiting (auth: 5/min) | Proposed |
| Account lockout after 5 failed login attempts (with safe unlock/backoff) | Proposed |
| Append-only audit logging | Proposed |
| Secrets management | Proposed |

**Verified controls:** none yet. Move a control to *Verified* only when code review or automated tests confirm it.

### ✔️ Platform Ownership Verification

Linking a public handle does not prove ownership. Before attributing data to a user or exposing it on a profile, CodeONE should verify ownership using a platform-permitted method, for example asking the user to place a one-time code in a field they control on their public profile, or using user-authorized OAuth where the platform provides it. Never request platform passwords or session cookies.

### 🛡️ Role-Based Access Control (RBAC)

Default-deny model with four roles:

| Role | Intended permissions |
|---|---|
| **User** | Manage own problems, notes, goals, linked accounts, privacy settings |
| **Moderator** | Handle approved community-moderation actions; no automatic access to private analytics or credentials |
| **Admin** | Manage users, roles and configuration through audited endpoints |
| **Auditor** | Read audit events; cannot modify user data or audit records |

- Authenticate, then load current role/permissions server-side; never trust client-supplied roles or IDs.
- Enforce authorization in middleware and again in services where appropriate.
- Return `401` for missing/invalid authentication and `403` for insufficient permission.
- Treat role changes as privileged, audited actions.

### 🔒 Object-Level Authorization & IDOR Protection

Every endpoint that reads or modifies a user-owned resource (user problems, notes, goals, platform accounts, sync logs, exports, analytics) must verify ownership.

- Scope queries by both resource ID and `user_id`.
- Do not rely on unguessable UUIDs or hidden links.
- Test replacing IDs in URLs, query strings and bodies with another user's IDs.
- Use consistent error responses that do not reveal whether another user's record exists.

### 👁️ Privacy & Data Minimization

- Private notes, goals, settings and personal analytics are visible only to their owner and explicitly authorized roles.
- Public/private profile setting; expose only fields approved for public display.
- Mask emails and personal data in admin views when full values are unnecessary.
- Never expose password hashes, tokens, OAuth secrets or internal security metadata in responses or logs.
- Store platform usernames, not platform passwords.
- Verify ownership before generating exports.

### 🧾 Audit Logging

Record successful and failed logins, access-denied events, role changes, account linking/unlinking, private-data access, exports and admin changes.

- Recommended event fields: `id`, `occurred_at`, `actor_user_id`, `actor_role`, `action`, `resource_type`, `resource_id`, `outcome`, `request_id`, `source_ip`.
- Do not log passwords, tokens or unnecessary personal data.
- The application role gets `INSERT` (and limited `SELECT`) on `audit_logs`, not `UPDATE`/`DELETE`.
- Consider hash chaining or external protected storage for tamper evidence; restrict and audit access to the logs.
- Database owners and infrastructure admins may still alter data; claim "immutable" only if the chosen controls and threat model support it.

### 🚦 API & Application Hardening

- Rate-limit login, registration, password-reset, refresh, sync and export endpoints.
- Validate bodies, queries and path parameters with schema validation (e.g. Joi).
- Use Prisma's parameterized queries; never concatenate untrusted input into SQL.
- Explicit CORS allowlist, security headers (`helmet`), request-size limits, safe error messages.
- CSRF protection where cookie-based auth requires it; HTTPS in production.
- Secrets in environment/secret-management systems; never commit real secrets.
- Re-authentication for high-impact actions; least-privilege database roles; tested backups.

### 🧪 Security Verification Checklist

Add automated tests that verify:

- [ ] A regular user cannot call admin/moderator endpoints.
- [ ] User A cannot read, edit or export User B's private resources by changing an ID.
- [ ] A user cannot promote their own role through a request body.
- [ ] Expired, revoked and reused refresh tokens are rejected.
- [ ] Rate limits apply to authentication and sensitive endpoints.
- [ ] Private fields and tokens never appear in API responses or logs.
- [ ] Audit events are written for privileged and sensitive actions.
- [ ] The application database role cannot update or delete audit records.
- [ ] Auditor access is read-only and audit-log access is itself recorded.

---

## 📈 11. Analytics Engine

> 📋 Planned. Definitions below are the intended behavior and should be finalized and tested during Phase 4.

| Metric | Definition (proposed) |
|---|---|
| **Global streak** | Consecutive calendar days with at least one qualifying activity (accepted submission by default) across all verified linked platforms. Days are computed in the user's configured timezone (default UTC). Derived from `submissions`. |
| **Daily activity** | Count of submissions/solves per day; powers the heatmap |
| **Difficulty progression** | Solved problems grouped by normalized difficulty (and numeric rating where available) over time |
| **Topic mastery** | Per-tag solve count and success rate, with a minimum sample size before a tag is rated |
| **Rating trends** | Per-platform series from `rating_history`; platforms are shown separately, never averaged into one fake rating |
| **Submission statistics** | Verdict distribution, languages, acceptance ratio |
| **Recommendation logic** | Rule-based: find weak tags (for example success rate below 50% with a minimum number of attempts, thresholds to be tuned), then suggest problems of progressive difficulty the user has not solved |

Optional product decision: a **grace period / recovery mode** that forgives one missed day. It must be clearly labelled so users know the streak is not a raw count.

### ⚠️ Data Limitations

- Platforms expose different fields; some provide no submission-level history.
- Manual imports may lack timestamps and cannot support streaks.
- Difficulty scales differ across platforms and are only approximately comparable.
- Sync lag means recent activity may be missing.
- Streaks depend on timezone handling and on submission timestamps from external sources.
- Analytics must display which platforms and date ranges contributed to each number.

---

## 🤖 12. AI Features

> 🚧 These features are planned and not implemented. Pseudocode illustrates intended design only.

### 🧩 Level 1: Rule-Based Intelligence (📋 Planned)

- **Weakness detection** — frequency analysis (and optional clustering of related tags): group by tag, compute success rate, flag low-performing topics with enough data
- **Problem recommendations** — similar problems with progressive difficulty; 3–5 per day
- **Daily targets** — derived from goals and recent activity

```text
Weakness detection:
1. Group solved and attempted problems by topic/tag.
2. Require a minimum sample size before evaluating a topic.
3. Calculate success rate per tag.
4. Flag topics below a configurable threshold (50% is an initial example, not a fixed rule).
5. Recommend targeted practice at progressively suitable difficulty levels.
```

The initial recommendation flow is deliberately explainable: analyze the user's available problem history, identify weak topics, find related problems at progressive difficulty, and suggest approximately 3–5 problems per day. Recommendations must reflect missing or incomplete platform data rather than treating it as a failed attempt.

### 🤖 Level 2: AI Assistance (📋 Planned)

- **Personalized study plans** (30/60/90 days) from skill level, target, time per day and weak topics
- **AI chatbot** answering questions about the user's own progress
- **Learning suggestions** from analytics

```text
Study plan input:  current level, target (e.g. "Reach Expert on CF"), time/day, weak topics
Study plan output: 30/60/90 day plan, daily problems, topic milestones
```

A study plan should translate the user's target and available daily time into measurable topic milestones, then adjust recommendations as new activity arrives. It is a planning aid, not a guarantee of a rating or contest outcome.

Considerations: only the minimum necessary user data should be sent to any external AI provider, with clear user consent and no secrets in prompts.

### 📈 Level 3: Advanced Analytics (🔬 Research Required)

- **Performance estimation** — rating trend, moving averages and, where suitable, an Elo-style estimate; output is a clearly labelled estimate, not a guaranteed prediction
- **Historical trend analysis**
- **Predictive models** — only if sufficient data becomes available

A per-user LSTM/Transformer is not recommended initially: individual contest histories are small and sparse. Any future predictive model needs a sufficiently large, representative dataset and out-of-sample evaluation.

---

## ⚡ 13. Performance

> **Status:** No production deployment, reproducible benchmark or monitoring evidence was available. No current response-time, load-time, latency, cache-hit or uptime figures are claimed.

### 🚀 Planned Optimization Strategies

- **Database:** indexes on foreign keys and query fields, `EXPLAIN ANALYZE` on representative queries, connection pooling (pool size to be tuned)
- **API:** gzip/brotli compression, pagination everywhere, avoiding N+1 queries
- **Caching (when needed):** Redis for expensive aggregates

| Data type | Suggested cache duration (proposal) |
|---|---|
| Dashboard stats | 15 minutes |
| Streak data | 5 minutes |
| Contest data | 30 minutes |
| Problem catalogue | 6 hours |
| User profile | 1 hour |

- **Frontend:** code splitting with `React.lazy()`, lazy loading, memoization, debounced search, virtualized long lists

### 🔬 Optimization Details (Original Notes)

<details>
<summary><b>Backend and frontend techniques</b></summary>

- **Connection pooling:** PostgreSQL pool of about 20 connections as a starting point (tune with load tests)
- **Query optimization:** `EXPLAIN ANALYZE` on representative queries; indexes on all foreign keys and filter columns
- **Compression:** gzip for API responses
- **Code splitting:** `React.lazy()`
- **Lazy loading:** images and heavy components
- **Memoization:** `React.memo` and `useMemo` where profiling shows benefit
- **Debouncing:** search inputs
- **Virtual scrolling:** very large lists

</details>

### 📏 Measurement Plan

| Metric | Plan | Current verified value |
|---|---|---|
| API response time | p50/p95/p99 under a documented load test | Not measured |
| Page load / Core Web Vitals | Representative devices and networks | Not measured |
| Database query time | `EXPLAIN ANALYZE` profiling | Not measured |
| Cache hit rate | Telemetry once caching exists | Not measured |
| Uptime | Monitored deployment history | Not measured |

Publish measured values only with test date, environment, workload, sample size and method.

---

## 🧪 14. Testing & Quality Assurance

> The commands and structure below are proposed. Verify scripts against the repository before relying on them.

| Test type | Scope |
|---|---|
| **Unit** | Services, utilities, analytics calculations (streak edge cases, timezones) |
| **Integration** | Services with a real test database |
| **API** | Supertest against the Express app: status codes, envelopes, pagination |
| **Authentication** | Registration, login, refresh rotation, reuse detection, logout, OAuth callbacks |
| **Database** | Migrations apply cleanly, constraints and uniqueness hold, cascades behave |
| **Platform adapters** | Mocked external responses (success, rate limit, malformed, timeout); contract tests against recorded fixtures — never hammer live platforms in CI |
| **Security** | The [verification checklist](#-security-verification-checklist) |
| **End-to-end** | Key user flows (later phase) |

### 🚧 CI/CD Quality Gates (Proposed)

A pull request should not merge unless: lint passes, unit/integration/API tests pass, the build succeeds, migrations apply to a clean database, and coverage does not drop below an agreed threshold (TODO: set threshold).

### 🗂️ Test Structure (Proposed)

```text
tests/
├── unit/
│   ├── controllers/
│   ├── services/
│   └── utils/
├── integration/
│   ├── api/
│   │   ├── auth.test.js
│   │   ├── analytics.test.js
│   │   └── problems.test.js
│   └── database/
└── e2e/
    └── user-flows.test.js
```

### 💻 Commands

```bash
npm test                 # all tests
npm run test:coverage    # with coverage
npm test -- --watch      # watch mode
npm test -- --testPathPattern=auth   # a single suite
```

### 🧪 Example Test

```javascript
// server/tests/integration/api/auth.test.js
const request = require('supertest');
const app = require('../../../src/app');

describe('POST /api/v1/auth/register', () => {
  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'SecurePass123!' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('accessToken');
  });

  it('rejects a duplicate email with 409', async () => {
    const payload = { name: 'Test User', email: 'dup@example.com', password: 'SecurePass123!' };
    await request(app).post('/api/v1/auth/register').send(payload);
    const res = await request(app).post('/api/v1/auth/register').send(payload);

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('CONFLICT');
  });
});
```

---

## 🛣 15. Development Roadmap

> All phases are 📋 Planned; actual progress is ❓ Not Verified. Phases are ordered by practical dependency. Each phase has completion criteria.

| # | Phase | Scope | Completion criteria |
|---|---|---|---|
| 1 | **Foundation & Authentication** | Repo setup, CI, Express + React skeleton, email/password auth, OAuth, token rotation, RBAC basics, audit logging | Register/login/refresh/logout work; reuse detection and IDOR tests pass; CI green |
| 2 | **Database & Data Collection** | Prisma schema and migrations, platform adapter interface, Codeforces adapter, account linking and ownership verification, sync logs, contest ingestion | A verified user can link a Codeforces handle and sync submissions and rating history; sync status visible; adapter tests pass with mocked responses |
| 3 | **Core Dashboard** | Dashboard, problem management (status, notes, bookmarks, filters), contest calendar, goals | Dashboard renders real synced data; problem state persists; contests listed |
| 4 | **Analytics Engine** | Global streak, heatmap, difficulty progression, topic mastery, rating trends, submission stats, weekly/monthly reports, opt-in peer comparison | Metrics match hand-computed fixtures; timezone edge cases tested; data-source disclosure shown in UI |
| 5 | **Multiple Platform Integrations** | AtCoder (via AtCoder Problems), Codewars, manual import; others only after approval | At least two additional sources work behind the adapter interface with `partial data` states and documented limits |
| 6 | **AI Features** | Level 1 rule-based recommendations; Level 2 study plans/chatbot; Level 3 research | Level 1 shipped with tests; Level 2 prototype evaluated; AI limitations surfaced in UI |
| 7 | **Social & Mobile Features** | Public profiles, leaderboard, friends, study groups, mobile app, browser extensions | Privacy controls verified before any public data; mobile MVP released |

### 📝 Original Phase Checklists (Mapped to the Phases Above)

<details>
<summary><b>Show original items</b></summary>

**Foundation & Core (original Phase 1)** — multi-platform account linking (only after platform ownership verification and API approval), unified dashboard, streak tracking, problem management, contest calendar, authentication (JWT + OAuth), security hardening (RBAC, IDOR protection, privacy controls, audit logging, secure session lifecycle) → Phases 1–3.

**Enhanced Analytics (original Phase 2)** — difficulty progression charts, topic mastery breakdown, weekly/monthly reports, comparison with peers, performance predictions → Phase 4 (predictions are Level 3 AI).

**AI Integration (original Phase 3)** — personalized problem recommendations, weakness detection algorithm, study plan generator, contest performance predictor, chatbot assistant → Phase 6.

**Social Features (original Phase 4)** — public profile pages, global leaderboard, friend system, study groups, discussion forums → Phase 7.

**Mobile & Extensions (original Phase 5)** — React Native mobile app (iOS/Android), browser extensions (Chrome, Firefox), desktop app (Electron), VS Code extension → Phase 7 / Future Ideas.

**Advanced Features (original Phase 6)** — code snippet manager, interview preparation mode, mock contest simulator, video solution integration, mentorship matching → Future Ideas.

</details>

### 💭 Future Ideas (Unscheduled)

Code snippet manager, interview preparation mode, mock contest simulator, video solution integration, mentorship matching, desktop app, VS Code extension, discussion forums.

---

## ⚙️ 16. Installation & Deployment

> These steps are a proposed developer guide. Validate package scripts, environment variables and services against the actual repository before treating them as executable.

### 📋 Prerequisites

| Software | Version | Notes |
|---|---|---|
| Node.js | 22+ (LTS) | Confirm against `engines` in `package.json` |
| npm | 10+ | |
| PostgreSQL | 15+ | Required |
| Redis | 7+ | **Optional** — only if caching/queues are enabled |
| Git | Latest | |
| Docker | Optional | For containerized local setup |

```bash
node --version
npm --version
psql --version
redis-cli --version   # only if using Redis
```

**Optional tools:** Docker (containerized setup), Postman (API testing), pgAdmin (database management).

### 💻 Local Development Setup

```bash
# 1. Clone
git clone https://github.com/ishendrarai/CodeONE.git
cd CodeONE

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Create the database
createdb codeone
# or: psql -U postgres  ->  CREATE DATABASE codeone;  ->  \q

# 4. Environment files
cd ../server && cp .env.example .env
cd ../client && cp .env.example .env
# Edit both files (see below)

# 5. Run migrations (Prisma)
cd ../server
npx prisma migrate dev

# 6. (Optional) seed sample data
npm run seed

# 7. Start servers (two terminals)
cd server && npm run dev    # http://localhost:5000
cd client && npm run dev    # http://localhost:5173
```

> **Not verified:** the `.env.example` files, the `seed` script and the folder names `server/` and `client/` must be confirmed in the repository. If Redis is enabled, start it first (`redis-server`, check with `redis-cli ping`).

**Verify installation:** open `http://localhost:5173` in your browser. Once the frontend is built and verified, you should see the CodeONE landing page. Also check that the API responds on `http://localhost:5000`.

### 🌍 Environment Variables

**All values below are placeholders. Never commit real secrets.**

`server/.env`

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database (Prisma uses DATABASE_URL)
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/codeone

# Auth
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=replace-with-a-different-long-random-secret
JWT_REFRESH_EXPIRES_IN=7d
COOKIE_SECRET=replace-with-a-long-random-secret

# OAuth (server-side flow)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/oauth/google/callback
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:5000/api/v1/auth/oauth/github/callback

# Email (password reset, notifications)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=noreply@example.com

# Optional: Redis (only if enabled)
REDIS_URL=

# Optional: contest source — only after terms/approval review
CLIST_USERNAME=
CLIST_API_KEY=

# Optional: Codeforces key/secret only if private data is ever needed
CODEFORCES_API_KEY=
CODEFORCES_API_SECRET=

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

LOG_LEVEL=debug
```

`client/.env`

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_API_TIMEOUT=10000
VITE_ENABLE_DARK_MODE=true
```

Notes:

- LeetCode and HackerRank API keys are intentionally **not** listed: no approved public API access has been established for them.
- OAuth client IDs are not needed on the frontend when the OAuth flow is handled server-side.
- Generate secrets with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

<details>
<summary><b>Optional / later environment variables (original notes)</b></summary>

```env
# server/.env — only if the feature exists
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif   # avatar uploads, if implemented
SMTP_HOST=smtp.gmail.com                            # example provider; use an app-specific password

# client/.env — feature flags and monitoring (all optional)
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_SENTRY_DSN=
```

Variables from the original template that are **intentionally not part of the default setup**:

```env
# Redundant with DATABASE_URL / REDIS_URL — only if your code reads them separately
DB_HOST=localhost
DB_PORT=5432
DB_NAME=codeone
DB_USER=your_username
DB_PASSWORD=your_password
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# NOT USED: no approved public API access has been established for these platforms.
# Do not add keys or scrapers without written permission (see Section 7).
# LEETCODE_API_KEY=
# HACKERRANK_API_KEY=

# Only needed if OAuth is started from the browser. The recommended server-side flow does not need them.
# VITE_GOOGLE_CLIENT_ID=
# VITE_GITHUB_CLIENT_ID=

# Retired Universal Analytics ID format from the old template; use a current analytics provider instead
# VITE_GA_TRACKING_ID=
```

Use a current analytics provider rather than the retired Universal Analytics (`UA-` IDs) from older templates.
</details>

### 📁 Proposed Project Structure

> Verify against the actual repository.

```text
CodeONE/
├── client/                    # React + Vite frontend
│   └── src/
│       ├── components/        # common, layout, dashboard, problems
│       ├── pages/             # Dashboard, Problems, Analytics, Contests, Profile, Login, Register
│       ├── hooks/             # useAuth, useProblems, useAnalytics, useDebounce
│       ├── services/          # api.js (Axios), per-resource services
│       ├── context/           # AuthContext, ThemeContext
│       └── utils/
├── server/                    # Express backend
│   ├── prisma/
│   │   ├── schema.prisma      # source of truth for the data model
│   │   └── migrations/
│   ├── src/
│   │   ├── routes/            # versioned route definitions
│   │   ├── controllers/
│   │   ├── services/          # auth, analytics, sync, contests, email
│   │   ├── integrations/
│   │   │   └── adapters/      # PlatformAdapter interface + one adapter per platform
│   │   ├── middleware/        # auth, validation, rate limiting, error handler, logger
│   │   ├── jobs/              # sync / contest ingestion schedulers
│   │   ├── config/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── seeds/
│   └── tests/                 # unit, integration, e2e
├── docker/
├── docs/                      # API.md, DEPLOYMENT.md, CONTRIBUTING.md (to be written)
├── .github/workflows/
├── docker-compose.yml
├── LICENSE
└── README.md
```

<details>
<summary><b>Detailed file-level structure (proposed)</b></summary>

```text
client/
├── public/ (favicon.ico, index.html)
└── src/
    ├── components/
    │   ├── common/     Button.jsx, Input.jsx, Modal.jsx
    │   ├── layout/     Header.jsx, Sidebar.jsx, Footer.jsx
    │   ├── dashboard/  StatsCard.jsx, StreakHeatmap.jsx, ProgressChart.jsx
    │   └── problems/   ProblemCard.jsx, ProblemFilter.jsx, ProblemList.jsx
    ├── pages/          Dashboard, Problems, Analytics, Contests, Profile, Login, Register
    ├── hooks/          useAuth.js, useProblems.js, useAnalytics.js, useDebounce.js
    ├── services/       api.js (Axios), authService.js, problemService.js, analyticsService.js
    ├── context/        AuthContext.jsx, ThemeContext.jsx
    ├── utils/          dateFormatter.js, validators.js, constants.js
    ├── styles/index.css
    ├── App.jsx
    └── main.jsx
(+ .env.example, package.json, vite.config.js, tailwind.config.js)

server/
├── prisma/             schema.prisma, migrations/
├── seeds/              sample_data.js
├── tests/              unit/, integration/, e2e/
└── src/
    ├── controllers/    auth, user, problem, analytics, contest
    ├── routes/         index.js + one file per resource
    ├── services/       auth, problem, analytics, sync, email
    ├── integrations/adapters/   PlatformAdapter + codeforces, atcoder, codewars, manual-import
    ├── middleware/     auth, validation, errorHandler, rateLimiter, logger
    ├── config/         database.js, redis.js (optional), passport.js, constants.js
    ├── utils/          jwt.js, password.js, validators.js, apiHelpers.js
    ├── jobs/           syncScheduler.js, emailScheduler.js
    ├── app.js
    └── server.js
(+ .env.example, package.json, jest.config.js)

docker/ (Dockerfile.client, Dockerfile.server, nginx.conf)
scripts/ (setup.sh, migrate.sh, deploy.sh)
docs/ (API.md, DEPLOYMENT.md, CONTRIBUTING.md)
.github/workflows/ (ci.yml, cd.yml)
Root: docker-compose.yml, .gitignore, .eslintrc.js, .prettierrc, LICENSE, README.md
```

Note: the original `models/` folder is dropped because Prisma generates the data models from `schema.prisma`.
</details>

### 🐳 Docker (Local Development Only)

```yaml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: codeone
      POSTGRES_USER: codeone_user
      POSTGRES_PASSWORD: change-me-locally     # dev placeholder only
    ports:
      - "127.0.0.1:5432:5432"                  # bind to localhost, not all interfaces
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # redis:   # optional — enable only if caching/queues are used
  #   image: redis:7-alpine
  #   ports:
  #     - "127.0.0.1:6379:6379"

volumes:
  postgres_data:
```

Run `docker compose up -d`, then follow the local setup steps with `DATABASE_URL` pointing at this container. A full multi-service compose file (backend + frontend) can be added once Dockerfiles exist and are tested. **Do not reuse these credentials in production.**

<details>
<summary><b>Full multi-service compose template (original, hardened)</b></summary>

Requires `docker/Dockerfile.server` and `docker/Dockerfile.client` to exist and work. For **local development only**; replace every placeholder password and never publish database ports in production.

```yaml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: codeone
      POSTGRES_USER: codeone_user
      POSTGRES_PASSWORD: change-me-locally
    ports:
      - "127.0.0.1:5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:                      # optional; remove if Redis is not enabled
    image: redis:7-alpine
    ports:
      - "127.0.0.1:6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./server
      dockerfile: ../docker/Dockerfile.server
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://codeone_user:change-me-locally@postgres:5432/codeone
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

  frontend:
    build:
      context: ./client
      dockerfile: ../docker/Dockerfile.client
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```
</details>

Useful commands (when a full compose file with application services exists):

```bash
docker compose build        # build images
docker compose up -d        # start services
docker compose logs -f      # follow logs
docker compose down         # stop services
```

### 🚀 Production Deployment

**Recommended starting point:** Vercel (frontend) + a managed Node.js host (for example Render or Railway) + managed PostgreSQL.

- Frontend: `cd client && vercel --prod` (set `VITE_API_URL` to the deployed API).
- Backend: build/start commands depend on the actual `package.json` scripts; run `npx prisma migrate deploy` during release.
- Set all secrets through the host's environment configuration; use HTTPS only; set `CLIENT_URL` to the exact frontend origin for CORS and cookies.
- Enable automated database backups and test a restore.

**Self-hosting on a VM** (AWS EC2 or similar) is possible: install Node.js, PostgreSQL and Nginx; run the API under a process manager such as PM2; terminate TLS with Let's Encrypt (`certbot --nginx`); serve `client/dist` statically and proxy `/api` to the backend. Prefer managed PostgreSQL over a self-managed instance. Avoid exposing database or Redis ports publicly.

### ☁️ Additional Deployment Options (Proposed)

<details>
<summary><b>Option: Vercel (frontend) + Render (backend)</b></summary>

```bash
npm install -g vercel
cd client
vercel --prod
```

Render (backend): connect the GitHub repository, choose "Web Service", set the build and start commands from the real `package.json` scripts (e.g. `npm install` / `npm start`), run `npx prisma migrate deploy` on release, and add environment variables.
</details>

<details>
<summary><b>Option: AWS EC2 (full stack on one VM)</b></summary>

1. Launch an Ubuntu LTS instance (the original used Ubuntu 22.04 on `t2.medium` for production; choose a current LTS and size it to your load). Open ports 80, 443 and 22 (restrict 22 to your IP).
2. Install dependencies:

```bash
sudo apt update && sudo apt upgrade -y
# Install Node.js LTS (the original used setup_18.x, which is now end-of-life; use a current version)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install -y postgresql postgresql-contrib nginx
# Optional, only if Redis is enabled:
# sudo apt install -y redis-server
sudo npm install -g pm2
```

3. Clone and build:

```bash
git clone https://github.com/ishendrarai/CodeONE.git
cd CodeONE/server && npm ci
cd ../client && npm ci && npm run build
```

4. Nginx (`/etc/nginx/sites-available/codeone`):

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /home/ubuntu/CodeONE/client/dist;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/codeone /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

5. Run the backend:

```bash
cd ~/CodeONE/server
pm2 start npm --name "codeone-backend" -- start
pm2 save && pm2 startup
```

6. TLS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```
</details>

<details>
<summary><b>Option: Heroku (quick deploy)</b></summary>

```bash
heroku login
heroku create codeone-backend
heroku addons:create heroku-postgresql:mini
# Optional: heroku addons:create heroku-redis:mini
git push heroku main
```

Deploy the frontend to Vercel or Netlify. Plans and add-on names change; check Heroku's current documentation.
</details>

### 🔄 CI Example (Proposed)

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_PASSWORD: ci-only-password
          POSTGRES_DB: codeone_test
        ports: ["5432:5432"]
        options: >-
          --health-cmd "pg_isready -U postgres"
          --health-interval 5s --health-timeout 5s --health-retries 5
    env:
      DATABASE_URL: postgresql://postgres:ci-only-password@localhost:5432/codeone_test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: cd server && npm ci && npx prisma migrate deploy && npm test
      - run: cd client && npm ci && npm test && npm run build
```

A deploy job (for example a Render deploy hook and Vercel deployment) should be added only after tests exist and pass, and should depend on this job. Store tokens in GitHub repository secrets.

<details>
<summary><b>Deploy workflow example (original, updated)</b></summary>

Add only after tests exist and pass. Store tokens as GitHub repository secrets.

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: cd server && npm ci && npm test
      - run: cd client && npm ci && npm test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK }}"

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

Verify action versions against their current releases before use.
</details>

### 🔧 Troubleshooting

| Problem | Likely cause / fix |
|---|---|
| `could not connect to server: Connection refused` | PostgreSQL is not running or `DATABASE_URL` is wrong. Check `sudo systemctl status postgresql` and `psql -U postgres -h localhost` |
| `Redis connection failed` | Redis is optional. Either start it (`redis-server`) or leave `REDIS_URL` empty and disable caching |
| `JsonWebTokenError: invalid signature` | `JWT_SECRET` differs between deployments, or tokens were issued with an old secret. Log in again |
| CORS error in the browser | `CLIENT_URL` must exactly match the frontend origin; backend needs `cors({ origin: process.env.CLIENT_URL, credentials: true })` |
| `EADDRINUSE :::5000` | Another process uses the port. Find it with `lsof -i :5000` and stop it, or run with `PORT=5001` |
| `Module not found` | Remove `node_modules` and `package-lock.json`, reinstall; check imports |
| `.env` not loading | Confirm the file location and `KEY=value` format (no spaces around `=`); restart the server |
| `redirect_uri_mismatch` | OAuth callback URL in the provider console must match `*_CALLBACK_URL` exactly (protocol, host, path, no stray slash) |
| Prisma migration errors | Confirm the DB user can create schemas/tables; run `npx prisma migrate status` |

<details>
<summary><b>Troubleshooting commands (original notes)</b></summary>

**Database**

```bash
sudo systemctl status postgresql
sudo systemctl start postgresql
psql -U postgres -h localhost
```

**Redis (only if enabled)**

```bash
redis-cli ping
redis-server
redis-cli CONFIG GET bind
```

**CORS**

```javascript
// server/src/app.js
const cors = require('cors');
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
```

**Port already in use**

```bash
lsof -i :5000
kill <PID>          # try a normal kill first; use -9 only as a last resort
PORT=5001 npm run dev
```

**Build errors**

```bash
rm -rf node_modules package-lock.json
npm install
rm -rf dist
npm run build
```

**Environment variables**

```bash
ls -la .env
# KEY=value   (correct)
# KEY = value (wrong: no spaces around =)
```

**OAuth `redirect_uri_mismatch`:** verify the callback URL in the provider console matches exactly, including protocol, host, path and trailing slashes, and update the `.env` value.
</details>

---

## ⚠️ 17. Known Limitations

- **External API limitations:** availability, stability, rate limits and terms vary by platform. Some APIs are unofficial, minimally maintained or subject to change without notice.
- **Access restrictions:** LeetCode and CodeChef terms restrict scraping; without approved access they are not essential dependencies.
- **Data availability:** some platforms expose no submission-level history; private profiles and source code are generally not available.
- **Sync delays:** data is not real-time; sync frequency is bounded by provider rate limits.
- **Analytics accuracy:** results depend on the completeness of synced data; cross-platform difficulty is only approximately comparable; streaks depend on timezone and external timestamps.
- **AI limitations:** recommendations and estimates can be wrong; predictive models need large datasets that individual users rarely have.
- **Project maturity:** this README documents a proposed system; implementation status is not verified.

---

## ❓ 18. FAQ

### 💬 General

**Q: Is CodeONE free to use?**
A: CodeONE is intended to be free and open-source under the MIT license (confirm the `LICENSE` file is present in the repository).

**Q: Which coding platforms are supported?**
A: No connector is claimed as implemented or verified. Codeforces has the clearest documented API and is the first planned integration. See [Platform Integration Strategy](#-7-platform-integration-strategy).

**Q: Do I need API keys for the platforms?**
A: It depends on each platform's approved access model. Do not provide platform passwords or session cookies. Where an official API requires authorization, only the documented and permitted flow will be used.

**Q: Will LeetCode work with a private profile?**
A: No. No supported public official LeetCode API was verified, its internal endpoint is undocumented, and its Terms restrict scraping. CodeONE will not claim LeetCode support without explicit authorization; manual import may become an option.

**Q: How often does CodeONE sync my data?**
A: A schedule has not been verified. Any schedule must respect each provider's rate limits and terms.

### 🛠 Technical

**Q: How is this different from the LeetCode/Codeforces dashboards?**
A: CodeONE aims to provide unified analytics across permitted integrations: global streaks, weakness analysis and contest aggregation.

**Q: How is my data stored?**
A: PostgreSQL is the proposed primary database. Security controls and deployment are not verified. The design never stores external platform passwords.

**Q: Can I export my data?**
A: JSON/CSV export is planned, not verified.

**Q: Is there a mobile app?**
A: Not yet; it is on the roadmap. A responsive web UI is a design goal.

**Q: Can I self-host it for my team?**
A: Self-hosting is the open-source direction. Setup instructions must be validated against the repository.

### 👩‍💻 Development

**Q: Can I contribute?** Yes — see [Contributing](#-20-contributing).
**Q: What's the tech stack?** React (Vite) + Node.js (Express) + PostgreSQL + Prisma, with optional Redis. See [Tech Stack](#-5-tech-stack).
**Q: How do I report a bug?** Open an issue at [github.com/ishendrarai/CodeONE/issues](https://github.com/ishendrarai/CodeONE/issues) with reproduction steps.
**Q: Do you accept feature requests?** Yes — open a feature request issue.

---

## 🧠 19. Design Decisions

**Why a modular monolith?** Faster iteration, clear domain boundaries (Auth, Analytics, Sync, Contests), lower operational complexity, and an easy path to splitting later. Trade-off: scaling means horizontal duplication, and modules must be kept decoupled.

**Why PostgreSQL over MongoDB?** Strong relational integrity (users → accounts → submissions → problems), ACID transactions, JSONB where flexibility is needed, and better support for analytical queries.

**Why Prisma?** Type-safe data access, parameterized queries, and versioned migrations as the schema source of truth.

**Why Redis is optional.** Redis speeds up repeated aggregates, but it adds an operational dependency. Streaks and dashboards can be computed from indexed PostgreSQL queries first; Redis is added when measurements show a need (see [staged introduction plan](#-staged-introduction-plan)).

**Why short-lived JWT access tokens plus server-tracked refresh tokens?** Access tokens keep API calls stateless and cheap to verify. Because JWTs cannot be revoked easily, refresh tokens are rotated and tracked server-side (`user_sessions`, `refresh_tokens`), so sessions can be revoked and reuse detected. This is a hybrid model, not purely stateless.

**Why a platform adapter layer?** Platforms differ in access, stability and permission. Adapters isolate those differences and let risky or unapproved sources be disabled without touching analytics.

### 📝 Design Decision Details (Original Notes)

<details>
<summary><b>Modular monolith, Redis and JWT trade-offs</b></summary>

**Modular monolith**
- Pros: faster iteration early on, clear domain separation (Auth, Analytics, Sync), reduced operational complexity, easy to split into services later.
- Cons: scaling requires horizontal duplication; tight coupling if modules are not kept independent.
- Decision: start as a monolith, keep modules as independent as possible, split only when traffic demands it.

**PostgreSQL over MongoDB**
- Strong relational integrity (users → problems → submissions), ACID guarantees, JSONB when needed, mature tooling, better for complex analytics queries.

**Redis (when introduced)**
- Benefits: lower database load, sub-millisecond reads, rate-limit counters, session/token-denylist support.
- Candidate use cases: dashboard stats (15 min), user profiles (1 hour), streak data (5 min), contest listings (30 min). Computing streaks from indexed PostgreSQL queries comes first; Redis sorted sets are an optimization, not a requirement.

**JWT**
- Advantages: stateless verification of access tokens, scales horizontally, works with OAuth.
- Trade-offs: tokens cannot be revoked easily (mitigated with short expiry plus server-tracked rotating refresh tokens), and larger than session IDs (mitigated by keeping the payload minimal).

</details>

---

## 🤝 20. Contributing

We welcome contributions from the community.

### 🛠 How to Contribute

1. **Fork** [github.com/ishendrarai/CodeONE](https://github.com/ishendrarai/CodeONE), then clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/CodeONE.git
   cd CodeONE
   git remote add upstream https://github.com/ishendrarai/CodeONE.git
   ```

2. **Create a branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make changes** — clean code, follow the existing style, add tests, update docs.
4. **Review and commit**

   ```bash
   git status
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Format: `<type>: <description>` with types `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

5. **Push your branch**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request** with a clear description, related issues, test results, and screenshots for UI changes. Confirm that the branch is up to date and that CI checks pass before requesting review.

### 📖 Guidelines

- **Code style:** ES6+, functional React components with hooks, camelCase variables, PascalCase components, comments for complex logic.
- **Testing:** unit tests for new functions, integration tests for API endpoints; all tests must pass (`npm test`).
- **Documentation:** update this README for new features, add JSDoc comments, update API docs.
- **Integrations:** a new platform adapter must follow the [Permanent API Integration Policy](#-permanent-api-integration-policy) and include an entry in the API Integration Registry.
- **Security:** never commit secrets; report vulnerabilities privately to the maintainer instead of opening a public issue.

### 🌱 Good First Issues

Look for issues labelled `good first issue`, `help wanted` or `documentation`.

### 🤝 Code of Conduct

Be respectful and inclusive, give constructive feedback, help others learn, and report inappropriate behavior to the maintainer.

---

## 👥 21. Contributors

Meet the team behind CodeONE — **The Fantastic Five**! 🌟

This project is created and maintained as a **Major Project** by our team:

<p align="center">
  <img src="./readme%20assets/fantastic-five-badge.jpg" alt="The Fantastic Five Logo" width="220" />
</p>

### 🛡️ The Fantastic Five

<!-- ALL-CONTRIBUTORS-LIST:START -->

| Avatar | Contributor | GitHub | Role |
|:------:|:-----------:|:------:|:----:|
| <a href="https://github.com/Anveshaaa23"><img src="https://github.com/Anveshaaa23.png" width="70" height="70" alt="Anvesha Singh" /></a> | **Anvesha Singh** | [@Anveshaaa23](https://github.com/Anveshaaa23) | Contributor |
| <a href="https://github.com/astha0107"><img src="https://github.com/astha0107.png" width="70" height="70" alt="Astha" /></a> | **Astha** | [@astha0107](https://github.com/astha0107) | Contributor |
| <a href="https://github.com/ayucode12"><img src="https://github.com/ayucode12.png" width="70" height="70" alt="Ayush" /></a> | **Ayush** | [@ayucode12](https://github.com/ayucode12) | Contributor |
| <a href="https://github.com/divyanshi10"><img src="https://github.com/divyanshi10.png" width="70" height="70" alt="Divyanshi Kulshrestha" /></a> | **Divyanshi Kulshrestha** | [@divyanshi10](https://github.com/divyanshi10) | Team Leader |
| <a href="https://github.com/ishendrarai"><img src="https://github.com/ishendrarai.png" width="70" height="70" alt="Ishendra Rai" /></a> | **Ishendra Rai** | [@ishendrarai](https://github.com/ishendrarai) | Repo Maintainer |

<!-- ALL-CONTRIBUTORS-LIST:END -->

Want to see your name here? [Contribute to CodeONE!](#-20-contributing)

---

## 📄 22. License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 23. Contact

- **Email:** [ishurai.020805@email.com](mailto:ishurai.020805@gmail.com) <!-- TODO: confirm email address -->
- **GitHub:** [@ishendrarai](https://github.com/ishendrarai)
- **Twitter/X:** [@ishendrarai02](https://x.com/ishendrarai02)
- **LinkedIn:** [Ishendra Rai](https://linkedin.com/in/ishendrarai)

### 🔗 Project Links

- **Repository:** https://github.com/ishendrarai/CodeONE
- **Issue Tracker:** https://github.com/ishendrarai/CodeONE/issues
- **Live Demo:** not deployed yet
- **Discord / Documentation site / Roadmap board:** not set up yet <!-- add links only when they exist -->

---

## 🌟 24. Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ishendrarai/CodeONE&type=Date)](https://star-history.com/#ishendrarai/CodeONE&Date)

---

## 🎯 25. Final Words

**CodeONE** was born from personal frustration with fragmented progress tracking across competitive programming platforms. The goal is simple: **one dashboard for your whole journey**.

Whether you're preparing for:

- 🎓 **Coding interviews** at FAANG companies
- 🏆 **Competitive programming contests**
- 📚 **Learning data structures & algorithms**
- 🚀 **Personal skill development**

CodeONE aims to help you stay consistent, track progress and build mastery.

> **"Success is the sum of small efforts, repeated day in and day out."**
> — Robert Collier

### Built for developers who don't just solve problems — they build mastery. 🚀

**Give us a ⭐ if CodeONE helps your coding journey!**

[Report Bug](https://github.com/ishendrarai/CodeONE/issues) · [Request Feature](https://github.com/ishendrarai/CodeONE/issues)

---

*Made with ❤️ by The Fantastic Five*
