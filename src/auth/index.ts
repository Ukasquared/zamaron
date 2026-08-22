export {
  ALL_AUTHENTICATED_ROLES,
  ADMIN_LOGIN_PATH,
  AUDITOR_LOGIN_PATH,
  LOGIN_PATH,
  PRIMARY_ROLES,
  ROLE_HOME,
  ROLE_PERMISSIONS,
  ROUTE_ACCESS_RULES,
  UNAUTHORIZED_PATH,
  USER_ROLES,
  canAccessPath,
  getDefaultRouteForRole,
  getLoginPathForProtectedPath,
  getPostLoginPath,
  getRequiredRoles,
  hasPermission,
  hasRole,
  isPublicPath,
  isUserRole,
  normalizePath,
  resolveRouteRule,
} from '@/auth/rbac';
export type { Permission, RouteAccessRule } from '@/auth/rbac';
export { ProtectedRoute } from '@/auth/ProtectedRoute';
export { GuestRoute } from '@/auth/GuestRoute';
export { AuthLoadingScreen } from '@/auth/AuthLoadingScreen';
export { usePermission } from '@/auth/usePermission';
export { DASHBOARD_NAV_SECTIONS, getNavSectionsForRole } from '@/auth/navigation';
