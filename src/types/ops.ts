import type { UserRole, SecurityClearance } from '@/types';

export type OperatorStatus = 'ACTIVE' | 'SUSPENDED' | 'ISOLATED';

export interface OperatorRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress: string;
  clearance: SecurityClearance;
  status: OperatorStatus;
  lastSync: string;
}

export type ProtocolWatchStatus = 'MONITORING' | 'ISOLATED' | 'RESTORED' | 'BLACKLISTED';

export interface ProtocolRecord {
  id: string;
  name: string;
  category: string;
  contractAddress: string;
  status: ProtocolWatchStatus;
  gasThresholdGwei: number;
  riskScore: number;
  lastSync: string;
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  prefix: string;
  secretHint: string;
  scopes: string;
  rateLimit: number;
  status: 'ACTIVE' | 'REVOKED';
  createdAt: string;
  lastUsed: string;
}

export type AlertChannel = 'WEBHOOK' | 'EMAIL' | 'TELEGRAM' | 'PAGER';

export interface AlertRoute {
  id: string;
  name: string;
  eventSource: string;
  minSeverity: 'INFO' | 'WARN' | 'CRIT';
  channel: AlertChannel;
  target: string;
  enabled: boolean;
  threshold: number;
}

export interface PaymentGateway {
  id: string;
  name: string;
  rail: 'USDC' | 'ETH' | 'WIRE' | 'SOL';
  address: string;
  enabled: boolean;
  settlementDelay: string;
}

export type RefundStatus = 'PENDING' | 'APPROVED' | 'DENIED';

export interface RefundRequest {
  id: string;
  invoiceId: string;
  client: string;
  amount: string;
  reason: string;
  status: RefundStatus;
  requestedAt: string;
  decidedAt?: string;
  decidedBy?: string;
}

export interface TokenReportOverride {
  id: string;
  contractAddress: string;
  tokenName: string;
  ticker: string;
  chain: string;
  notes: string;
  isHoneypot: boolean;
  hasMintFunction: boolean;
  hasBlacklist: boolean;
  hasProxy: boolean;
  liquidityLockedPercent: number;
  top10HoldersPercent: number;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  severity: 'LOW' | 'HIGH' | 'CRITICAL';
  createdAt: string;
}

export interface VaultDocument {
  id: string;
  title: string;
  category: 'REPORTS' | 'CERTIFICATES' | 'SPECS';
  fileSize: string;
  updatedAt: string;
  hash: string;
  type: 'PDF' | 'ZIP' | 'TXT';
  body: string;
  ownerId?: string;
}
