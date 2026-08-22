/**
 * Contract tests for centralized RBAC.
 * Run with: node --experimental-strip-types src/auth/rbac.selftest.ts
 */
import {
  canAccessPath,
  getDefaultRouteForRole,
  getPostLoginPath,
  hasPermission,
  isPublicPath,
  resolveRouteRule,
} from './rbac';
import type { UserRole } from '@/types';

interface Case {
  name: string;
  run: () => boolean;
}

const cases: Case[] = [
  {
    name: 'public marketing paths are public',
    run: () =>
      isPublicPath('/') &&
      isPublicPath('/pricing') &&
      isPublicPath('/support') &&
      isPublicPath('/catalog') &&
      isPublicPath('/solutions/auditing') &&
      isPublicPath('/signin') &&
      isPublicPath('/unauthorized'),
  },
  {
    name: 'protected dashboards are not public',
    run: () =>
      !isPublicPath('/client/dashboard') &&
      !isPublicPath('/auditor/queue') &&
      !isPublicPath('/admin/logs') &&
      !isPublicPath('/threat-hub/skynet'),
  },
  {
    name: 'unauthenticated cannot access protected paths',
    run: () =>
      !canAccessPath(null, '/client/dashboard') &&
      !canAccessPath(undefined, '/auditor/queue') &&
      !canAccessPath(null, '/admin/logs'),
  },
  {
    name: 'unauthenticated can access public paths',
    run: () => canAccessPath(null, '/') && canAccessPath(null, '/signin'),
  },
  {
    name: 'client cannot access auditor or admin pages',
    run: () =>
      canAccessPath('CLIENT', '/client/dashboard') &&
      canAccessPath('CLIENT', '/client/audits/new') &&
      canAccessPath('CLIENT', '/client/checkout') &&
      !canAccessPath('CLIENT', '/auditor/queue') &&
      !canAccessPath('CLIENT', '/auditor/ai-terminal') &&
      !canAccessPath('CLIENT', '/leaderboard/auditors') &&
      !canAccessPath('CLIENT', '/admin/logs') &&
      !canAccessPath('CLIENT', '/admin/security-config') &&
      !canAccessPath('CLIENT', '/admin/billing'),
  },
  {
    name: 'auditor cannot access admin pages or client-only console',
    run: () =>
      canAccessPath('AUDITOR', '/auditor/queue') &&
      canAccessPath('AUDITOR', '/auditor/forensics') &&
      canAccessPath('AUDITOR', '/leaderboard/auditors') &&
      canAccessPath('AUDITOR', '/client/audits/ZM-8492-NX/review') &&
      canAccessPath('AUDITOR', '/client/vault') &&
      !canAccessPath('AUDITOR', '/client/dashboard') &&
      !canAccessPath('AUDITOR', '/client/audits/new') &&
      !canAccessPath('AUDITOR', '/client/checkout') &&
      !canAccessPath('AUDITOR', '/admin/logs') &&
      !canAccessPath('AUDITOR', '/admin/users-protocols'),
  },
  {
    name: 'admin can access admin, auditor, and client routes',
    run: () =>
      canAccessPath('ADMIN', '/admin/logs') &&
      canAccessPath('ADMIN', '/admin/invoices/ZM-8994-VX') &&
      canAccessPath('ADMIN', '/auditor/queue') &&
      canAccessPath('ADMIN', '/client/dashboard') &&
      canAccessPath('ADMIN', '/threat-hub/skynet'),
  },
  {
    name: 'shared authenticated surfaces are open to every role',
    run: () =>
      (['CLIENT', 'AUDITOR', 'ADMIN', 'STUDENT'] as UserRole[]).every(
        (role) =>
          canAccessPath(role, '/threat-hub/skynet') &&
          canAccessPath(role, '/governance') &&
          canAccessPath(role, '/academy/learn/crypto-security-101') &&
          canAccessPath(role, '/profile/alex-chen')
      ),
  },
  {
    name: 'student cannot access operator consoles',
    run: () =>
      !canAccessPath('STUDENT', '/client/dashboard') &&
      !canAccessPath('STUDENT', '/auditor/queue') &&
      !canAccessPath('STUDENT', '/admin/logs'),
  },
  {
    name: 'direct URL variants still resolve the most specific rule',
    run: () =>
      resolveRouteRule('/client/audits/new')?.roles?.includes('CLIENT') === true &&
      resolveRouteRule('/client/audits/new')?.roles?.includes('AUDITOR') !== true &&
      resolveRouteRule('/client/audits/ABC/review')?.roles?.includes('AUDITOR') === true,
  },
  {
    name: 'unknown paths are denied by default',
    run: () => !canAccessPath('ADMIN', '/not-a-real-route') && !canAccessPath('CLIENT', '/secret'),
  },
  {
    name: 'role home paths are reachable by that role',
    run: () =>
      canAccessPath('CLIENT', getDefaultRouteForRole('CLIENT')) &&
      canAccessPath('AUDITOR', getDefaultRouteForRole('AUDITOR')) &&
      canAccessPath('ADMIN', getDefaultRouteForRole('ADMIN')),
  },
  {
    name: 'post-login honors intended path only when authorized',
    run: () =>
      getPostLoginPath('CLIENT', '/admin/logs') === getDefaultRouteForRole('CLIENT') &&
      getPostLoginPath('ADMIN', '/admin/logs') === '/admin/logs' &&
      getPostLoginPath('AUDITOR', '/auditor/queue') === '/auditor/queue',
  },
  {
    name: 'permissions match role matrix',
    run: () =>
      hasPermission('CLIENT', 'client:write') &&
      !hasPermission('CLIENT', 'admin:read') &&
      !hasPermission('CLIENT', 'auditor:read') &&
      hasPermission('AUDITOR', 'auditor:write') &&
      !hasPermission('AUDITOR', 'admin:write') &&
      hasPermission('ADMIN', 'admin:write') &&
      hasPermission('ADMIN', 'client:read') &&
      !hasPermission(null, 'client:read'),
  },
];

export function runRbacContractTests(): { passed: number; failed: string[] } {
  const failed: string[] = [];
  for (const testCase of cases) {
    try {
      if (!testCase.run()) failed.push(testCase.name);
    } catch (error) {
      failed.push(`${testCase.name} (threw: ${String(error)})`);
    }
  }
  return { passed: cases.length - failed.length, failed };
}

const isDirectRun =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  process.argv[1] &&
  process.argv[1].includes('rbac.selftest');

if (isDirectRun) {
  const result = runRbacContractTests();
  for (const name of cases.map((c) => c.name)) {
    const ok = !result.failed.includes(name) && !result.failed.some((f) => f.startsWith(`${name} (`));
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  }
  if (result.failed.length) {
    console.error(`\n${result.failed.length} failed`);
    process.exit(1);
  }
  console.log(`\n${result.passed}/${cases.length} RBAC contract tests passed`);
}
