import type { UserProfile, UserRole } from '@/types';
import type { Permission } from '@/auth/rbac';
import { canAccessPath, hasPermission, hasRole } from '@/auth/rbac';
import { getSessionPrincipal } from '@/services/authService';

/**
 * Service-layer authorization boundary.
 *
 * Frontend route guards are UX only. Every privileged data read/write must
 * call these helpers so a future HTTP API can enforce the same checks
 * server-side (session cookie / bearer token → principal → require*).
 */

export class AuthorizationError extends Error {
  readonly status: number;
  readonly code: 'UNAUTHENTICATED' | 'FORBIDDEN';

  constructor(code: 'UNAUTHENTICATED' | 'FORBIDDEN', message: string) {
    super(message);
    this.name = 'AuthorizationError';
    this.code = code;
    this.status = code === 'UNAUTHENTICATED' ? 401 : 403;
  }
}

export function resolvePrincipal(principal?: UserProfile | null): UserProfile | null {
  if (principal !== undefined) return principal;
  return getSessionPrincipal();
}

export function requireAuthenticated(principal?: UserProfile | null): UserProfile {
  const user = resolvePrincipal(principal);
  if (!user) {
    throw new AuthorizationError('UNAUTHENTICATED', 'Authentication required.');
  }
  return user;
}

export function requireRoles(
  allowed: readonly UserRole[],
  principal?: UserProfile | null
): UserProfile {
  const user = requireAuthenticated(principal);
  if (!hasRole(user.role, allowed)) {
    throw new AuthorizationError(
      'FORBIDDEN',
      `Role ${user.role} is not permitted. Required: ${allowed.join(', ')}.`
    );
  }
  return user;
}

export function requirePermission(
  permission: Permission,
  principal?: UserProfile | null
): UserProfile {
  const user = requireAuthenticated(principal);
  if (!hasPermission(user.role, permission)) {
    throw new AuthorizationError(
      'FORBIDDEN',
      `Missing permission ${permission} for role ${user.role}.`
    );
  }
  return user;
}

export function requirePathAccess(pathname: string, principal?: UserProfile | null): UserProfile {
  const user = requireAuthenticated(principal);
  if (!canAccessPath(user.role, pathname)) {
    throw new AuthorizationError('FORBIDDEN', `Access denied for path ${pathname}.`);
  }
  return user;
}
