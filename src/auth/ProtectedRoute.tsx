import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { canAccessPath, LOGIN_PATH, UNAUTHORIZED_PATH } from '@/auth/rbac';
import { AuthLoadingScreen } from '@/auth/AuthLoadingScreen';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  /** Optional extra role allow-list. Path rules in rbac.ts remain the source of truth. */
  roles?: readonly UserRole[];
  children?: React.ReactNode;
}

/**
 * Routing-level authz gate. Never renders the protected tree until the
 * session has been restored, so dashboards cannot flash while loading.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, children }) => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PATH} replace state={{ from: location.pathname }} />;
  }

  const allowedByPath = canAccessPath(role, location.pathname);
  const allowedByProp = !roles || roles.length === 0 || roles.includes(role);

  if (!allowedByPath || !allowedByProp) {
    return (
      <Navigate
        to={UNAUTHORIZED_PATH}
        replace
        state={{ from: location.pathname, requiredRoles: roles }}
      />
    );
  }

  return children ? <>{children}</> : <Outlet />;
};
