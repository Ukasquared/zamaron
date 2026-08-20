import type { UserProfile, UserRole } from '@/types';
import { isUserRole } from '@/auth/rbac';
import { DEMO_USERS, DEMO_USER_BY_EMAIL, buildClientFromInduction } from '@/mock/data';

export const SESSION_STORAGE_KEY = 'zamaron_session';
export const LEGACY_ROLE_STORAGE_KEY = 'zamoron_role';
export const AUTH_RESTORE_DELAY_MS = 90;

export interface AuthSession {
  user: UserProfile;
  walletConnected: boolean;
  issuedAt: number;
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readSession(): AuthSession | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.user?.id || !isUserRole(parsed.user.role)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function persistSession(session: AuthSession): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  window.localStorage.removeItem(LEGACY_ROLE_STORAGE_KEY);
}

export function clearSession(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_ROLE_STORAGE_KEY);
}

export function getSessionPrincipal(): UserProfile | null {
  return readSession()?.user ?? null;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/** Simulated credential check / token introspection. */
export async function restoreSession(): Promise<AuthSession | null> {
  await delay(AUTH_RESTORE_DELAY_MS);
  return readSession();
}

export function resolveDemoUser(email: string, requestedRole?: UserRole): UserProfile {
  const normalized = email.trim().toLowerCase();
  const known = DEMO_USER_BY_EMAIL[normalized];
  if (known) {
    return { ...known };
  }
  if (requestedRole && requestedRole !== 'ADMIN' && requestedRole !== 'AUDITOR') {
    return { ...DEMO_USERS[requestedRole], email };
  }
  return buildClientFromInduction({
    name: email.split('@')[0] || 'Operator',
    email,
  });
}

export interface AuthenticateInput {
  email: string;
  password?: string;
  name?: string;
}

export async function authenticate(input: AuthenticateInput): Promise<AuthSession> {
  await delay(80);
  const email = input.email.trim();
  if (!email) {
    throw new Error('Terminal identity is required.');
  }
  const user = resolveDemoUser(email);
  if (input.name) {
    user.name = input.name;
  }
  const session: AuthSession = {
    user,
    walletConnected: true,
    issuedAt: Date.now(),
  };
  persistSession(session);
  return session;
}

export async function registerOperator(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthSession> {
  await delay(80);
  if (!input.email.trim() || !input.name.trim()) {
    throw new Error('Operator identity is required.');
  }
  const user = buildClientFromInduction({
    name: input.name.trim(),
    email: input.email.trim(),
  });
  const session: AuthSession = {
    user,
    walletConnected: false,
    issuedAt: Date.now(),
  };
  persistSession(session);
  return session;
}

export function destroySession(): void {
  clearSession();
}
