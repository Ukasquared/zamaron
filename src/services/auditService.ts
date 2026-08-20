import type { AuditFinding, AuditRequest, AuditStatus, UserProfile } from '@/types';
import { DEMO_USERS, mockAuditRequests, mockFindings } from '@/mock/data';
import { cloneValue, createId, loadStore, nowIso, saveStore } from '@/lib/persistentStore';
import { AuthorizationError, requirePermission } from '@/services/authorization';

const AUDITS_KEY = 'zamaron_audits_v1';
const FINDINGS_KEY = 'zamaron_findings_v1';
const DRAFT_KEY = 'zamaron_audit_draft';

export interface AuditDraft {
  projectName: string;
  protocolType: string;
  targetRepo: string;
  commitHash: string;
  tier: AuditRequest['tier'];
  attachments: string[];
}

const SEEDED_AUDITS: AuditRequest[] = mockAuditRequests.map((audit) => ({
  ...audit,
  ownerId: DEMO_USERS.CLIENT.id,
  ownerName: DEMO_USERS.CLIENT.name,
}));

let audits: AuditRequest[] = loadStore(AUDITS_KEY, SEEDED_AUDITS);
let findingsByAudit: Record<string, AuditFinding[]> = loadStore(FINDINGS_KEY, {
  'ZM-8492-NX': mockFindings.map((finding) => ({ ...finding })),
});

function persistAudits(): void {
  saveStore(AUDITS_KEY, audits);
}
function persistFindings(): void {
  saveStore(FINDINGS_KEY, findingsByAudit);
}

function canUseSession(): boolean {
  return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

export function setPendingCheckout(draft: AuditDraft): void {
  if (!canUseSession()) return;
  window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function getPendingCheckout(): AuditDraft | null {
  if (!canUseSession()) return null;
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as AuditDraft) : null;
  } catch {
    return null;
  }
}

export function clearPendingCheckout(): void {
  if (!canUseSession()) return;
  window.sessionStorage.removeItem(DRAFT_KEY);
}

export function listClientAudits(principal?: UserProfile | null): AuditRequest[] {
  const user = requirePermission('client:read', principal);
  const rows = user.role === 'CLIENT' ? audits.filter((audit) => !audit.ownerId || audit.ownerId === user.id) : audits;
  return cloneValue(rows);
}

export function listAuditorQueue(principal?: UserProfile | null): AuditRequest[] {
  requirePermission('auditor:read', principal);
  return cloneValue(audits);
}

export function getAudit(id: string, principal?: UserProfile | null): AuditRequest | null {
  const user = requirePermission('client:read', principal);
  const found = audits.find((audit) => audit.id === id);
  if (!found) return null;
  if (user.role === 'CLIENT' && found.ownerId && found.ownerId !== user.id) {
    throw new AuthorizationError('FORBIDDEN', 'This engagement is outside your tenancy.');
  }
  return cloneValue(found);
}

export function getAuditFindings(principal?: UserProfile | null, auditId = 'ZM-8492-NX'): AuditFinding[] {
  requirePermission('client:read', principal);
  return cloneValue(findingsByAudit[auditId] ?? []);
}

export function createAuditRequest(
  input: AuditDraft & { ownerId: string; ownerName: string },
  principal?: UserProfile | null
): AuditRequest {
  requirePermission('client:write', principal);
  const suffix = Math.random().toString(36).slice(2, 4).toUpperCase();
  const audit: AuditRequest = {
    id: `ZM-${Date.now().toString().slice(-4)}-${suffix}`,
    projectName: input.projectName,
    protocolType: input.protocolType,
    targetRepo: input.targetRepo,
    commitHash: input.commitHash,
    submittedAt: nowIso(),
    status: 'QUEUED',
    progressPercent: 8,
    findingsCount: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
    tier: input.tier,
    tvlProtected: 'TBD',
    ownerId: input.ownerId,
    ownerName: input.ownerName,
    attachments: input.attachments,
  };
  audits = [audit, ...audits];
  findingsByAudit[audit.id] = [];
  persistAudits();
  persistFindings();
  return cloneValue(audit);
}

export function updateAuditStatus(
  id: string,
  patch: Partial<Pick<AuditRequest, 'status' | 'leadAuditor' | 'progressPercent'>>,
  principal?: UserProfile | null
): AuditRequest {
  requirePermission('auditor:write', principal);
  const index = audits.findIndex((audit) => audit.id === id);
  if (index < 0) {
    throw new AuthorizationError('FORBIDDEN', `Audit ${id} was not found.`);
  }
  audits[index] = { ...audits[index], ...patch };
  persistAudits();
  return cloneValue(audits[index]);
}

export function claimAudit(id: string, principal?: UserProfile | null): AuditRequest {
  const user = requirePermission('auditor:write', principal);
  return updateAuditStatus(
    id,
    {
      leadAuditor: user.name,
      status: 'IN_REVIEW',
      progressPercent: Math.max(audits.find((a) => a.id === id)?.progressPercent ?? 0, 40),
    },
    user
  );
}

export function updateFinding(
  auditId: string,
  findingId: string,
  patch: Partial<Pick<AuditFinding, 'status' | 'notes'>>,
  principal?: UserProfile | null
): AuditFinding {
  const actor = requirePermission('client:read', principal);
  if (actor.role === 'STUDENT') {
    throw new AuthorizationError('FORBIDDEN', 'Students cannot triage findings.');
  }
  const list = findingsByAudit[auditId] ?? [];
  const index = list.findIndex((finding) => finding.id === findingId);
  if (index < 0) {
    throw new AuthorizationError('FORBIDDEN', 'Finding not found.');
  }
  list[index] = { ...list[index], ...patch };
  findingsByAudit[auditId] = list;
  persistFindings();
  recountFindings(auditId);
  return cloneValue(list[index]);
}

function recountFindings(auditId: string): void {
  const list = findingsByAudit[auditId] ?? [];
  const index = audits.findIndex((audit) => audit.id === auditId);
  if (index < 0) return;
  const count = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const finding of list) {
    if (finding.severity === 'CRITICAL') count.critical += 1;
    else if (finding.severity === 'HIGH') count.high += 1;
    else if (finding.severity === 'MEDIUM') count.medium += 1;
    else if (finding.severity === 'LOW') count.low += 1;
    else count.info += 1;
  }
  audits[index] = { ...audits[index], findingsCount: count };
  persistAudits();
}

export function statusToPhase(status: AuditStatus): number {
  switch (status) {
    case 'QUEUED':
      return 1;
    case 'SCANNING':
      return 2;
    case 'IN_REVIEW':
      return 3;
    case 'VERIFIED':
    case 'COMPLETED':
      return 4;
    default:
      return 1;
  }
}

export function nextAuditId(): string {
  return createId('ZM');
}
