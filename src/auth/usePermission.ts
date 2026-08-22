import { useAuth } from '@/context/AuthContext';
import {
  canAccessPath,
  getDefaultRouteForRole,
  hasPermission,
  hasRole,
  type Permission,
} from '@/auth/rbac';
import type { UserRole } from '@/types';

export function usePermission() {
  const { role, isAuthenticated, user, isLoading } = useAuth();

  return {
    isLoading,
    isAuthenticated,
    role,
    user,
    canAccess: (path: string) => isAuthenticated && canAccessPath(role, path),
    hasRole: (...roles: UserRole[]) => isAuthenticated && hasRole(role, roles),
    hasPermission: (permission: Permission) => isAuthenticated && hasPermission(role, permission),
    isAdmin: isAuthenticated && role === 'ADMIN',
    isAuditor: isAuthenticated && role === 'AUDITOR',
    isClient: isAuthenticated && role === 'CLIENT',
    homePath: isAuthenticated ? getDefaultRouteForRole(role) : '/signin',
  };
}
