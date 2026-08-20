import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getDefaultRouteForRole } from '@/auth/rbac';
import { AuthLoadingScreen } from '@/auth/AuthLoadingScreen';

/** Prevents authenticated operators from re-entering login / induction. */
export const GuestRoute: React.FC = () => {
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading) {
    return <AuthLoadingScreen message="Restoring operator session…" />;
  }

  if (isAuthenticated) {
    return <Navigate to={getDefaultRouteForRole(role)} replace />;
  }

  return <Outlet />;
};
