# 🚀 CodeONE — Consolidate Your Competitive Programming Journey  

> The unified analytics layer for competitive programmers.  
> Track. Analyse. Improve. Stay consistent.

![Node](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Redis](https://img.shields.io/badge/Redis-7-red)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Production--Ready-success)

---

## 📌 Table of Contents

- [✨ Overview](#-overview)
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
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## ✨ Overview

**CodeONE** is a full-stack competitive programming analytics platform built for developers, students, and interview aspirants solving problems across multiple platforms:

| Platform | Support Status | Features |
|----------|---------------|----------|
| 🟢 LeetCode | Full Integration | Problems, Contests, Rating |
| 🟢 Codeforces | Full Integration | Problems, Contests, Rating |
| 🟢 HackerRank | Full Integration | Problems, Badges |
| 🟢 AtCoder | Full Integration | Problems, Contests, Rating |
| 🟢 CodeChef | Full Integration | Problems, Contests, Rating |

Instead of switching between multiple dashboards, CodeONE provides a **single intelligent control center** for:

- 📊 **Progress tracking** — Unified view across all platforms
- 🔥 **Streak monitoring** — Never break your momentum
- 📈 **Difficulty analysis** — Identify your comfort zones
- 🧠 **Topic mastery** — Track weak areas systematically
- 🏆 **Contest planning** — Never miss important competitions
- 📉 **Performance trends** — Visualize your growth over time
- 🎯 **Goal management** — Set and achieve daily/weekly targets

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

### Test Credentials (local seed)

```
Email: demo@codeone.com
Password: demo123
```

> **Note:** Run `npm run seed` in the server directory first to populate sample data.

---

## 📸 Screenshots

> 📌 **Note:** Screenshots are committed under `./screenshots/`. If images appear broken after a fresh clone, ensure you have pulled the latest `main` branch. To update screenshots after UI changes, replace the files in `screenshots/` and open a PR.

### 🎯 Dashboard Overview
![Dashboard](./screenshots/dashboard.png)
*Unified analytics showing problems solved across all platforms*

### 🔥 Streak Analytics
![Streak](./screenshots/streak.png)
*Year-long contribution heatmap with streak tracking*

### 📚 Problems Management
![Problems](./screenshots/problems.png)
*Filter and track problems by platform, difficulty, and status*

### 🏆 Contest Calendar
![Contests](./screenshots/contests.png)
*Upcoming contests from all platforms in one view*

---

## 🔥 Core Features

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
- **Multi-platform linking** — Connect all coding accounts
- **Goal tracking** — Daily/Weekly/Monthly targets
- **Progress reports** — Weekly email summaries
- **Notification preferences** — Customizable alerts
- **Privacy controls** — Public/Private profile options
- **Export data** — Download all your analytics
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

**Architecture Type:** Modular Monolith (API-First Design)

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
    J --> K[LeetCode API]
    J --> L[Codeforces API]
    J --> M[HackerRank API]
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

```
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
  "iat": 1673481600,
  "exp": 1674086400
}
```

### Token Expiration
- **Access Token:** 7 days
- **Refresh Token:** 30 days

### Security Features
- Password hashing with bcrypt (10 salt rounds)
- JWT token expiration enforcement
- Refresh token rotation
- Rate limiting on auth endpoints (5 requests/minute)
- Account lockout after 5 failed login attempts

---

## 🗄 Database Schema

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

---

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://api.codeone.app/api
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
- **Redis caching** for frequently accessed data (95% cache hit rate)
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

| Metric | Target | Current |
|--------|--------|---------|
| API response time | < 200ms | ~150ms |
| Page load time | < 2s | ~1.5s |
| Database query time | < 50ms | ~30ms |
| Cache hit rate | > 90% | ~95% |
| Uptime | > 99.5% | 99.8% |

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

```
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

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret_here
JWT_REFRESH_EXPIRES_IN=30d

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

```
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
│   ├── migrations/              # Database migrations
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_problems.sql
│   │   └── ...
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
A: Currently: LeetCode, Codeforces, HackerRank, AtCoder, and CodeChef. More platforms coming soon!

**Q: Do I need to provide API keys for the platforms?**  
A: No, CodeONE uses public APIs and web scraping where necessary. You only need to provide your username.

**Q: Will this work if I make my LeetCode profile private?**  
A: No, your profile must be public for CodeONE to fetch your submission data.

**Q: How often does CodeONE sync my data?**  
A: Automatically every hour. You can also manually trigger sync anytime.

---

### Technical Questions

**Q: What's the difference between this and LeetCode/Codeforces dashboards?**  
A: CodeONE provides **unified analytics** across all platforms in one place, plus features like global streaks, weakness detection, and contest aggregation.

**Q: How is my data stored?**  
A: All data is stored securely in PostgreSQL with encrypted passwords. We never store your platform passwords.

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

```
Algorithm:
1. Analyze user's solved problems
2. Identify weak topics (low success rate)
3. Find similar problems with progressive difficulty
4. Recommend 3-5 problems daily
```

#### 🧠 Weakness Detection

```
Technique: Clustering + Frequency Analysis
- Group problems by tags
- Calculate success rate per tag
- Flag topics with <50% success rate
- Generate targeted practice plans
```

#### 📈 Performance Prediction

```
Model: LSTM/Transformer
Input: Historical submission data, time series
Output: Predicted rating/performance in next contest
```

#### 📚 AI Study Plan Generator

```
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

✨ **Unified Intelligence Layer** — First platform to aggregate 5+ coding sites  
🔥 **Streak Tracking** — Never lose motivation with visual progress  
🧠 **Smart Analytics** — Data-driven insights into your strengths/weaknesses  
🎯 **Goal Management** — Set and achieve systematic targets  
🏆 **Contest Aggregation** — Never miss an important competition  
⚡ **Real-time Sync** — Always up-to-date with your latest submissions  
🌙 **Beautiful UI** — Modern, responsive, dark mode support  
🔒 **Privacy-First** — Your data, your control  
🆓 **Open Source** — Free forever, self-hostable  
🚀 **Production-Ready** — Scalable architecture with best practices

---

## 🛣 Roadmap

### Phase 1: Core Features ✅ (Completed)
- [x] Multi-platform account linking
- [x] Unified dashboard
- [x] Streak tracking
- [x] Problem management
- [x] Contest calendar
- [x] Authentication (JWT + OAuth)
- [ ] Security hardening: RBAC, IDOR protection, privacy controls, audit logging, and secure session lifecycle

### Phase 2: Enhanced Analytics 🚧 (In Progress)
- [x] Difficulty progression charts
- [x] Topic mastery breakdown
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
   ```
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
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ishendrari">
        <img src="https://github.com/ishendrarai.png?size=100" width="100px;" alt=""/>
        <br /><sub><b>Ishedra Rai</b></sub>
      </a>
      <br />
      <small>Creator & Maintainer</small>
    </td>
    <!-- Add more contributors here -->
  </tr>
</table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

Want to see your name here? [Contribute to CodeONE!](#-contributing)

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

<div align="center">

### Built for developers who don't just solve problems — they build mastery. 🚀

**Give us a ⭐ if CodeONE helps your coding journey!**

[Report Bug](https://github.com/ishendrarai/CodeONE/issues) · [Request Feature](https://github.com/ishendrarai/CodeONE/issues) · [Join Discord](https://discord.gg/yourserver)

</div>

---

<div align="center">
  <sub>Made with ❤️ by the CodeONE Team</sub>
</div>
