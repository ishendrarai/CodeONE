import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';

const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Onboarding = lazy(() => import('../pages/Onboarding'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Problems = lazy(() => import('../pages/Problems'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Contests = lazy(() => import('../pages/Contests'));
const Goals = lazy(() => import('../pages/Goals'));
const Coach = lazy(() => import('../pages/Coach'));
const Settings = lazy(() => import('../pages/Settings'));
const PublicProfile = lazy(() => import('../pages/PublicProfile'));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
          <div className="w-5 h-5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Routes>
        {/* Public Landing & Marketing */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Public Shareable Profile Card */}
        <Route path="/u/:handle" element={<PublicProfile />} />
        <Route path="/profile" element={<Navigate to="/u/karan_cp" replace />} />

        {/* Authenticated Workspace App Shell */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
