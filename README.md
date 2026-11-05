# 🚀 CodeONE — Consolidate Your Competitive Programming Journey

> **A proposed unified analytics layer for competitive programmers.**  
> *Track. Analyse. Improve. Stay consistent.*

![Node](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Redis](https://img.shields.io/badge/Redis-7-red)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Research%20%26%20Documentation-informational)

---

## 📌 Table of Contents

- [✨ Overview](#-overview)
- [🌐 Platform API Directory & Integration Research](#-platform-api-directory--integration-research)
- [🚀 Why CodeONE?](#-why-codeone)
- [🌐 Live Demo](#-live-demo)
- [📸 Screenshots](#-screenshots)
- [🔥 Core Features](#-core-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Architecture](#-architecture)
- [🔐 Authentication](#-authentication)
- [🗄 Database Schema](#-database-schema)
- [🔌 API Documentation](#-api-documentation)
- [🔐 Security & Privacy](#-security--privacy)
- [⚡ Performance](#-performance)
- [🧪 Testing](#-testing)
- [📋 Prerequisites](#-prerequisites)
- [⚙ Installation & Setup](#-installation--setup)
- [🌍 Environment Variables](#-environment-variables)
- [📁 Project Structure](#-project-structure)
- [🚀 Deployment](#-deployment)
- [🔧 Troubleshooting](#-troubleshooting)
- [❓ FAQ](#-faq)
- [📊 Design Decisions](#-design-decisions)
- [🤖 AI Vision](#-ai-vision)
- [🏆 Key Highlights](#-key-highlights)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [👥 Contributors](#-contributors)
- [🔎 API Research Sources & Verification Record](#-api-research-sources--verification-record)
- [📄 License](#-license)
- [📬 Contact](#-contact)
- [🌟 Star History](#-star-history)
- [🎯 Final Words](#-final-words)

---

## ✨ Overview

**CodeONE** is a proposed full-stack competitive programming analytics platform for developers, students, and interview aspirants solving problems across multiple platforms.

> **Project status:** This README describes the proposed system and researched integration options. It is not proof of a completed or deployed product. The source repository/application was not available during the API documentation review. Feature checkboxes, architecture diagrams, API examples and setup instructions must be validated against actual source code before being described as implemented.

The initial platform research is summarized below:

| Platform | API classification | Potential data | Documentation status |
|----------|-------------------|---------------|-----------------------|
| Codeforces | Official API | Public profile, submissions, rating history, contests, problem catalogue | Documented; best initial integration candidate |
| LeetCode | Unofficial internal GraphQL endpoint; third-party wrappers also exist | Public profile statistics, recent accepted submissions, contest data and activity calendar may be queryable | No documented public official API; Terms restrict scraping |
| HackerRank | Official enterprise APIs; unofficial public-profile scrapers exist | Enterprise test/candidate/team data; public profile/badge data may be limited | Official APIs are not a general public competitive-programming history API |
| AtCoder | Third-party community API (AtCoder Problems) | Problems, contests, user submissions and derived statistics | Community-maintained; not an AtCoder-operated API |
| CodeChef | Unofficial community wrappers/scrapers reported; no supported public API verified | Some public profile/rating/contest information may be exposed by community tools | Scraping is prohibited by the current Terms; do not use without written permission |

> **Important project-status note:** This README describes the proposed system and researched integration options. The repository/application implementation was not available for this documentation review, so no platform integration is represented as implemented or tested. “API documented” means a public document or source was located; it does not mean CodeONE has connected to it or that its use is legally approved.

The project aims to reduce dashboard fragmentation by building a **single analytics workspace** for:

- 📊 **Progress tracking** — Unified view across all platforms
- 🔥 **Streak monitoring** — Never break your momentum
- 📈 **Difficulty analysis** — Identify your comfort zones
- 🧠 **Topic mastery** — Track weak areas systematically
- 🏆 **Contest planning** — Never miss important competitions
- 📉 **Performance trends** — Visualize your growth over time
- 🎯 **Goal management** — Set and achieve daily/weekly targets

---

## 🌐 Platform API Directory & Integration Research

**Research snapshot:** 6 November 2026. This section distinguishes APIs operated by a platform from unofficial endpoints and independent third-party services. The availability of an endpoint is not, by itself, permission to use it. Terms, licensing, commercial-use rights, rate limits, and privacy requirements must be reviewed before any integration is approved.

### API classification

| Label | Meaning | Default priority |
|---|---|---|
| 🟢 **OFFICIAL** | API documented or provided by the platform/operator | Highest, subject to scope and terms |
| 🟡 **UNOFFICIAL** | Undocumented internal endpoint, community wrapper, or scraper | Low; requires explicit risk and permission review |
| 🔵 **THIRD-PARTY** | Independent provider collects, transforms, or republishes platform data | Conditional; provider dependency and licensing review required |
| ⚪ **UNVERIFIED / NOT FOUND** | No supported public user-analytics API was verified in this research | Do not assume an API exists |

The `API classification` is separate from CodeONE's implementation status. All entries below are **RESEARCHED / NOT IMPLEMENTED** unless a future repository audit proves otherwise.

### A. Platforms with documented official APIs

| Platform | Official API / documentation | Data relevant to CodeONE | Access, limitations and suitability |
|---|---|---|---|
| **Codeforces** | [Codeforces API methods](https://codeforces.com/apiHelp/methods) | `user.info`, `user.status`, `user.rating`, `contest.list`, `contest.ratingChanges`, `contest.standings`, `problemset.problems` | Strongest fit. Public methods can be called anonymously; private data requires an API key/signature. The API documentation specifies a maximum of one request every two seconds. Public submission history is available through `user.status`; source code access is separately restricted. |
| **Codewars** | [Codewars API v1](https://dev.codewars.com/) | Public user profile, honor, ranks, skills, completed challenges, authored challenges and challenge metadata | Useful for profile and completed-kata history. No authentication is required for documented v1 endpoints. The API's own documentation calls it minimal/inconsistent and says it was never actively developed; v2 has no published ETA. Treat as official but maintenance-risky. |
| **Aizu Online Judge (AOJ)** | [AOJ API documentation](https://judge.u-aizu.ac.jp/onlinejudge/api.jsp) | User details, solved records, status logs, problem information, categories and contest-related data | Official operator documentation describes XML web-service endpoints. The documentation says the API is under construction and may change without notice; it also asks developers planning services to contact AOJ. Confirm current endpoint base URLs and permission before relying on it. |
| **DMOJ** | [DMOJ API routes in the official codebase](https://github.com/DMOJ/online-judge/blob/master/dmoj/urls.py) | Instance-level users, problems, contests and submissions (`/api/v2/...`) | Official API functionality exists in the DMOJ software, but each DMOJ installation is independently hosted. Endpoint availability, authentication, visibility and rate limits depend on the specific instance. This is not one centralized global DMOJ API. |
| **DOMjudge** | [DOMjudge REST API documentation](https://www.domjudge.org/docs/manual/9.0/develop.html#api) and [ICPC Contest API specification](https://ccs-specs.icpc.io/2026-01/contest_api) | Contest metadata, teams, problems, submissions, judging results and scoreboard information | Official contest-system API, normally hosted per contest/installation. Many operations require credentials; some endpoints expose sensitive contest/submission data. Best suited to university/ICPC event integrations, not general global user profiles. |
| **HackerRank** | [HackerRank API overview](https://support.hackerrank.com/articles/2067417637-api-overview) | Enterprise tests, candidates, candidate results/reports, interviews, users, teams and questions | Official APIs are designed for HackerRank for Work / enterprise workflows and require enterprise access/token. The documentation does not establish a public API for a student's general practice submissions, problem history or competitive profile. Do not label the enterprise API as full profile integration. |
| **HackerEarth** | [HackerEarth API information](https://help.hackerearth.com/hc/en-us/articles/360002661854-how-do-i-use-hackerearth-s-api-) | Code evaluation/compiler execution | Official API V4 is documented for code evaluation. The reviewed documentation does not establish a general public API for retrieving a user's HackerEarth practice profile or complete submission history. Useful only if CodeONE later needs authorized code-evaluation workflows. |
| **CodeSignal** | [CodeSignal API overview](https://support.codesignal.com/hc/en-us/articles/18050947755031-CodeSignal-APIs) and [developer portal](https://developer.codesignal.com/) | Organization-scoped data and workflows through GraphQL; event notifications through webhooks | Official APIs require organization setup, API-key permissions and/or support enablement. They are not documented as an open API for importing any individual's public competitive-programming profile. Conditional fit only for an authorized institutional integration. |
| **Topcoder** | [Topcoder developer API ecosystem](https://www.topcoder.com/) and [submission API project reference](https://github.com/topcoder-archive/submissions-api) | Challenge and submission workflow data, depending on API family and permissions | Topcoder has platform API services, but the reviewed public references do not establish a stable, unrestricted public endpoint for importing arbitrary users' complete competitive-programming histories. Confirm current developer documentation, credentials, scopes and service maintenance before listing it as a supported profile connector. |
| **NowCoder (牛客)** | [NowCoder API documentation](https://docs.nowcoder.com/) | Enterprise test/paper management, candidates, test status and assessment reports | Official Open Platform documentation describes OAuth 2.0/API-key access associated with NowCoder enterprise accounts. It is primarily an enterprise recruitment/assessment integration, not a public student practice-profile API. Access is conditional on an enterprise account and permissions. |

### B. Unofficial APIs and community endpoints

| Platform | Unofficial API / documentation | Potential data | Reliability and policy assessment |
|---|---|---|---|
| **LeetCode** | Internal GraphQL endpoint commonly used by the website: `https://leetcode.com/graphql`; community wrapper example: [LeetCode Query](https://github.com/JacobLinCool/LeetCode-Query) | Public profile/solved counts, recent accepted submissions, activity calendar and contest ranking may be retrievable through current public queries | No documented public official API was located. The endpoint is undocumented and can change. LeetCode's [Terms of Service](https://leetcode.com/terms/) expressly prohibit crawling, scraping and spidering. **Do not scrape or automate this endpoint without written authorization.** Never collect or proxy session cookies. Mark as HIGH RISK / NOT APPROVED for automated collection unless LeetCode grants permission. |
| **CodeChef** | Community-developed clients and scraping projects exist; no supported public official profile API was verified | Community tools may expose profile, rating, contest or solved-problem information, but completeness and freshness vary | Current [CodeChef Terms](https://www.codechef.com/terms) prohibit spidering, crawling and scraping and restrict unauthorized copying/exploitation. **Do not use scrapers or reverse-engineered endpoints without written permission.** Seek an official partnership/API or leave this connector unavailable. |
| **Luogu** | [Community-maintained API notes](https://github.com/0f-0b/luogu-api-docs) | Community-documented profile, problem, record and contest information | Not an official API contract. Endpoint stability, access controls, rate limits and permitted use were not independently established. HIGH RISK until Luogu confirms permission and supported access. |
| **HackerRank public-profile scrapers** | Community scraper example: [HackerRank Stats API project](https://github.com/tashifkhan/hackerrank-stats-api) | May return limited public profile/badge information | Not operated or supported by HackerRank. Do not confuse this with HackerRank's official enterprise API. Data completeness and maintenance are unverified; avoid production dependency without permission and tests. |

### C. Third-party data providers

| Provider | Classification | Coverage / potential use | Dependency and verification notes |
|---|---|---|---|
| **AtCoder Problems** | 🔵 Third-party community service | AtCoder contests, problems, user submissions, accepted counts, rankings, language statistics and derived streaks | [API and dataset documentation](https://github.com/kenkoooo/AtCoderProblems/blob/main/doc/api.md) explicitly says it is unofficial, asks clients to wait more than one second between requests, and warns that APIs may be deprecated/replaced. User submissions endpoint returns up to 500 submissions after a supplied timestamp. Strong technical fit, but external-service and policy dependency. |
| **API.SH – LeetCode API** | 🔵 Third-party commercial provider | Provider advertises REST endpoints for public LeetCode profiles, recent accepted submissions, contests and problem metadata | [Provider documentation](https://api.sh/leetcode-api) describes paid per-call usage and public-data-only access. This is not a LeetCode API and is not endorsed by LeetCode. Verify provider terms, data provenance, retention, service-level commitments, pricing and permission before use. A vendor's statement that it is compliant is not a substitute for platform authorization. |
| **Other community wrappers / aggregators** | 🔵 Third-party | May normalize data from several platforms | No additional multi-platform provider is approved by this research. Evaluate each named provider separately; do not add a provider simply because it advertises broad coverage. |

### D. Platforms where a supported public profile API was not verified

| Platform | Research result | Recommended documentation status |
|---|---|---|
| **SPOJ** | No supported public API documentation for general user profile/submission analytics was verified. The website exposes a user's submission history in the signed-in profile, but that does not establish API permission. | `API_UNVERIFIED`; do not scrape without written permission. |
| **Kattis** | No general public API for arbitrary users' practice history/rating analytics was verified in this review. Contest-system integrations may exist in specific institutional contexts. | `API_UNVERIFIED`; investigate only with a specific Kattis instance/operator. |
| **CSES Problem Set** | No supported public user analytics/submission-history API was verified. | `API_UNVERIFIED`; do not infer an API from the website's functionality. |

### E. Contest-calendar-only sources (not user-profile APIs)

| Source | Classification | What it can provide | Suitability & Integration Model |
|---|---|---|---|
| **CLIST.by API** | 🟢 Official Aggregator API (`clist.by/api/v4/`) | Real-time and upcoming contests across **50+ platforms** (Codeforces, LeetCode, AtCoder, CodeChef, HackerRank, Topcoder, etc.) | **Primary Contest Engine**: Provides an official, documented REST API with query filters (`upcoming=true`, `order_by=start`). Replaces fragile per-platform scrapers with a single unified aggregator. |
| **DOMjudge / ICPC Contest API** | 🟢 Official contest-system API | Contest-scoped problems, teams, submissions, standings and judging events where the operator exposes the API | Requires a known contest installation and appropriate access; best for collegiate/ICPC event tracking. |
| **AtCoder Problems datasets** | 🔵 Third-party | AtCoder contest/problem metadata | Community-maintained and subject to API changes. |

> **Contest Architecture Decision:** CLIST.by serves as the primary contest ingestion service via a scheduled cron job (every 6 hours) into CodeONE's `contests` database table, eliminating the need to scrape individual platform contest pages.

### Platform integration fit for CodeONE

| Priority | Platform | Why |
|---|---|---|
| **P1 – Best documented profile-data fit** | Codeforces | Official public API exposes profile, submissions, ratings, contests and problem metadata. |
| **P2 – Candidate with explicit caveats** | Codewars, Aizu Online Judge, DMOJ instances, AtCoder via AtCoder Problems | Useful data exists, but maintenance, instance scope or third-party dependency must be handled. |
| **P3 – Permission / enterprise dependent** | HackerRank, HackerEarth, CodeSignal, Topcoder, NowCoder, DOMjudge | Official APIs exist, but their purpose/access model does not automatically match public student analytics. |
| **P4 – Do not rely on without written approval** | LeetCode, CodeChef, Luogu, HackerRank scrapers | Undocumented endpoints, scraping restrictions or uncertain permission create material risk. |
| **Unverified** | SPOJ, Kattis, CSES | No supported public user-analytics API verified in this review. |

### Permanent API Integration Policy

1. Prefer platform-operated, documented official APIs.
2. Confirm the exact intended data fields and whether the API is available to ordinary users, enterprise customers, contest administrators or only the platform itself.
3. Review the current Terms of Service, API terms, privacy policy, licensing, rate limits, attribution requirements and commercial-use conditions before approval.
4. Do not scrape, crawl, spider, reverse engineer, bypass authentication, defeat CAPTCHAs, evade rate limits or access controls, or collect another user's credentials.
5. Do not request or store external platform passwords or session cookies. Prefer public usernames, user-authorized OAuth, or platform-approved verification methods.
6. Treat unofficial endpoints as unstable. Require a documented risk acceptance, explicit permission assessment, isolated adapter, monitoring and a fallback state.
7. Treat third-party providers as separate vendors. Review provider reputation, data provenance, privacy, retention, pricing, rate limits, uptime commitments, dependency concentration and exit strategy.
8. Do not call a connector “full integration” unless all advertised fields have been implemented, tested and validated against the platform's permitted access model.
9. Show per-platform sync timestamps and clear states such as `connected`, `partial data`, `rate limited`, `source unavailable`, and `reauthorization required`.
10. Keep an API Integration Registry with: platform, provider, API classification, official documentation, permitted data fields, authentication model, rate limits, ToS review status, data limitations, risk rating, fallback, owner and last verification date.
11. Re-check documentation and terms before each release and after provider/API change notices. A research snapshot is not a permanent guarantee.
12. If permission is unclear, classify the connector as `NOT APPROVED` rather than assuming that public accessibility means permission.

### Research and legal-status disclaimer

This is technical due diligence, not legal advice or a legal opinion. The research verified the existence and documented purpose of the sources linked above; it did **not** obtain written permission from platform operators, test every endpoint under production conditions, or certify that any particular use is lawful in every jurisdiction. LeetCode and CodeChef terms contain explicit restrictions relevant to scraping; other platforms still require their own current terms and permission review. Re-check official policies before implementation or public deployment.

**Verification date:** 6 November 2026. **Verification level:** documentation/source review, not a live integration test. **Implementation status:** not verified / not implemented in this README.

---

## 🚀 Why CodeONE?

### The Problem

Competitive programmers face:

- ❌ **Fragmented tracking** — Switching between 5+ platform dashboards
- ❌ **No unified analytics** — Can't see overall progress
- ❌ **Streak blindness** — Miss activity on one platform, lose motivation
- ❌ **Pattern ignorance** — Don't know which topics to focus on
- ❌ **Contest chaos** — Forget important competitions

### The Solution

CodeONE acts as a **performance intelligence layer** on top of existing platforms:

- ✅ **Single dashboard** for all platforms
- ✅ **Global streak tracking** across all submissions
- ✅ **Smart analytics** showing strengths and weaknesses
- ✅ **Centralized contest calendar** with reminders
- ✅ **Historical trends** to measure real progress

> It's not just a tracker. It's a **consistency engine**.

---

## 🌐 Live Demo

> 🚧 **Demo coming soon** — the hosted instance is not yet live. Run locally using the installation steps below.

<!-- 🔗 **https://codeone-demo.vercel.app** — will be enabled once deployed -->

> No demo credentials are published because a working seeded account and authentication flow have not been verified. Add demo credentials only after they have been created, tested, and confirmed safe for public documentation.

---

## 📸 Screenshots

> 📌 **Note:** Screenshots are committed under `./screenshots/`. If images appear broken after a fresh clone, ensure you have pulled the latest `main` branch. To update screenshots after UI changes, replace the files in `screenshots/` and open a PR.

> 📌 **Note:** UI components and interactive views are currently in active design. High-fidelity wireframes are catalogued in `docs/wireframes/`. Once the frontend MVP is built in Phase 1, verified UI captures will be committed under `./screenshots/`.

| Planned View | Primary Content | Target Component |
|--------------|-----------------|------------------|
| **🎯 Dashboard Overview** | Cross-platform solve counters, rank overview, recent submissions | `Dashboard.jsx`, `StatsCard.jsx` |
| **🔥 Streak Analytics** | 365-day SVG activity heatmap, consistency scoring, current & max streaks | `StreakHeatmap.jsx` |
| **📚 Problems Management** | Multi-platform filterable table with status tags and personal notes | `ProblemList.jsx`, `ProblemFilter.jsx` |
| **🏆 Contest Calendar** | Unified countdown timers, registration links, time-zone adjusted dates | `Contests.jsx` |

---

## 🔥 Core Features

> The following list describes the proposed feature scope. It must not be read as a statement that these features are already implemented.

### 📊 Unified Analytics Dashboard

- **Daily activity heatmap** — GitHub-style contribution graph
- **Global streak tracker** — Combined streak across platforms
- **Platform comparison** — Side-by-side performance metrics
- **Difficulty distribution** — Easy/Medium/Hard breakdown
- **Submission trends** — Problems solved over time
- **Topic mastery** — Array, DP, Graph, etc. proficiency

### 🧠 Smart Problem Management

- **Multi-platform search** — Find problems across all sites
- **Advanced filtering** — By platform, tags, difficulty, status
- **Status tracking** — Solved / In Progress / Review Later / Todo
- **Topic categorization** — 20+ programming topics
- **Bookmark system** — Save important problems
- **Notes feature** — Add personal notes to problems

### 🔥 Streak Intelligence

- **Current streak** — Days of continuous activity
- **Longest streak** — Personal best record
- **Streak breakdown** — Per-platform streak analysis
- **Year-long heatmap** — Visual contribution calendar
- **Streak predictions** — AI-powered consistency alerts
- **Recovery mode** — Grace period for maintained streaks

### 🏆 Contest Intelligence

- **Unified calendar** — All contests in one place
- **Smart countdown** — Real-time timers
- **Direct links** — One-click registration
- **Past contest analysis** — Performance tracking
- **Rating graphs** — Codeforces, AtCoder, CodeChef ratings
- **Contest reminders** — Email/Push notifications

### ⚙ Advanced Profile Management

- **Multi-platform linking** — Connect all coding accounts via public handles
- **Manual Data Import Fallback** — Upload official JSON exports (LeetCode / HackerRank) for zero-risk, private sync
- **Goal tracking** — Daily/Weekly/Monthly targets
- **Progress reports** — Weekly email summaries
- **Notification preferences** — Customizable alerts
- **Privacy controls** — Public/Private profile options
- **Export data** — Download all your analytics (JSON/CSV)
- **Dark mode** — Eye-friendly interface

### 📈 Analytics & Insights

- **Time-based analysis** — Daily/Weekly/Monthly views
- **Difficulty progression** — Track skill improvement
- **Topic weakness detection** — AI-powered recommendations
- **Consistency score** — Gamified activity metric
- **Comparison mode** — Compare with friends or global averages
- **Custom date ranges** — Flexible reporting periods

---

## 🛠 Tech Stack

> **Proposed technology stack:** These choices are documented as the intended architecture; the actual repository dependencies and versions were not inspected during this review.

### Frontend

| Technology | Purpose |
|------------|---------|
| ⚛ **React.js 18** | Component-based UI framework |
| ⚡ **Vite** | Lightning-fast build tool |
| 🎨 **Tailwind CSS** | Utility-first styling |
| 📊 **Recharts** | Data visualization |
| 🔄 **Axios** | HTTP client |
| 🧭 **React Router** | Client-side routing |
| 🎣 **React Query** | Server state management |
| 📝 **React Hook Form** | Form validation |

### Backend

| Technology | Purpose |
|------------|---------|
| 🟢 **Node.js 18** | JavaScript runtime |
| 🚀 **Express.js** | Web framework |
| 🔧 **TypeScript** | Type safety (optional) |
| 🎯 **Joi** | Request validation |
| 🔐 **bcrypt** | Password hashing |
| 🎫 **jsonwebtoken** | JWT authentication |
| 📧 **Nodemailer** | Email service |

### Database & Cache

| Technology | Purpose |
|------------|---------|
| 🐘 **PostgreSQL 15** | Primary database |
| ⚡ **Redis 7** | Caching & streak computation |
| 🔍 **Prisma** | ORM layer |

### DevOps & Tools

| Technology | Purpose |
|------------|---------|
| 🐳 **Docker** | Containerization |
| 🔄 **GitHub Actions** | CI/CD pipeline |
| 📊 **Prometheus** | Metrics collection |
| 📈 **Grafana** | Monitoring dashboards |
| 🔒 **Let's Encrypt** | SSL certificates |

---

## 🏗 Architecture

**Proposed Architecture Type:** Modular Monolith (API-First Design). This is a design proposal; the repository and running application were not available for verification.

### 🔷 High-Level Architecture

```mermaid
flowchart LR
    A[React Client] --> B[Nginx Load Balancer]
    B --> C[Express API Layer]
    C --> D[Auth Module]
    C --> E[Analytics Engine]
    C --> F[Contest Aggregator]
    C --> G[Sync Service]
    D --> H[(PostgreSQL)]
    E --> H
    E --> I[(Redis Cache)]
    F --> H
    G --> J[External APIs]
    J --> K[Approved Official APIs]
    J --> L[Approved Third-Party Providers]
    J --> M[User-authorized / permitted sources]
```

### 🔹 Backend Module Breakdown

```mermaid
flowchart TB
    API[API Gateway]
    API --> Routes[Route Handlers]
    API --> MW[Middleware Layer]
    Routes --> Controllers[Controllers]
    Controllers --> Services[Business Logic Services]
    Services --> Models[Database Models]
    Services --> Cache[Redis Cache]
    Services --> External[External API Clients]
    MW --> Auth[Authentication]
    MW --> Validation[Input Validation]
    MW --> RateLimit[Rate Limiting]
    MW --> Logger[Request Logger]
```

### 📐 Request Flow Example

```text
1. User makes request → POST /api/problems/sync
2. Nginx forwards to Express
3. JWT Authentication Middleware validates token
4. Rate Limiting Middleware checks request quota
5. Validation Middleware validates request body
6. Controller extracts user info
7. Service layer:
   - Calls external platform APIs
   - Processes problem data
   - Updates PostgreSQL
   - Invalidates Redis cache
8. Response sent back to client
9. Logger records request metrics
```

---

## 🔐 Authentication

### Supported Methods

1. **Email/Password** — Traditional authentication with bcrypt
2. **Google OAuth 2.0** — Sign in with Google
3. **GitHub OAuth** — Sign in with GitHub

### JWT Token Structure

```json
{
  "userId": "uuid-v4",
  "email": "user@example.com",
  "role": "user",
  "iat": 1673481600,
  "exp": 1673482500
}
```

*(Payload expiration set to 900 seconds = 15 minutes)*

### Token Expiration & Cookie Architecture

- **Access Token:** 15 minutes (in-memory / Authorization Bearer header, never stored in localStorage)
- **Refresh Token:** 7 days (stored strictly in `HttpOnly`, `Secure`, `SameSite=Strict` cookie)
- **Refresh Token Rotation (RTR):** Every refresh invalidates the used refresh token and issues a new pair
- **Automatic Token Reuse Detection:** If an already-used or revoked refresh token is presented, all active tokens for that user session family are revoked immediately

> These are recommended design settings, not a claim that the current application already implements them.

### Security Features

- Password hashing with Argon2id preferred; bcrypt is an acceptable fallback when configured with a current, benchmarked work factor
- JWT token expiration enforcement
- Refresh token rotation
- Rate limiting on auth endpoints (5 requests/minute)
- Account lockout after 5 failed login attempts

---

## 🗄 Database Schema

> **Proposed schema:** This ER diagram is a design reference, not a verified database migration or deployed schema.

### 🔷 Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ PLATFORM_ACCOUNTS : "has"
    USERS ||--o{ USER_PROBLEMS : "tracks"
    USERS ||--o{ GOALS : "sets"
    USERS ||--o{ NOTIFICATIONS : "receives"
    PROBLEMS ||--o{ USER_PROBLEMS : "solved_by"
    PROBLEMS }o--o{ TAGS : "tagged_with"
    CONTESTS ||--o{ USER_CONTESTS : "participated"
    USERS ||--o{ USER_CONTESTS : "participates"
    
    USERS {
        uuid id PK
        string name
        string email UK
        string password_hash
        string avatar_url
        boolean email_verified
        timestamp created_at
        timestamp last_login
    }
    
    PLATFORM_ACCOUNTS {
        uuid id PK
        uuid user_id FK
        string platform_name
        string username
        integer rating
        string rank
        timestamp last_synced
        boolean is_active
    }
    
    PROBLEMS {
        uuid id PK
        string platform
        string problem_id UK
        string title
        string difficulty
        string url
        integer acceptance_rate
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
        integer duration
        string url
    }
```

### 📊 Core Tables

#### 👤 Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT,
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    settings JSONB DEFAULT '{}'
);

CREATE INDEX idx_users_email ON users(email);
```

#### 🔗 Platform Accounts Table

```sql
CREATE TABLE platform_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform_name VARCHAR(50) NOT NULL,
    username VARCHAR(100) NOT NULL,
    rating INTEGER,
    rank VARCHAR(50),
    last_synced TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    sync_frequency INTEGER DEFAULT 3600,
    UNIQUE(user_id, platform_name)
);

CREATE INDEX idx_platform_accounts_user ON platform_accounts(user_id);
CREATE INDEX idx_platform_accounts_platform ON platform_accounts(platform_name);
```

#### 📘 Problems Table

```sql
CREATE TABLE problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(50) NOT NULL,
    problem_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    url TEXT NOT NULL,
    acceptance_rate INTEGER,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(platform, problem_id)
);

CREATE INDEX idx_problems_platform ON problems(platform);
CREATE INDEX idx_problems_difficulty ON problems(difficulty);
```

#### 📊 User Problems Table

```sql
CREATE TABLE user_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('solved', 'in_progress', 'review_later', 'todo')),
    attempts INTEGER DEFAULT 1,
    solved_at TIMESTAMP,
    notes TEXT,
    UNIQUE(user_id, problem_id)
);

CREATE INDEX idx_user_problems_user ON user_problems(user_id);
CREATE INDEX idx_user_problems_status ON user_problems(status);
CREATE INDEX idx_user_problems_solved_at ON user_problems(solved_at);
```

#### 🏷️ Tags Table (Many-to-Many with Problems)

```sql
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
```

#### 🛡️ Refresh Tokens Table (Session & Rotation Tracking)

```sql
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    family_id UUID NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    replaced_by UUID
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_family ON refresh_tokens(family_id);
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens(token_hash);
```

#### 🧾 Security Audit Logs Table (Append-Only)

```sql
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

---

## 🔌 API Documentation

> **Documentation examples only:** The endpoints and JSON payloads below describe a proposed API contract. They have not been confirmed against a running CodeONE server.

### Base URL

```text
Development: http://localhost:5000/api
Production: Not configured / not verified
```

### 🔐 Authentication Endpoints

#### Register New User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Illustrative response only — this endpoint and response contract are not verified as implemented.**

**Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar_url": null,
      "created_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Illustrative response only — this endpoint and response contract are not verified as implemented.**

**Response (200 OK):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "platformAccounts": [
      {
        "platform": "leetcode",
        "username": "john_doe",
        "rating": 1850
      }
    ]
  }
}
```

---

### 📊 Analytics Endpoints

#### Get Dashboard Summary

```http
GET /api/analytics/dashboard
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalSolved": 342,
    "currentStreak": 25,
    "longestStreak": 60,
    "lastSolvedAt": "2024-01-15T18:30:00Z",
    "difficultyBreakdown": {
      "easy": 120,
      "medium": 170,
      "hard": 52
    },
    "platformBreakdown": {
      "leetcode": 200,
      "codeforces": 85,
      "hackerrank": 57
    },
    "weeklyProgress": [
      { "date": "2024-01-08", "count": 5 },
      { "date": "2024-01-09", "count": 3 },
      { "date": "2024-01-10", "count": 7 },
      { "date": "2024-01-11", "count": 4 },
      { "date": "2024-01-12", "count": 6 },
      { "date": "2024-01-13", "count": 2 },
      { "date": "2024-01-14", "count": 5 }
    ]
  }
}
```

#### Get Streak Data

```http
GET /api/analytics/streaks
Authorization: Bearer {token}
Query Parameters:
  - year: 2024 (optional, defaults to current year)
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "currentStreak": 25,
    "longestStreak": 60,
    "totalDaysActive": 180,
    "heatmap": [
      { "date": "2024-01-01", "count": 3 },
      { "date": "2024-01-02", "count": 5 },
      { "date": "2024-01-03", "count": 0 },
      ...
    ]
  }
}
```

#### Get Platform-Specific Analytics

```http
GET /api/analytics/platform/:platformName
Authorization: Bearer {token}
Path Parameters:
  - platformName: leetcode|codeforces|hackerrank|atcoder|codechef
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "platform": "leetcode",
    "username": "john_doe",
    "totalSolved": 200,
    "rating": 1850,
    "rank": "Knight",
    "difficultyBreakdown": {
      "easy": 80,
      "medium": 90,
      "hard": 30
    },
    "recentSubmissions": [
      {
        "problemTitle": "Two Sum",
        "difficulty": "easy",
        "status": "accepted",
        "submittedAt": "2024-01-15T18:30:00Z"
      }
    ]
  }
}
```

---

### 📚 Problem Management Endpoints

#### Get All Problems

```http
GET /api/problems
Authorization: Bearer {token}
Query Parameters:
  - platform: leetcode|codeforces|etc (optional)
  - difficulty: easy|medium|hard (optional)
  - status: solved|in_progress|review_later|todo (optional)
  - tags: array,dp,graph (comma-separated, optional)
  - page: 1 (default: 1)
  - limit: 20 (default: 20, max: 100)
  - search: "two sum" (optional)
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "id": "uuid",
        "platform": "leetcode",
        "title": "Two Sum",
        "difficulty": "easy",
        "url": "https://leetcode.com/problems/two-sum",
        "status": "solved",
        "solvedAt": "2024-01-15T18:30:00Z",
        "tags": ["array", "hash-table"],
        "notes": "Classic problem, remember the hash map approach"
      }
    ],
    "pagination": {
      "total": 342,
      "page": 1,
      "limit": 20,
      "totalPages": 18
    }
  }
}
```

#### Update Problem Status

```http
PATCH /api/problems/:problemId
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "solved",
  "notes": "Used dynamic programming approach"
}
```

---

### 🏆 Contest Endpoints

#### Get Upcoming Contests

```http
GET /api/contests/upcoming
Authorization: Bearer {token}
Query Parameters:
  - platform: leetcode|codeforces|etc (optional)
  - limit: 10 (default: 10)
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "platform": "codeforces",
      "name": "Codeforces Round #912 (Div. 2)",
      "startTime": "2024-01-20T14:35:00Z",
      "duration": 7200,
      "url": "https://codeforces.com/contest/1912",
      "registrationUrl": "https://codeforces.com/contestRegistration/1912"
    }
  ]
}
```

---

### ⚙ User Settings Endpoints

#### Update Profile

```http
PATCH /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Smith",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

#### Link Platform Account

```http
POST /api/user/platforms
Authorization: Bearer {token}
Content-Type: application/json

{
  "platform": "leetcode",
  "username": "john_doe"
}
```

#### Get All Linked Platforms

```http
GET /api/user/platforms
Authorization: Bearer {token}
```

---

### 🎯 Goals Endpoints

#### Create Goal

```http
POST /api/goals
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "daily",
  "target": 5,
  "startDate": "2024-01-15",
  "endDate": "2024-01-21"
}
```

#### Get Active Goals

```http
GET /api/goals/active
Authorization: Bearer {token}
```

---

### 📤 Sync Endpoints

#### Sync All Platforms

```http
POST /api/sync/all
Authorization: Bearer {token}
```

#### Sync Specific Platform

```http
POST /api/sync/:platform
Authorization: Bearer {token}
```

---

### Error Responses

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

**Common Error Codes:**

- `VALIDATION_ERROR` — Invalid request data
- `AUTHENTICATION_ERROR` — Invalid or expired token
- `AUTHORIZATION_ERROR` — Insufficient permissions
- `NOT_FOUND` — Resource not found
- `RATE_LIMIT_EXCEEDED` — Too many requests
- `INTERNAL_ERROR` — Server error

---

## 🔐 Security & Privacy

CodeONE is designed to protect user-specific coding analytics, private notes, goals, linked platform accounts, and administrative actions. Security controls must be enforced by the backend; hiding frontend controls is not authorization.

> **Implementation status:** This section documents the security design and implementation targets. Do not describe a control as production-ready until it is implemented, configured, and covered by tests.

### 🛡️ Role-Based Access Control (RBAC)

CodeONE uses a default-deny permission model with four application roles:

| Role | Intended permissions |
|------|----------------------|
| **User** | View and manage their own problems, notes, goals, linked accounts, and privacy settings. |
| **Moderator** | Handle reports and approved community-moderation actions; no automatic access to private analytics or credentials. |
| **Admin** | Manage users, roles, and system configuration through audited administrative endpoints. |
| **Auditor** | Read security audit events and investigate activity; cannot change user data or audit records through the application. |

- Authenticate the request and load the user's current role/permissions on the server.
- Enforce authorization in middleware and again in service/data-access operations where appropriate.
- Never trust a role, user ID, or permission supplied by the client.
- Return `403 Forbidden` for authenticated users who lack permission and `401 Unauthorized` when authentication is missing or invalid.
- Protect role changes as privileged actions and record them in the audit log.

### 🔒 Object-Level Authorization & IDOR Protection

Every endpoint that reads or modifies a user-owned resource must verify ownership or an explicit permission before returning or changing it.

Examples include `/api/problems/:problemId`, private notes, goals, profile settings, linked coding accounts, exports, and analytics endpoints.

- Scope database queries to the authenticated user wherever possible (for example, query by both resource ID and `user_id`).
- Do not assume that an unpredictable UUID or a hidden frontend link prevents unauthorized access.
- Test attempts to replace IDs in URLs, query strings, and request bodies with another user's resource IDs.
- Use consistent error responses that do not leak whether another user's private record exists.

### 👁️ Privacy Controls & Data Minimization

- Keep private notes, goals, account settings, and personal analytics visible only to their owner and specifically authorized roles.
- Support public/private profile settings and expose only fields explicitly approved for public display.
- Mask email addresses and other personal information in administrative views when full values are not required.
- Never expose password hashes, access tokens, refresh tokens, OAuth secrets, or internal security metadata in API responses or logs.
- Store coding-platform usernames where possible instead of platform passwords; do not request external platform passwords.
- Validate ownership and permissions before generating data exports.

### 🧾 Append-Only, Tamper-Evident Audit Logging

Record security-sensitive events such as successful and failed logins, access-denied events, role changes, account linking/unlinking, private-data access, exports, and administrative changes.

Recommended event fields:

```text
id, occurred_at, actor_user_id, actor_role, action,
resource_type, resource_id, outcome, request_id, source_ip
```

- Do not log passwords, bearer tokens, refresh tokens, or unnecessary personal data.
- Give the application role permission to insert audit events and read only the records required by its workflows; do not grant routine application code permission to update or delete audit rows.
- Add database triggers or a separate restricted logging service where appropriate, and use hash chaining or external protected storage to make tampering detectable.
- Restrict audit-log access to authorized auditors and administrators, and audit access to the logs themselves.
- Note: database owners and infrastructure administrators may still be able to alter data. “Immutable” should only be claimed when the chosen controls and threat model support that claim.

### ⏱️ Secure Sessions & Token Lifecycle

- Use short-lived access tokens (for example, 15 minutes) and rotate refresh tokens on every successful refresh.
- Store refresh tokens in `HttpOnly`, `Secure`, appropriately configured `SameSite` cookies when using cookie-based sessions; keep signing secrets server-side.
- Store refresh-token hashes or session identifiers server-side so sessions can be revoked on logout, password reset, suspicious activity, or account disablement.
- Detect refresh-token reuse and revoke the affected token family/session.
- Enforce configurable idle and absolute session timeouts on the server. A five-minute idle timeout may be offered as a strict option, but choose a usability-appropriate default.
- Apply CSRF protection when cookie-based authentication requires it, and use HTTPS in production.

### 🚦 API & Application Hardening

- Rate-limit login, registration, password-reset, refresh, sync, and export endpoints.
- Validate request bodies, query parameters, and path parameters with a schema-validation library such as Joi.
- Use parameterized database access through Prisma; never concatenate untrusted input into SQL.
- Configure CORS with an explicit allowlist, security headers, safe error responses, and request-size limits.
- Use secure password hashing (bcrypt or Argon2) and never store plaintext passwords.
- Keep secrets in deployment environment/secret-management systems; never commit real secrets or production credentials.
- Protect administrative and high-impact actions with re-authentication or additional verification when appropriate.
- Apply least-privilege database roles and maintain tested backups and a security-incident response process.

### 🧪 Security Verification Checklist

Before calling the security layer complete, add automated tests that verify:

- [ ] A regular user cannot call admin/moderator endpoints directly.
- [ ] User A cannot read, edit, or export User B's private resources by changing an ID.
- [ ] A user cannot promote their own role by editing a request body.
- [ ] Expired, revoked, and reused refresh tokens are rejected.
- [ ] Rate limits are enforced on authentication and sensitive endpoints.
- [ ] Private fields and tokens never appear in API responses or logs.
- [ ] Audit events are written for privileged and sensitive actions.
- [ ] The application database role cannot update or delete audit records.
- [ ] Auditor access is read-only and all audit-log access is itself recorded.

## ⚡ Performance

### Optimization Strategies

#### Backend Optimizations

- **Redis caching** for frequently accessed data (planned; cache hit rate not measured)
- **Database indexing** on all foreign keys and query fields
- **Connection pooling** (PostgreSQL: max 20 connections)
- **Query optimization** with EXPLAIN ANALYZE
- **API response compression** with gzip

#### Frontend Optimizations

- **Code splitting** with React.lazy()
- **Lazy loading** for images and components
- **Memoization** with React.memo and useMemo
- **Debouncing** for search inputs
- **Virtual scrolling** for large lists

#### Caching Strategy

| Data Type | Cache Duration | Storage |
|-----------|---------------|---------|
| User profile | 1 hour | Redis |
| Dashboard stats | 15 minutes | Redis |
| Problem list | 6 hours | Redis |
| Contest data | 30 minutes | Redis |
| Streak data | 5 minutes | Redis |

### Performance Metrics

No production deployment, reproducible benchmark report, or monitoring evidence was supplied for this documentation review. Therefore, no current response-time, page-load, database-latency, cache-hit-rate, throughput, or uptime figures are claimed.

| Metric | Target / measurement plan | Current verified value |
|--------|----------------------------|------------------------|
| API response time | Establish p50/p95/p99 under a documented load test | Not measured |
| Page load / Core Web Vitals | Measure on representative devices and network conditions | Not measured |
| Database query time | Profile representative queries with `EXPLAIN ANALYZE` | Not measured |
| Cache hit rate | Measure from production/staging cache telemetry | Not measured |
| Uptime | Calculate from monitored deployment history | Not measured |

Only publish measured values with the test date, environment, workload, sample size and measurement method.

---

## 🧪 Testing

### Test Coverage

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run specific test suite
npm test -- --testPathPattern=auth

# Run in watch mode
npm test -- --watch
```

### Test Structure

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

### Example Test

```javascript
// tests/integration/api/auth.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'SecurePass123!'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });

  it('should reject duplicate email', async () => {
    // First registration
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'SecurePass123!'
      });

    // Duplicate registration
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User 2',
        email: 'test@example.com',
        password: 'AnotherPass123!'
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('DUPLICATE_EMAIL');
  });
});
```

---

## 📋 Prerequisites

> These setup instructions are a proposed developer guide. Validate package scripts, environment variables and services against the actual repository before treating them as executable instructions.

Before you begin, ensure you have the following installed:

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **npm** | 9+ | Package manager |
| **PostgreSQL** | 15+ | Primary database |
| **Redis** | 7+ | Caching layer |
| **Git** | Latest | Version control |

### Optional Tools

- **Docker** — For containerized deployment
- **Postman** — For API testing
- **pgAdmin** — For database management

### Check Installation

```bash
node --version    # Should be v18+
npm --version     # Should be 9+
psql --version    # Should be 15+
redis-cli --version  # Should be 7+
```

---

## ⚙ Installation & Setup

### 🔹 Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/codeone.git
cd codeone
```

### 🔹 Step 2: Install Dependencies

#### Backend Setup

```bash
cd server
npm install
```

#### Frontend Setup

```bash
cd ../client
npm install
```

### 🔹 Step 3: Configure PostgreSQL

```bash
# Create database
createdb codeone

# Or using psql
psql -U postgres
CREATE DATABASE codeone;
\q
```

### 🔹 Step 4: Configure Redis

```bash
# Start Redis (if not running)
redis-server

# Test connection
redis-cli ping
# Should return: PONG
```

### 🔹 Step 5: Set Up Environment Variables

```bash
# Copy example env files
cd server
cp .env.example .env

cd ../client
cp .env.example .env
```

Edit the `.env` files with your configuration (see [Environment Variables](#-environment-variables) section).

### 🔹 Step 6: Run Database Migrations

```bash
cd server
npx prisma migrate dev
```

### 🔹 Step 7: Seed Database (Optional)

```bash
npm run seed
```

### 🔹 Step 8: Start Development Servers

#### Terminal 1 — Backend

```bash
cd server
npm run dev
```

Server will start on **http://localhost:5000**

#### Terminal 2 — Frontend

```bash
cd client
npm run dev
```

Client will start on **http://localhost:5173**

### ✅ Verify Installation

Visit **http://localhost:5173** in your browser. You should see the CodeONE landing page.

---

## 🌍 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/codeone
DB_HOST=localhost
DB_PORT=5432
DB_NAME=codeone
DB_USER=your_username
DB_PASSWORD=your_password

# Redis
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Authentication & Cookie Storage
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_token_secret_here
JWT_REFRESH_EXPIRES_IN=7d
COOKIE_SECRET=your_cookie_encryption_secret_min_32_chars

# Contest Aggregator (CLIST.by)
CLIST_API_KEY=your_clist_api_key_here
CLIST_USERNAME=your_clist_username

# OAuth - Google
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# OAuth - GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

# Email Service (for password reset, notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_FROM=noreply@codeone.app

# External API Keys (for platform sync)
LEETCODE_API_KEY=optional_if_available
CODEFORCES_API_KEY=optional
HACKERRANK_API_KEY=optional

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug

# File Upload (if implementing)
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000

# OAuth URLs
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
VITE_GITHUB_CLIENT_ID=your_github_client_id

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true

# Analytics (optional)
VITE_GA_TRACKING_ID=UA-XXXXX-X
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Production Environment

For production, use strong secrets and secure values:

```bash
# Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📁 Project Structure

```text
codeone/
├── client/                      # Frontend React application
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/          # Generic components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Modal.jsx
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── dashboard/       # Dashboard-specific
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   ├── StreakHeatmap.jsx
│   │   │   │   └── ProgressChart.jsx
│   │   │   └── problems/        # Problem management
│   │   │       ├── ProblemCard.jsx
│   │   │       ├── ProblemFilter.jsx
│   │   │       └── ProblemList.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Problems.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Contests.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useProblems.js
│   │   │   ├── useAnalytics.js
│   │   │   └── useDebounce.js
│   │   ├── services/            # API service layer
│   │   │   ├── api.js           # Axios configuration
│   │   │   ├── authService.js
│   │   │   ├── problemService.js
│   │   │   └── analyticsService.js
│   │   ├── context/             # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/               # Utility functions
│   │   │   ├── dateFormatter.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   ├── styles/              # Global styles
│   │   │   └── index.css
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                      # Backend Node.js application
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── problemController.js
│   │   │   ├── analyticsController.js
│   │   │   └── contestController.js
│   │   ├── routes/              # API routes
│   │   │   ├── index.js         # Route aggregator
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── problemRoutes.js
│   │   │   ├── analyticsRoutes.js
│   │   │   └── contestRoutes.js
│   │   ├── services/            # Business logic layer
│   │   │   ├── authService.js
│   │   │   ├── problemService.js
│   │   │   ├── analyticsService.js
│   │   │   ├── syncService.js   # External API sync
│   │   │   └── emailService.js
│   │   ├── middleware/          # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── validationMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── logger.js
│   │   ├── models/              # Database models
│   │   │   ├── index.js
│   │   │   ├── User.js
│   │   │   ├── PlatformAccount.js
│   │   │   ├── Problem.js
│   │   │   ├── UserProblem.js
│   │   │   ├── Contest.js
│   │   │   └── Goal.js
│   │   ├── config/              # Configuration
│   │   │   ├── database.js
│   │   │   ├── redis.js
│   │   │   ├── passport.js      # OAuth strategies
│   │   │   └── constants.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── jwt.js
│   │   │   ├── bcrypt.js
│   │   │   ├── validators.js
│   │   │   └── apiHelpers.js
│   │   ├── jobs/                # Background jobs
│   │   │   ├── syncScheduler.js
│   │   │   └── emailScheduler.js
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Server entry point
│   ├── prisma/                  # Prisma ORM Data Layer
│   │   ├── schema.prisma        # Prisma Data Schema & Models
│   │   └── migrations/          # Generated Prisma Migrations
│   ├── seeds/                   # Database seeders
│   │   └── sample_data.js
│   ├── tests/                   # Test files
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── .env.example
│   ├── package.json
│   └── jest.config.js
│
├── docker/                      # Docker configuration
│   ├── Dockerfile.client
│   ├── Dockerfile.server
│   └── nginx.conf
│
├── scripts/                     # Utility scripts
│   ├── setup.sh
│   ├── migrate.sh
│   └── deploy.sh
│
├── docs/                        # Additional documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── .github/                     # GitHub specific files
│   └── workflows/
│       ├── ci.yml               # CI pipeline
│       └── cd.yml               # CD pipeline
│
├── docker-compose.yml           # Docker compose config
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── LICENSE
└── README.md
```

---

## 🚀 Deployment

### 🐳 Docker Deployment

#### Build and Run with Docker Compose

```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### docker-compose.yml

```yaml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: codeone
      POSTGRES_USER: codeone_user
      POSTGRES_PASSWORD: secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./server
      dockerfile: ../docker/Dockerfile.server
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://codeone_user:secure_password@postgres:5432/codeone
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

---

### ☁ Cloud Deployment Options

#### Option 1: Vercel (Frontend) + Render (Backend)

**Frontend on Vercel:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel --prod
```

**Backend on Render:**

1. Connect GitHub repository
2. Select "Web Service"
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables

---

#### Option 2: AWS EC2 (Full Stack)

**1. Launch EC2 Instance**

- AMI: Ubuntu 22.04 LTS
- Instance type: t2.medium (for production)
- Security group: Open ports 80, 443, 22

**2. Connect and Setup**

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Redis
sudo apt install -y redis-server

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

**3. Clone and Setup Project**

```bash
git clone https://github.com/yourusername/codeone.git
cd codeone

# Backend setup
cd server
npm install
npm run build

# Frontend setup
cd ../client
npm install
npm run build
```

**4. Configure Nginx**

```nginx
# /etc/nginx/sites-available/codeone
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /home/ubuntu/codeone/client/dist;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/codeone /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**5. Start Backend with PM2**

```bash
cd /home/ubuntu/codeone/server
pm2 start npm --name "codeone-backend" -- start
pm2 save
pm2 startup
```

**6. Setup SSL with Let's Encrypt**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

#### Option 3: Heroku (Quick Deploy)

**Backend:**

```bash
# Login to Heroku
heroku login

# Create app
heroku create codeone-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Add Redis addon
heroku addons:create heroku-redis:mini

# Deploy
git push heroku main
```

**Frontend:**

Deploy to Vercel or Netlify as described above.

---

### 🔄 CI/CD Pipeline (GitHub Actions)

#### .github/workflows/deploy.yml

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd server && npm install
          cd ../client && npm install
      
      - name: Run tests
        run: |
          cd server && npm test
          cd ../client && npm test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Database Connection Error

**Error:** `could not connect to server: Connection refused`

**Solution:**

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Check connection
psql -U postgres -h localhost
```

---

#### 2. Redis Connection Error

**Error:** `Error: Redis connection to localhost:6379 failed`

**Solution:**

```bash
# Check if Redis is running
redis-cli ping

# Start Redis
redis-server

# Check config
redis-cli
CONFIG GET bind
```

---

#### 3. JWT Token Invalid

**Error:** `JsonWebTokenError: invalid signature`

**Solution:**

- Ensure `JWT_SECRET` in `.env` matches between deployments
- Clear browser cookies and local storage
- Generate a new strong secret if compromised

---

#### 4. CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**

```javascript
// server/src/app.js
const cors = require('cors');

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

---

#### 5. Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**

```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

---

#### 6. Build Errors

**Error:** `Module not found: Error: Can't resolve 'module-name'`

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf .next  # or dist/
npm run build
```

---

#### 7. Environment Variables Not Loading

**Solution:**

```bash
# Check .env file exists
ls -la .env

# Verify format (no spaces around =)
KEY=value  # ✓ Correct
KEY = value  # ✗ Wrong

# Restart server after changes
```

---

#### 8. OAuth Callback Errors

**Error:** `Error: redirect_uri_mismatch`

**Solution:**

- Verify callback URL in OAuth provider console matches exactly
- Include protocol (http/https)
- Check for trailing slashes
- Update `.env` with correct callback URL

---

## ❓ FAQ

### General Questions

**Q: Is CodeONE free to use?**  
A: Yes, CodeONE is completely free and open-source under the MIT license.

**Q: Which coding platforms are supported?**  
A: CodeONE is researching potential integrations. Codeforces has the clearest documented public profile/submission API. Other platforms have different limitations; see [Platform API Directory](#-platform-api-directory--integration-research). No platform connector is claimed as implemented or verified by this README.

**Q: Do I need to provide API keys for the platforms?**  
A: It depends on the platform and its approved access model. CodeONE must not assume that public pages may be scraped. Do not provide platform passwords or session cookies. Where an official API requires authorization, use only its documented and permitted authorization flow.

**Q: Will LeetCode integration work with a private profile?**  
A: No supported public official LeetCode API was verified. The internal GraphQL endpoint is undocumented, and LeetCode's Terms restrict scraping. CodeONE will not claim private-profile or submission-history support without explicit platform authorization.

**Q: How often does CodeONE sync my data?**  
A: A sync schedule has not been verified. Any future schedule must respect each provider's documented rate limits and terms.

---

### Technical Questions

**Q: What's the difference between this and LeetCode/Codeforces dashboards?**  
A: CodeONE aims to provide **unified analytics** across permitted platform integrations, with planned global streaks, weakness analysis, and contest aggregation.

**Q: How is my data stored?**  
A: PostgreSQL is the proposed primary database. Security controls and deployment are not verified in this documentation review. The design must never store external platform passwords; sensitive credentials, if any are explicitly required and permitted, must be minimized and protected.

**Q: Can I export my data?**  
A: Yes, you can export all your analytics data in JSON or CSV format from your profile settings.

**Q: Is there a mobile app?**  
A: Not yet, but it's on our roadmap! Currently, the web interface is mobile-responsive.

**Q: Can I use this for my team/company?**  
A: Absolutely! You can self-host CodeONE for your organization and customize it as needed.

---

### Development Questions

**Q: Can I contribute to CodeONE?**  
A: Yes! Check out our [Contributing](#-contributing) section for guidelines.

**Q: What's the tech stack?**  
A: React (Vite) + Node.js (Express) + PostgreSQL + Redis. See [Tech Stack](#-tech-stack) for details.

**Q: How do I report a bug?**  
A: Open an issue on our [GitHub repository](https://github.com/yourusername/codeone/issues) with detailed steps to reproduce.

**Q: Do you accept feature requests?**  
A: Absolutely! Create a feature request issue and we'll discuss it with the community.

---

## 📊 Design Decisions

### Why Modular Monolith?

**Pros:**

- Faster iteration in early stages
- Clear domain separation (Auth, Analytics, Sync)
- Reduced operational complexity
- Easy to split into microservices later

**Cons:**

- Scaling requires horizontal duplication
- Tight coupling if not careful

**Decision:** Start as monolith, design modules as independently as possible, migrate to microservices when traffic demands it.

---

### Why PostgreSQL over MongoDB?

**Reasons:**

- Strong relational integrity (users → problems → submissions)
- ACID compliance for critical operations
- JSON support (JSONB) when needed
- Mature ecosystem and tools
- Better for complex analytics queries

---

### Why Redis for Caching?

**Benefits:**

- Dramatically reduces database load
- Sub-millisecond response times
- Perfect for streak computation (sorted sets)
- Session management
- Rate limiting counters

**Use Cases:**

- Dashboard stats (15-min cache)
- User profiles (1-hour cache)
- Streak data (5-min cache)
- Contest listings (30-min cache)

---

### Why JWT over Sessions?

**Advantages:**

- Stateless authentication (scales horizontally)
- Works across multiple domains
- No server-side session storage needed
- Easy to implement OAuth

**Trade-offs:**

- Can't revoke tokens easily (solution: use short expiry + refresh tokens)
- Larger than session cookies (solution: keep payload minimal)

---

## 🤖 AI Vision

> 🚧 **These AI features are planned for Phase 3 and are not yet implemented.** The pseudocode below illustrates the intended design.

### Planned AI Features

#### 🎯 Personalized Problem Recommendations

```text
Algorithm:
1. Analyze user's solved problems
2. Identify weak topics (low success rate)
3. Find similar problems with progressive difficulty
4. Recommend 3-5 problems daily
```

#### 🧠 Weakness Detection

```text
Technique: Clustering + Frequency Analysis
- Group problems by tags
- Calculate success rate per tag
- Flag topics with <50% success rate
- Generate targeted practice plans
```

#### 📈 Performance Trend Estimate (Proposed)

```text
Method: Rating trend, moving averages, and (where suitable) an Elo-style estimate
Input: Available historical contest ratings and participation data
Output: A clearly labelled trend/estimate, not a guaranteed prediction
```

A per-user LSTM/Transformer model is not recommended for the initial project: individual contest histories are usually too small and sparse to support reliable sequence-model training. Any future predictive model would require a sufficiently large, representative dataset and out-of-sample evaluation.

#### 📚 AI Study Plan Generator

```text
Input:
- Current skill level
- Target achievement (e.g., "Reach Expert on CF")
- Available time per day
- Weak topics

Output:
- Personalized 30/60/90 day plan
- Daily problem recommendations
- Topic-wise milestones
```

---

## 🏆 Key Highlights

### What Makes CodeONE Special?

✨ **Unified Analytics Concept** — A single place to review data from permitted coding-platform sources  
🔥 **Streak Tracking** — Planned activity and consistency views based on available timestamps  
🧠 **Rule-based Insights** — Planned topic and difficulty analysis using collected data  
🎯 **Goal Management** — Planned daily and weekly targets  
🏆 **Contest Calendar** — Planned contest discovery from permitted sources  
🌙 **Responsive UI Direction** — Interface direction described in the project design  
🔒 **Privacy-aware Design** — Proposed data minimization and account ownership controls  
📌 **Transparent Project Status** — Proposed capabilities and implementation status are documented separately; implementation must be verified independently

---

## 🛣 Roadmap

### Phase 1: Foundation & Core Features 📅 (Planned / status not verified)

- [ ] Multi-platform account linking (only after platform ownership verification and API approval)
- [ ] Unified dashboard
- [ ] Streak tracking
- [ ] Problem management
- [ ] Contest calendar
- [ ] Authentication (JWT + OAuth)
- [ ] Security hardening: RBAC, IDOR protection, privacy controls, audit logging, and secure session lifecycle

### Phase 2: Enhanced Analytics 📅 (Planned / status not verified)

- [ ] Difficulty progression charts
- [ ] Topic mastery breakdown
- [ ] Weekly/Monthly reports
- [ ] Comparison with peers
- [ ] Performance predictions

### Phase 3: AI Integration 📅 (Planned)

- [ ] Personalized problem recommendations
- [ ] Weakness detection algorithm
- [ ] Study plan generator
- [ ] Contest performance predictor
- [ ] Chatbot assistant

### Phase 4: Social Features 📅 (Planned)

- [ ] Public profile pages
- [ ] Global leaderboard
- [ ] Friend system
- [ ] Study groups
- [ ] Discussion forums

### Phase 5: Mobile & Extensions 📅 (Planned)

- [ ] React Native mobile app (iOS/Android)
- [ ] Browser extensions (Chrome, Firefox)
- [ ] Desktop app (Electron)
- [ ] VS Code extension

### Phase 6: Advanced Features 📅 (Future)

- [ ] Code snippet manager
- [ ] Interview preparation mode
- [ ] Mock contest simulator
- [ ] Video solution integration
- [ ] Mentorship matching

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   Go to [github.com/ishendrarai/CodeONE](https://github.com/ishendrarai/CodeONE) and click **Fork**, then clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/CodeONE.git
   cd CodeONE
   git remote add upstream https://github.com/ishendrarai/CodeONE.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   **Commit Message Format:**

   ```text
   <type>: <description>

   Types: feat, fix, docs, style, refactor, test, chore
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Add screenshots for UI changes

---

### Contribution Guidelines

#### Code Style

- **JavaScript:** Use ES6+ syntax
- **React:** Functional components with hooks
- **Naming:** camelCase for variables, PascalCase for components
- **Comments:** Write clear comments for complex logic

#### Testing

- Write unit tests for new functions
- Add integration tests for API endpoints
- Ensure all tests pass before submitting PR

```bash
npm test
```

#### Documentation

- Update README if adding new features
- Add JSDoc comments for functions
- Update API documentation

---

### Good First Issues

Looking for where to start? Check out issues labeled:

- `good first issue`
- `help wanted`
- `documentation`

---

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report inappropriate behavior

---

## 👥 Contributors

Thanks to all contributors who have helped make CodeONE better! 🙏

<!-- ALL-CONTRIBUTORS-LIST:START -->

| Avatar | Contributor | Role |
|:------:|:-----------:|:----:|
| [![Ishedra Rai](https://github.com/ishendrarai.png?size=100)](https://github.com/ishendrari) | **Ishedra Rai** | Creator & Maintainer |

<!-- Add more contributors here -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Want to see your name here? [Contribute to CodeONE!](#-contributing)

---

## 🔎 API Research Sources & Verification Record

The platform matrix links to primary documentation wherever available. Community wrappers are linked only as examples of unofficial implementations, not as endorsements.

| Platform / provider | Primary reference | What was verified |
|---|---|---|
| Codeforces | [API introduction and methods](https://codeforces.com/apiHelp/) | Public JSON API, methods, authorization model and request limit |
| LeetCode | [Terms of Service](https://leetcode.com/terms/) | Restrictions on crawling/scraping; internal GraphQL is not documented as a public API |
| AtCoder Problems | [API and dataset docs](https://github.com/kenkoooo/AtCoderProblems/blob/main/doc/api.md) | Provider identifies API as unofficial, describes endpoints, pacing and deprecation warning |
| CodeChef | [Terms of Service](https://www.codechef.com/terms) | Prohibited-use wording includes spidering, crawling and scraping |
| HackerRank | [API overview](https://support.hackerrank.com/articles/2067417637-api-overview) | Enterprise API use cases, token model and rate guidance |
| Codewars | [API v1 reference](https://dev.codewars.com/) | Public profile/completed challenge endpoints and API maintenance caveat |
| HackerEarth | [API information](https://help.hackerearth.com/hc/en-us/articles/360002661854-how-do-i-use-hackerearth-s-api-) | API V4 code-evaluation use case |
| CodeSignal | [API overview](https://support.codesignal.com/hc/en-us/articles/18050947755031-CodeSignal-APIs) | Organization GraphQL API and webhooks, permission requirements |
| Aizu Online Judge | [API documentation](https://judge.u-aizu.ac.jp/onlinejudge/api.jsp) | XML user/problem/submission APIs and under-construction warning |
| DMOJ | [API routes in source](https://github.com/DMOJ/online-judge/blob/master/dmoj/urls.py) | API v2 route families in DMOJ software; instance-specific deployment |
| DOMjudge / ICPC | [DOMjudge REST API](https://www.domjudge.org/docs/manual/9.0/develop.html#api), [ICPC CCS API](https://ccs-specs.icpc.io/2026-01/contest_api) | Contest-system API and contest-scoped data model |
| NowCoder | [Open Platform API docs](https://docs.nowcoder.com/) | Enterprise OAuth/API key model and assessment workflows |
| Topcoder | [Submission API project](https://github.com/topcoder-archive/submissions-api) | Submission API project reference; current unrestricted public profile access not established |
| Luogu | [Community API notes](https://github.com/0f-0b/luogu-api-docs) | Community documentation only; not an official API contract |
| API.SH | [LeetCode API product page](https://api.sh/leetcode-api) | Third-party provider's advertised API and commercial pricing model |
| SPOJ | [SPOJ user tutorial](https://www.spoj.com/tutorials/USERS/) | User submission history exists in the website UI; no supported public analytics API was verified |

**Verification limitations:** This review did not perform authenticated API calls, load tests, legal review by counsel, or written-permission requests to platform operators. A documentation link is not proof of endpoint uptime, API SLA, commercial-use permission, or long-term support. Re-verify before development and record the verification date in the API Integration Registry.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

### Get in Touch

- **Email:** [ishurai.020805@email.com](mailto:ishurai.020805@email.com)
- **GitHub:** [@ishendrarai](https://github.com/ishendrarai)
- **Twitter:** [@ishendrarai02](https://X.com/ishendrarai02)
- **LinkedIn:** [Ishendra Rai](https://linkedin.com/in/ishendrarai)
- **Discord:** [Join our server](https://discord.gg/yourserver)

### Project Links

- **Live Demo:** <!-- https://codeone-demo.vercel.app (Pending deployment) -->
- **Repository:** https://github.com/ishendrarai/CodeONE
- **Documentation:** https://docs.codeone.app
- **Issue Tracker:** https://github.com/ishendrarai/CodeONE/issues
- **Roadmap:** https://github.com/ishendrarai/CodeONE/projects

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ishendrarai/CodeONE&type=Date)](https://star-history.com/#ishendrarai/CodeONE&Date)

---

## 🎯 Final Words

**CodeONE** was built out of personal frustration with fragmented progress tracking across multiple competitive programming platforms. The goal was simple: create **one dashboard to rule them all**.

Whether you're preparing for:

- 🎓 **Coding interviews** at FAANG companies
- 🏆 **Competitive programming contests**
- 📚 **Learning data structures & algorithms**
- 🚀 **Personal skill development**

CodeONE is here to help you stay consistent, track progress, and achieve mastery.

> **"Success is the sum of small efforts, repeated day in and day out."**  
> — Robert Collier

---

### Built for developers who don't just solve problems — they build mastery. 🚀

**Give us a ⭐ if CodeONE helps your coding journey!**

[Report Bug](https://github.com/ishendrarai/CodeONE/issues) · [Request Feature](https://github.com/ishendrarai/CodeONE/issues) · [Join Discord](https://discord.gg/yourserver)

---

*Made with ❤️ by the CodeONE Team*
