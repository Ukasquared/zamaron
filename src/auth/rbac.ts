import type { UserRole } from '@/types';

/**
 * Centralized role, permission, and route-access definitions.
 *
 * Route protection, navigation visibility, and service-layer authorization
 * all resolve against this module. Do not scatter role checks in pages.
 */

export const USER_ROLES = ['CLIENT', 'AUDITOR', 'ADMIN', 'STUDENT'] as const;
export const PRIMARY_ROLES = ['CLIENT', 'AUDITOR', 'ADMIN'] as const;

export const ALL_AUTHENTICATED_ROLES: readonly UserRole[] = USER_ROLES;

export type Permission =
  | 'client:read'
  | 'client:write'
  | 'auditor:read'
  | 'auditor:write'
  | 'admin:read'
  | 'admin:write'
  | 'academy:read'
  | 'threat-hub:read'
  | 'governance:read';

export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  CLIENT: ['client:read', 'client:write', 'academy:read', 'threat-hub:read', 'governance:read'],
  AUDITOR: [
    'auditor:read',
    'auditor:write',
    'client:read',
    'academy:read',
    'threat-hub:read',
    'governance:read',
  ],
  ADMIN: [
    'client:read',
    'client:write',
    'auditor:read',
    'auditor:write',
    'admin:read',
    'admin:write',
    'academy:read',
    'threat-hub:read',
    'governance:read',
  ],
  STUDENT: ['academy:read', 'threat-hub:read', 'governance:read'],
};

export interface RouteAccessRule {
  /** Path prefix, or exact path when `exact` is true. */
  path: string;
  exact?: boolean;
  public?: boolean;
  roles?: readonly UserRole[];
}

/**
 * Most-specific matching rule wins (longest path).
 *
 * Public marketing + auth pages are reachable without a session.
 * Everything else is deny-by-default unless a rule grants the caller's role.
 */
export const ROUTE_ACCESS_RULES: readonly RouteAccessRule[] = [
  // Public
  { path: '/', exact: true, public: true },
  { path: '/solutions', public: true },
  { path: '/pricing', exact: true, public: true },
  { path: '/support', exact: true, public: true },
  { path: '/catalog', exact: true, public: true },
  { path: '/auth', public: true },
  { path: '/unauthorized', public: true },

  // Shared authenticated surfaces
  { path: '/threat-hub', roles: ALL_AUTHENTICATED_ROLES },
  { path: '/governance', roles: ALL_AUTHENTICATED_ROLES },
  { path: '/academy', roles: ALL_AUTHENTICATED_ROLES },
  { path: '/profile', roles: ALL_AUTHENTICATED_ROLES },
  { path: '/leaderboard/security', roles: ALL_AUTHENTICATED_ROLES },

  // Shared audit workspace: auditors review client engagements
  { path: '/client/audits/new', exact: true, roles: ['CLIENT', 'ADMIN'] },
  { path: '/client/audits', roles: ['CLIENT', 'AUDITOR', 'ADMIN'] },
  { path: '/client/vault', roles: ['CLIENT', 'AUDITOR', 'ADMIN'] },

  // Client console (dashboard, checkout, new request)
  { path: '/client', roles: ['CLIENT', 'ADMIN'] },

  // Auditor terminal
  { path: '/auditor', roles: ['AUDITOR', 'ADMIN'] },
  { path: '/leaderboard/auditors', roles: ['AUDITOR', 'ADMIN'] },

  // Admin suite
  { path: '/admin', roles: ['ADMIN'] },
];

export const ROLE_HOME: Record<UserRole, string> = {
  CLIENT: '/client/dashboard',
  AUDITOR: '/auditor/queue',
  ADMIN: '/admin/logs',
  STUDENT: '/academy/learn/crypto-security-101',
};

export const LOGIN_PATH = '/auth/login';
export const UNAUTHORIZED_PATH = '/unauthorized';

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && (USER_ROLES as readonly string[]).includes(value);
}

export function normalizePath(path: string): string {
  const raw = path.split('?')[0].split('#')[0].trim();
  if (!raw || raw === '/') return '/';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export function ruleMatches(rule: RouteAccessRule, pathname: string): boolean {
  const path = normalizePath(pathname);
  const rulePath = normalizePath(rule.path);
  if (rule.exact) return path === rulePath;
  if (rulePath === '/') return path === '/';
  return path === rulePath || path.startsWith(`${rulePath}/`);
}

export function resolveRouteRule(pathname: string): RouteAccessRule | undefined {
  const matches = ROUTE_ACCESS_RULES.filter((rule) => ruleMatches(rule, pathname));
  if (matches.length === 0) return undefined;
  return matches.reduce((best, rule) =>
    normalizePath(rule.path).length > normalizePath(best.path).length ? rule : best
  );
}

export function isPublicPath(pathname: string): boolean {
  const rule = resolveRouteRule(pathname);
  return Boolean(rule?.public);
}

export function hasRole(userRole: UserRole | null | undefined, allowed: readonly UserRole[]): boolean {
  if (!userRole) return false;
  return allowed.includes(userRole);
}

export function hasPermission(role: UserRole | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canAccessPath(role: UserRole | null | undefined, pathname: string): boolean {
  const rule = resolveRouteRule(pathname);
  if (!rule) return false;
  if (rule.public) return true;
  if (!role || !rule.roles) return false;
  return rule.roles.includes(role);
}

export function getDefaultRouteForRole(role: UserRole): string {
  return ROLE_HOME[role];
}

export function getPostLoginPath(role: UserRole, intended?: string | null): string {
  if (intended && canAccessPath(role, intended) && !isPublicPath(intended)) {
    return intended;
  }
  return getDefaultRouteForRole(role);
}

export function getRequiredRoles(pathname: string): readonly UserRole[] | null {
  const rule = resolveRouteRule(pathname);
  if (!rule || rule.public) return null;
  return rule.roles ?? [];
}
