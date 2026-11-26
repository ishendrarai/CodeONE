# 🎨 CodeONE Frontend Architecture Specification

> **Framework:** React 18 (Vite SPA)  
> **Styling:** Tailwind CSS  
> **Source of Truth:** CodeONE Technical Documentation (Chapters 11–15)

---

## 🏛️ 1. Architectural Layers & State Separation

1. **Presentation Components (`client/src/components/`):** Reusable UI building blocks (`common/`), shell layout (`layout/`), and domain modules (`dashboard/`, `problems/`, `contests/`, `profile/`, `goals/`).
2. **Page Views (`client/src/pages/`):** 8 top-level route components code-split via `React.lazy()` and `Suspense`.
3. **Server State Management (TanStack Query):** Custom hooks (`useAuth`, `useProblems`, `useAnalytics`, `useContests`, `useProfile`, `useGoals`, `useDebounce`) caching server data with strict invalidation triggers.
4. **Lightweight Client Context:**
   * **`AuthContext.jsx`:** Holds user profile and in-memory access token (never written to `localStorage`).
   * **`ThemeContext.jsx`:** Toggles dark/light theme class on `document.documentElement`.
5. **Security-Hardened Axios Client (`client/src/services/api.js`):**
   * Transmits HttpOnly refresh cookies via `withCredentials: true`.
   * Automatically queues concurrent requests during 401 token refresh cycles.

