/**
 * src/routes/AppRoutes.jsx
 * Layer: Frontend / Routes (Centralized Routing)
 * Responsibility: Centralized React Router configuration with:
 *                 - Route-based code splitting (React.lazy + Suspense)
 *                 - ProtectedRoute boundary for authenticated pages
 *                 - MainLayout shell integration
 */

import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Problems = lazy(() => import('../pages/Problems'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Contests = lazy(() => import('../pages/Contests'));
const Goals = lazy(() => import('../pages/Goals'));
const Profile = lazy(() => import('../pages/Profile'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

