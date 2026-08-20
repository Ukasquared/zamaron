import type { UserProfile } from '@/types';
import type { VaultDocument } from '@/types/ops';
import { cloneValue, createId, fingerprint, loadStore, saveStore, todayStamp } from '@/lib/persistentStore';
import { requirePermission } from '@/services/authorization';

const SEED: VaultDocument[] = [
  {
    id: 'DOC-8924',
    title: 'Nexus DeFi Core v3 - Signed Audit Report',
    category: 'REPORTS',
    fileSize: '4.8 MB',
    updatedAt: '2026-08-18',
    hash: '0xe7a80384',
    type: 'PDF',
    body: 'ZAMARON signed audit report for Nexus DeFi Core v3. Status: remediations verified.',
  },
  {
    id: 'DOC-8923',
    title: 'Certora Formal Verification Mathematical Proofs',
    category: 'SPECS',
    fileSize: '12.4 MB',
    updatedAt: '2026-08-17',
    hash: '0x3b91489c',
    type: 'ZIP',
    body: 'Formal specification bundle and CVL rules for VaultManager.sol.',
  },
  {
    id: 'DOC-8920',
    title: 'On-Chain Deployment Compliance Certificate',
    category: 'CERTIFICATES',
    fileSize: '1.2 MB',
    updatedAt: '2026-08-15',
    hash: '0x992caa11',
    type: 'PDF',
    body: 'Deployment compliance certificate anchored at block #21,894,012.',
  },
  {
    id: 'DOC-8890',
    title: 'Aegis Staking Vaults - Interim Scoping Brief',
    category: 'REPORTS',
    fileSize: '2.1 MB',
    updatedAt: '2026-08-14',
    hash: '0x11abff43',
    type: 'PDF',
    body: 'Interim scoping brief for Aegis Staking Vaults professional engagement.',
  },
];

let documents: VaultDocument[] = loadStore('zamaron_vault_v1', SEED);

function persist(): void {
  saveStore('zamaron_vault_v1', documents);
}

export function listDocuments(principal?: UserProfile | null): VaultDocument[] {
  requirePermission('client:read', principal);
  return cloneValue(documents);
}

export function getDocument(id: string, principal?: UserProfile | null): VaultDocument | null {
  requirePermission('client:read', principal);
  const found = documents.find((doc) => doc.id === id);
  return found ? cloneValue(found) : null;
}

export function addDocument(
  input: { title: string; category: VaultDocument['category']; type: VaultDocument['type']; body?: string; fileSize?: string },
  principal?: UserProfile | null
): VaultDocument {
  const user = requirePermission('client:write', principal);
  const doc: VaultDocument = {
    id: createId('DOC'),
    title: input.title,
    category: input.category,
    fileSize: input.fileSize || '12 KB',
    updatedAt: todayStamp(),
    hash: fingerprint(`${input.title}:${Date.now()}`),
    type: input.type,
    body: input.body || `Uploaded by ${user.name}`,
    ownerId: user.id,
  };
  documents = [doc, ...documents];
  persist();
  return cloneValue(doc);
}
