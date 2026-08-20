import type { AuditFinding, AuditRequest, UserProfile } from '@/types';
import { mockAuditRequests, mockFindings } from '@/mock/data';
import { requirePermission } from '@/services/authorization';

/** Client console + shared audit workspace reads. */
export function listClientAudits(principal?: UserProfile | null): AuditRequest[] {
  requirePermission('client:read', principal);
  return mockAuditRequests;
}

export function getAuditFindings(principal?: UserProfile | null): AuditFinding[] {
  requirePermission('client:read', principal);
  return mockFindings;
}

/** Auditor dispatch queue. Clients cannot read this dataset. */
export function listAuditorQueue(principal?: UserProfile | null): AuditRequest[] {
  requirePermission('auditor:read', principal);
  return mockAuditRequests;
}
