/**
 * Session persistence checks for login, logout, and refresh.
 * Run with: npx tsx src/services/authService.scenarios.ts
 */
import {
  AUTH_RESTORE_DELAY_MS,
  authenticate,
  clearSession,
  destroySession,
  persistSession,
  readSession,
  registerOperator,
  restoreSession,
  SESSION_STORAGE_KEY,
} from '@/services/authService';

const store = new Map<string, string>();

const memoryStorage: Storage = {
  get length() {
    return store.size;
  },
  clear() {
    store.clear();
  },
  getItem(key: string) {
    return store.has(key) ? store.get(key)! : null;
  },
  key(index: number) {
    return Array.from(store.keys())[index] ?? null;
  },
  removeItem(key: string) {
    store.delete(key);
  },
  setItem(key: string, value: string) {
    store.set(key, value);
  },
};

function installWindow() {
  const target = globalThis as typeof globalThis & { window?: Window & typeof globalThis };
  target.window = {
    localStorage: memoryStorage,
    setTimeout: globalThis.setTimeout.bind(globalThis),
  } as unknown as Window & typeof globalThis;
}

async function run() {
  installWindow();
  clearSession();

  if (readSession() !== null) {
    throw new Error('Expected empty session before login');
  }

  const started = Date.now();
  const restoredEmpty = await restoreSession();
  const elapsed = Date.now() - started;
  if (restoredEmpty !== null) {
    throw new Error('Refresh without a session must stay unauthenticated');
  }
  if (elapsed < AUTH_RESTORE_DELAY_MS - 5) {
    throw new Error('Session restore must wait for the auth loading window');
  }

  const clientSession = await authenticate({ email: 'client@zamoron.io', password: 'demo' });
  if (clientSession.user.role !== 'CLIENT') {
    throw new Error('client@zamoron.io must authenticate as CLIENT');
  }
  if (!memoryStorage.getItem(SESSION_STORAGE_KEY)) {
    throw new Error('Login must persist the session for refresh');
  }

  const refreshed = await restoreSession();
  if (!refreshed || refreshed.user.role !== 'CLIENT' || refreshed.user.email !== 'client@zamoron.io') {
    throw new Error('Page refresh must restore the same CLIENT session');
  }

  let clientWasRejectedByAdminLogin = false;
  try {
    await authenticate({ email: 'client@zamoron.io', requiredRole: 'ADMIN' });
  } catch {
    clientWasRejectedByAdminLogin = true;
  }
  if (!clientWasRejectedByAdminLogin) {
    throw new Error('A CLIENT account must not authenticate through the admin login route');
  }

  const auditorSession = await authenticate({ email: 'auditor@zamoron.io', requiredRole: 'AUDITOR' });
  if (auditorSession.user.role !== 'AUDITOR') {
    throw new Error('auditor@zamoron.io must authenticate as AUDITOR');
  }

  const refreshedAuditor = await restoreSession();
  if (!refreshedAuditor || refreshedAuditor.user.role !== 'AUDITOR') {
    throw new Error('Page refresh must restore the same AUDITOR session');
  }

  const adminSession = await authenticate({ email: 'admin@zamoron.io', requiredRole: 'ADMIN' });
  if (adminSession.user.role !== 'ADMIN') {
    throw new Error('admin@zamoron.io must authenticate as ADMIN');
  }
  const refreshedAdmin = await restoreSession();
  if (!refreshedAdmin || refreshedAdmin.user.role !== 'ADMIN') {
    throw new Error('Page refresh must restore the same ADMIN session');
  }

  persistSession(adminSession);
  destroySession();
  if (readSession() !== null) {
    throw new Error('Logout must clear the persisted session');
  }
  const afterLogout = await restoreSession();
  if (afterLogout !== null) {
    throw new Error('Refresh after logout must not resurrect the session');
  }

  const inducted = await registerOperator({
    name: 'New Operator',
    email: 'new.op@example.com',
    password: 'hardened-pass-1',
  });
  if (inducted.user.role !== 'CLIENT') {
    throw new Error('Induction must issue CLIENT, never a privileged role');
  }

  console.log('PASS  login persists a role-bound session');
  console.log('PASS  refresh restores the same client, auditor, and admin sessions');
  console.log('PASS  client / auditor / admin emails map to the correct roles');
  console.log('PASS  client accounts are rejected from the private admin login route');
  console.log('PASS  logout + refresh stays unauthenticated');
  console.log('PASS  induction cannot mint auditor or admin');
  console.log('PASS  restoreSession holds the loading gate before resolving');
  console.log('\nAuth session scenarios passed.');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
