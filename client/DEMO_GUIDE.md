# 🚀 CodeONE — College Presentation Front-End Demo Guide

> **Live Preview URL:** [http://localhost:5173/](http://localhost:5173/)  
> **Theme:** Light Mode Only (Checked Graph-Paper Grid `#FAFAF8` + Precision Electric Blue `#0052FF` + Near-Black Ink `#0B0B0F`)  
> **Demo Profile:** Karan Sharma (`@karan_cp`) — Candidate Master @ Codeforces

---

## 💻 1. How to Run

```bash
# Navigate to the client workspace
cd client

# Install dependencies (already installed)
npm install

# Start the Vite development server (already running on port 5173)
npm run dev -- --host --port 5173
```

Open your browser at **`http://localhost:5173/`** to view the live app.

---

## 🧭 2. Demo Navigation Flow for Presentation

1. **Public Landing Page (`/`):**
   - Hero with graph-paper grid and pulsing accent highlight cells.
   - Live product preview card displaying streak, rating, and 365-day heatmap preview.
   - Platform ecosystem marquee (Codeforces, AtCoder, LeetCode, CodeChef, CSES).
   - Feature grid with custom mini-visuals (no stock icons).
   - "How it works" 3-step zero-credential onboarding explanation.
   - Interactive FAQ accordion.

2. **Zero-Credential Onboarding Flow (`/onboarding`):**
   - **Step 1:** Select platforms (Codeforces & AtCoder active; LeetCode & CodeChef flagged as "Manual import planned").
   - **Step 2:** Enter public handles (`karan_cf`, `karan_at`).
   - **Step 3:** Zero-credential bio verification challenge code with simulated API verification.

3. **Unified Dashboard (`/dashboard`):**
   - **"Today" Card:** Daily goal ring (2/2 solved), 19-day streak status, and live ticking countdown to next contest.
   - **KPI Stat Cards:** Total Solved (979), Active Streak (19d), Codeforces Rating (1,782), Global Rank (#1,204).
   - **365-Day Single-Hue Heatmap:** Hover tooltips showing exact submission count, date, and column-stagger reveal animation.
   - **Rating Trajectory:** Recharts line chart with contest markers and 1900 CM milestone line.
   - **Difficulty Donut Chart:** Easy (312), Medium (492), Hard (175) with center count.
   - **Topic Weakness Diagnosis:** Sub-50% topics flagged (Tree DP 37.5%) with a "Practice" shortcut.
   - **Recent Submissions & Platform Sync:** Working sync button with simulated loading spinner.

4. **Problem Tracker (`/problems`):**
   - Tabs: **All Problems**, **Upsolve Queue** (problems failed in recent contests), **Recommended Next**.
   - Search by problem name or tag, filter by platform and difficulty.
   - Bookmark toggle and slide-over **Notes Drawer** to annotate algorithmic takeaways.

5. **Performance Analytics (`/analytics`):**
   - Streak health metrics and consistency score.
   - Weekly solving velocity stacked bar chart (Codeforces vs AtCoder).
   - Verdict breakdown (71% AC, 14% WA, 9% TLE) and language distribution (C++20, Python 3, Java).
   - Per-contest rating deltas table.

6. **Contest Calendar (`/contests`):**
   - List View vs. Month-Calendar grid toggle.
   - Local time (IST) vs. UTC toggle.
   - Next contest countdown banner with live ticking seconds.
   - Notification bell toggle and external contest registration links.

7. **Coding Goals (`/goals`):**
   - Daily, weekly, and monthly practice targets with animated SVG progress rings.
   - Weekly retrospective review card.
   - "Create New Goal" interactive modal.

8. **AI Consistency Coach (`/coach`):**
   - Chat interface with 4 suggested tactical prompts.
   - Simulated streaming typing effect for replies.
   - **Grounded User Telemetry side panel:** Shows the exact submission data and contest logs cited by the coach.

9. **Public Developer Showcase Card (`/u/karan_cp`):**
   - Verified developer profile card designed for recruiter sharing and resume links.
   - "Share Public Card" 1-click clipboard copy.

10. **Global Command Palette (`⌘K` or `Ctrl+K` or `/`):**
    - Searchable keyboard modal for rapid navigation across all pages.

---

## 🔌 3. Which Parts are Mock vs. Real

| Feature | Implementation Layer | Notes |
|---|---|---|
| **Styling & Design System** | Real (Tailwind + CSS Tokens) | 100% real light mode tokens, checked grid, and Recharts |
| **Heatmap & Streak Calculation** | Real Dynamic Math (`src/lib/analytics.js`) | Computed from 480+ individual submission objects over 365 days |
| **Topic Diagnostics** | Real Dynamic Math (`src/lib/analytics.js`) | Scans accuracy percentage per tag and flags sub-50% areas |
| **Contest Countdown** | Real Dynamic Timer (`useCountdown.js`) | Ticks every second relative to current wall-clock time |
| **Command Palette & Hotkeys** | Real Keyboard Listeners | `⌘K`, `/`, `ESC`, Arrow navigation |
| **Data Persistence** | Mock (`src/data/mockService.js`) | Simulates 80-120ms async API latency |
| **Platform Verification** | Simulated Zero-Credential Flow | Demonstrates token bio-challenge flow |
| **AI Coach Responses** | Scripted Telemetry-Grounded Replies | Demonstrates AI recommendation grounded in user data |

---

## 🔄 4. How to Swap in the Real Backend API

All mock data access is encapsulated in **`client/src/data/mockService.js`**.  
To switch to the real Express/Prisma backend:

1. In `client/src/services/api.js`, set `baseURL` to `http://localhost:5000/api/v1`.
2. Swap the function calls in `mockService.js` with calls to `api.get('/analytics/dashboard')`, `api.get('/problems')`, etc.
3. No React components need to be modified because all data shapes in `mockService.js` were designed to strictly mirror the production API response envelopes.
