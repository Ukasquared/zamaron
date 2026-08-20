import type { SupportTicket } from '@/types/ops';
import { cloneValue, createId, loadStore, nowIso, saveStore } from '@/lib/persistentStore';

export interface KnowledgeArticle {
  id: string;
  category: string;
  title: string;
  body: string;
  tags: string[];
}

const ARTICLES: KnowledgeArticle[] = [
  {
    id: 'kb-swc-107',
    category: 'Smart Contract Auditing',
    title: 'SWC-107 Reentrancy triage',
    body: 'Update state before external calls and apply a reentrancy guard. See the academy assessment for a worked example.',
    tags: ['swc-107', 'reentrancy', 'audit'],
  },
  {
    id: 'kb-scope',
    category: 'Smart Contract Auditing',
    title: 'Scoping a new engagement',
    body: 'Provide a pinned commit hash, protocol category, and desired tier. Files may be attached as .sol or .zip.',
    tags: ['scope', 'commit', 'tier'],
  },
  {
    id: 'kb-api',
    category: 'AI Forensic Tools & APIs',
    title: 'API key rate limits',
    body: 'Default ingest keys are capped at 5,000 req/min. Admins can raise or revoke keys in Developer Management.',
    tags: ['api', 'rate-limit', 'keys'],
  },
  {
    id: 'kb-opcode',
    category: 'AI Forensic Tools & APIs',
    title: 'Bytecode disassembly',
    body: 'Paste even-length hex into the forensic terminal. PUSH, DUP, SWAP and the base opcode set are decoded locally.',
    tags: ['bytecode', 'opcode', 'evm'],
  },
  {
    id: 'kb-billing',
    category: 'Billing & Token Checkout',
    title: 'Escrow rails',
    body: 'USDC, ETH, and institutional wire are supported. Refunds require admin multi-sig approval in the refund terminal.',
    tags: ['usdc', 'refund', 'escrow'],
  },
  {
    id: 'kb-enclave',
    category: 'Operator & Node Enclaves',
    title: 'Hardware enclave PIN',
    body: 'The secure gate is a second factor. It cannot elevate role. Any 6-digit challenge completes the demo enclave.',
    tags: ['webauthn', 'pin', 'enclave'],
  },
];

let tickets: SupportTicket[] = loadStore('zamaron_tickets_v1', []);

export function searchArticles(query: string): KnowledgeArticle[] {
  const q = query.trim().toLowerCase();
  if (!q) return ARTICLES;
  return ARTICLES.filter((article) =>
    [article.title, article.body, article.category, ...article.tags].join(' ').toLowerCase().includes(q)
  );
}

export function listArticles(): KnowledgeArticle[] {
  return ARTICLES;
}

export function submitTicket(input: Omit<SupportTicket, 'id' | 'createdAt'>): SupportTicket {
  const ticket: SupportTicket = {
    ...input,
    id: createId('tkt'),
    createdAt: nowIso(),
  };
  tickets = [ticket, ...tickets];
  saveStore('zamaron_tickets_v1', tickets);
  return cloneValue(ticket);
}

export function listTickets(): SupportTicket[] {
  return cloneValue(tickets);
}
