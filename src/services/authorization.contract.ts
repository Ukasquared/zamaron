import { DEMO_USERS } from '@/mock/data';
import { getAuditFindings, listAuditorQueue, listClientAudits } from '@/services/auditService';
import { getBillingHistory, getSecurityLogs, updateSecurityConfig } from '@/services/adminService';
import { AuthorizationError } from '@/services/authorization';

function expectDenied(label: string, fn: () => void, failed: string[]) {
  try {
    fn();
    failed.push(`${label} (expected denial)`);
  } catch (error) {
    if (!(error instanceof AuthorizationError)) {
      failed.push(`${label} (wrong error: ${String(error)})`);
    }
  }
}

function expectAllowed(label: string, fn: () => void, failed: string[]) {
  try {
    fn();
  } catch (error) {
    failed.push(`${label} (unexpected: ${String(error)})`);
  }
}

/** Service-layer authorization contract (backend seam). */
export function runServiceAuthzChecks(): { passed: boolean; failed: string[] } {
  const failed: string[] = [];

  expectAllowed('client reads own audits', () => listClientAudits(DEMO_USERS.CLIENT), failed);
  expectAllowed('client reads findings', () => getAuditFindings(DEMO_USERS.CLIENT), failed);
  expectDenied('client reads auditor queue', () => listAuditorQueue(DEMO_USERS.CLIENT), failed);
  expectDenied('client reads security logs', () => getSecurityLogs(DEMO_USERS.CLIENT), failed);
  expectDenied('client reads billing', () => getBillingHistory(DEMO_USERS.CLIENT), failed);

  expectAllowed('auditor reads queue', () => listAuditorQueue(DEMO_USERS.AUDITOR), failed);
  expectAllowed('auditor reads client audits', () => listClientAudits(DEMO_USERS.AUDITOR), failed);
  expectDenied('auditor reads security logs', () => getSecurityLogs(DEMO_USERS.AUDITOR), failed);
  expectDenied('auditor writes security config', () => {
    updateSecurityConfig(
      { fido2Required: true, autoMitigate: true, ipWhitelisting: true, rateLimitStrict: false },
      DEMO_USERS.AUDITOR
    );
  }, failed);

  expectAllowed('admin reads logs', () => getSecurityLogs(DEMO_USERS.ADMIN), failed);
  expectAllowed('admin reads billing', () => getBillingHistory(DEMO_USERS.ADMIN), failed);
  expectAllowed('admin reads auditor queue', () => listAuditorQueue(DEMO_USERS.ADMIN), failed);
  expectDenied('unauthenticated reads audits', () => listClientAudits(null), failed);
  expectDenied('unauthenticated reads logs', () => getSecurityLogs(null), failed);

  return { passed: failed.length === 0, failed };
}
