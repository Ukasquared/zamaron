/**
 * End-to-end RBAC scenario checks covering the required acceptance cases.
 * Run with: npx tsx src/auth/rbac.scenarios.ts
 */
import {
  canAccessPath,
  getDefaultRouteForRole,
  getNavSectionsForRole,
  getPostLoginPath,
  isPublicPath,
} from '@/auth';
import { runRbacContractTests } from '@/auth/rbac.selftest';
import { runServiceAuthzChecks } from '@/services/authorization.contract';
import { resolveDemoUser } from '@/services/authService';

interface Scenario {
  name: string;
  run: () => boolean | string;
}

function navHrefs(role: Parameters<typeof getNavSectionsForRole>[0]): string[] {
  return getNavSectionsForRole(role).flatMap((section) => section.items.map((item) => item.href));
}

const scenarios: Scenario[] = [
  {
    name: 'Unauthenticated access: protected URLs denied, public URLs allowed',
    run: () => {
      const denied =
        !canAccessPath(null, '/client/dashboard') &&
        !canAccessPath(null, '/auditor/queue') &&
        !canAccessPath(null, '/admin/logs');
      const allowed = isPublicPath('/auth/login') && isPublicPath('/');
      return denied && allowed;
    },
  },
  {
    name: 'Client access: client console only, no auditor/admin',
    run: () => {
      const hrefs = navHrefs('CLIENT');
      const navOk =
        hrefs.some((h) => h.startsWith('/client')) &&
        !hrefs.some((h) => h.startsWith('/auditor') || h.startsWith('/admin'));
      const routeOk =
        canAccessPath('CLIENT', '/client/dashboard') &&
        !canAccessPath('CLIENT', '/auditor/queue') &&
        !canAccessPath('CLIENT', '/admin/logs');
      return navOk && routeOk;
    },
  },
  {
    name: 'Auditor access: auditor terminal + shared review, no admin',
    run: () => {
      const hrefs = navHrefs('AUDITOR');
      const navOk =
        hrefs.includes('/auditor/queue') &&
        !hrefs.some((h) => h.startsWith('/admin')) &&
        !hrefs.includes('/client/dashboard');
      const routeOk =
        canAccessPath('AUDITOR', '/auditor/queue') &&
        canAccessPath('AUDITOR', '/client/audits/ZM-8492-NX/review') &&
        !canAccessPath('AUDITOR', '/admin/security-config');
      return navOk && routeOk;
    },
  },
  {
    name: 'Admin access: admin suite plus explicitly permitted consoles',
    run: () => {
      const hrefs = navHrefs('ADMIN');
      return (
        hrefs.some((h) => h.startsWith('/admin')) &&
        hrefs.includes('/auditor/queue') &&
        hrefs.includes('/client/dashboard') &&
        canAccessPath('ADMIN', '/admin/logs') &&
        canAccessPath('ADMIN', '/auditor/forensics')
      );
    },
  },
  {
    name: 'Direct URL access cannot bypass role rules',
    run: () =>
      !canAccessPath('CLIENT', '/admin/users-protocols') &&
      !canAccessPath('CLIENT', '/auditor/ai-terminal') &&
      !canAccessPath('AUDITOR', '/admin/billing') &&
      canAccessPath('ADMIN', '/admin/refunds'),
  },
  {
    name: 'Page refresh keeps the same role home (session-bound defaults)',
    run: () =>
      getDefaultRouteForRole('CLIENT') === '/client/dashboard' &&
      getDefaultRouteForRole('AUDITOR') === '/auditor/queue' &&
      getDefaultRouteForRole('ADMIN') === '/admin/logs' &&
      canAccessPath('CLIENT', getDefaultRouteForRole('CLIENT')) &&
      canAccessPath('AUDITOR', getDefaultRouteForRole('AUDITOR')) &&
      canAccessPath('ADMIN', getDefaultRouteForRole('ADMIN')),
  },
  {
    name: 'Login returns callers to the intended path only when authorized',
    run: () =>
      getPostLoginPath('CLIENT', '/admin/logs') === '/client/dashboard' &&
      getPostLoginPath('ADMIN', '/admin/logs') === '/admin/logs' &&
      getPostLoginPath('AUDITOR', '/client/dashboard') === '/auditor/queue',
  },
  {
    name: 'Logout / unknown identity cannot mint admin or auditor',
    run: () => {
      const unknown = resolveDemoUser('stranger@example.com');
      const clientMail = resolveDemoUser('client@zamoron.io');
      const adminMail = resolveDemoUser('admin@zamoron.io');
      return (
        unknown.role === 'CLIENT' &&
        clientMail.role === 'CLIENT' &&
        adminMail.role === 'ADMIN' &&
        !canAccessPath(unknown.role, '/admin/logs')
      );
    },
  },
  {
    name: 'Authentication loading state never treats a missing session as authorized',
    run: () => !canAccessPath(undefined, '/client/dashboard') && !canAccessPath(null, '/admin/logs'),
  },
];

function runScenarios() {
  const failed: string[] = [];
  for (const scenario of scenarios) {
    const result = scenario.run();
    const ok = result === true;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${scenario.name}`);
    if (!ok) failed.push(scenario.name);
  }
  return failed;
}

const contract = runRbacContractTests();
console.log(`\nRBAC contract: ${contract.passed} passed`);
if (contract.failed.length) {
  console.error(contract.failed.map((name) => `  FAIL  ${name}`).join('\n'));
}

const service = runServiceAuthzChecks();
console.log(`Service authz: ${service.passed ? 'passed' : 'failed'}`);
if (service.failed.length) {
  console.error(service.failed.map((name) => `  FAIL  ${name}`).join('\n'));
}

console.log('\nAcceptance scenarios:');
const scenarioFails = runScenarios();

if (contract.failed.length || !service.passed || scenarioFails.length) {
  process.exit(1);
}

console.log('\nAll RBAC acceptance scenarios passed.');
