import type { SecurityLogEntry, UserProfile } from '@/types';
import { DEMO_USERS, mockLogs } from '@/mock/data';
import type {
  AlertRoute,
  ApiKeyRecord,
  OperatorRecord,
  PaymentGateway,
  ProtocolRecord,
  RefundRequest,
  TokenReportOverride,
} from '@/types/ops';
import { cloneValue, createId, fingerprint, loadStore, nowIso, saveStore, todayStamp } from '@/lib/persistentStore';
import { toCsv } from '@/lib/download';
import { AuthorizationError, requirePermission } from '@/services/authorization';

export interface BillingTransaction {
  id: string;
  invoiceNumber: string;
  client: string;
  clientWallet: string;
  tier: string;
  amount: string;
  amountValue: number;
  status: string;
  date: string;
  rail: string;
  description: string;
  txHash: string;
}

export interface SecurityConfigState {
  fido2Required: boolean;
  autoMitigate: boolean;
  ipWhitelisting: boolean;
  rateLimitStrict: boolean;
}

const BILLING_SEED: BillingTransaction[] = [
  {
    id: 'ZM-8994-VX',
    invoiceNumber: 'INV-8994-VX',
    client: 'Nexus DeFi Protocol',
    clientWallet: '0x48f9A12b982C5aE7d8904D9bA0499A10372892a1',
    tier: 'Enterprise Audit',
    amount: '$50,000',
    amountValue: 50000,
    status: 'SETTLED',
    date: '2026-08-16',
    rail: 'USDC',
    description: 'Enterprise Smart Contract Security Audit (4-Stage Pipeline)\nTarget: github.com/nexus-defi/core-v3',
    txHash: '0x9fa1489c',
  },
  {
    id: 'INV-8993-ST',
    invoiceNumber: 'INV-8993-ST',
    client: 'Aegis Staking Derivative',
    clientWallet: '0x71C2A4b8e4d90c1F8aB3e6D4C9f0123456789abc',
    tier: 'Professional Audit',
    amount: '$25,000',
    amountValue: 25000,
    status: 'SETTLED',
    date: '2026-08-14',
    rail: 'ETH',
    description: 'Professional protocol audit for Aegis Staking Vaults',
    txHash: '0x882b190a',
  },
  {
    id: 'INV-8991-OP',
    invoiceNumber: 'INV-8991-OP',
    client: 'Hyperion Flash Lending',
    clientWallet: '0x91AaB12c334d8904D9bA0499A10372892ffff1',
    tier: 'Standard Retainer',
    amount: '$12,500',
    amountValue: 12500,
    status: 'SETTLED',
    date: '2026-08-10',
    rail: 'WIRE',
    description: 'Standard retainer cycle — Hyperion Flash Lending',
    txHash: '0x77c133e9',
  },
];

const OPERATOR_SEED: OperatorRecord[] = Object.values(DEMO_USERS).map((user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  walletAddress: user.walletAddress,
  clearance: user.securityClearance,
  status: 'ACTIVE',
  lastSync: 'just now',
}));

const PROTOCOL_SEED: ProtocolRecord[] = [
  {
    id: 'prt-nexus',
    name: 'Nexus DeFi Protocol',
    category: 'DEX',
    contractAddress: '0x7a58b924c891e4a10042f9b87a6d88c92b5a1d3e',
    status: 'MONITORING',
    gasThresholdGwei: 45,
    riskScore: 18,
    lastSync: '2m ago',
  },
  {
    id: 'prt-aegis',
    name: 'Aegis Staking Vaults',
    category: 'STAKING',
    contractAddress: '0x3f1249a190c71fa190c',
    status: 'MONITORING',
    gasThresholdGwei: 30,
    riskScore: 32,
    lastSync: '14m ago',
  },
  {
    id: 'prt-ghost',
    name: 'Ghost Protocol 7',
    category: 'UNKNOWN',
    contractAddress: '0xdead000000000000000000000000000000000001',
    status: 'BLACKLISTED',
    gasThresholdGwei: 0,
    riskScore: 98,
    lastSync: '12d ago',
  },
];

const KEY_SEED: ApiKeyRecord[] = [
  {
    id: 'key-core',
    name: 'Skynet Ingest',
    prefix: 'zm_live_8f0a',
    secretHint: '••••-92a1',
    scopes: 'radar:read,incidents:write',
    rateLimit: 5000,
    status: 'ACTIVE',
    createdAt: '2026-07-02',
    lastUsed: '2m ago',
  },
];

const ALERT_SEED: AlertRoute[] = [
  {
    id: 'alrt-crit',
    name: 'Critical exploit pager',
    eventSource: 'Neural Lattice Gate',
    minSeverity: 'CRIT',
    channel: 'PAGER',
    target: 'oncall@zamoron.io',
    enabled: true,
    threshold: 1,
  },
  {
    id: 'alrt-whale',
    name: 'Whale drain webhook',
    eventSource: 'Whale Radar',
    minSeverity: 'WARN',
    channel: 'WEBHOOK',
    target: 'https://hooks.nexus.internal/whale',
    enabled: true,
    threshold: 3,
  },
  {
    id: 'alrt-auth',
    name: 'Auth vault email',
    eventSource: 'Auth Vault API',
    minSeverity: 'WARN',
    channel: 'EMAIL',
    target: 'secops@zamoron.io',
    enabled: true,
    threshold: 5,
  },
];

const GATEWAY_SEED: PaymentGateway[] = [
  {
    id: 'gw-usdc',
    name: 'USDC Multi-sig Escrow',
    rail: 'USDC',
    address: '0x71fa498a9b24e019c8192a01948ba19248a9102c',
    enabled: true,
    settlementDelay: 'instant',
  },
  {
    id: 'gw-eth',
    name: 'Ethereum Native Rail',
    rail: 'ETH',
    address: '0x48f9A12b982C5aE7d8904D9bA0499A10372892a1',
    enabled: true,
    settlementDelay: '1 confirmation',
  },
  {
    id: 'gw-wire',
    name: 'Institutional USD Wire',
    rail: 'WIRE',
    address: 'ABA 021000021 / Zamaron Pro',
    enabled: true,
    settlementDelay: '1-2 business days',
  },
];

const REFUND_SEED: RefundRequest[] = [
  {
    id: 'rfd-2201',
    invoiceId: 'INV-8991-OP',
    client: 'Hyperion Flash Lending',
    amount: '$2,500',
    reason: 'Scope reduction after Phase 1 — unused fuzzing hours.',
    status: 'PENDING',
    requestedAt: '2026-08-17',
  },
];

const TOKEN_REPORT_SEED: TokenReportOverride[] = [
  {
    id: 'tr-nxst',
    contractAddress: '0x7a58b924c891e4a10042f9b87a6d88c92b5a1d3e',
    tokenName: 'Nexus Synthetic Token',
    ticker: 'NXST',
    chain: 'Ethereum',
    notes: 'Calibrated after Q3 audit. Mint retained for emissions; owner timelocked.',
    isHoneypot: false,
    hasMintFunction: true,
    hasBlacklist: false,
    hasProxy: true,
    liquidityLockedPercent: 96,
    top10HoldersPercent: 18,
    updatedAt: '2026-08-16',
  },
];

let billing: BillingTransaction[] = loadStore('zamaron_billing_v1', BILLING_SEED);
let securityConfig: SecurityConfigState = loadStore('zamaron_sec_config_v1', {
  fido2Required: true,
  autoMitigate: true,
  ipWhitelisting: true,
  rateLimitStrict: false,
});
let logs: SecurityLogEntry[] = loadStore('zamaron_logs_v1', mockLogs);
let operators: OperatorRecord[] = loadStore('zamaron_operators_v1', OPERATOR_SEED);
let protocols: ProtocolRecord[] = loadStore('zamaron_protocols_v1', PROTOCOL_SEED);
let apiKeys: ApiKeyRecord[] = loadStore('zamaron_apikeys_v1', KEY_SEED);
let alerts: AlertRoute[] = loadStore('zamaron_alerts_v1', ALERT_SEED);
let gateways: PaymentGateway[] = loadStore('zamaron_gateways_v1', GATEWAY_SEED);
let refunds: RefundRequest[] = loadStore('zamaron_refunds_v1', REFUND_SEED);
let tokenReports: TokenReportOverride[] = loadStore('zamaron_token_reports_v1', TOKEN_REPORT_SEED);

function persistBilling(): void {
  saveStore('zamaron_billing_v1', billing);
}
function persistConfig(): void {
  saveStore('zamaron_sec_config_v1', securityConfig);
}
function persistLogs(): void {
  saveStore('zamaron_logs_v1', logs);
}
function persistOperators(): void {
  saveStore('zamaron_operators_v1', operators);
}
function persistProtocols(): void {
  saveStore('zamaron_protocols_v1', protocols);
}
function persistKeys(): void {
  saveStore('zamaron_apikeys_v1', apiKeys);
}
function persistAlerts(): void {
  saveStore('zamaron_alerts_v1', alerts);
}
function persistGateways(): void {
  saveStore('zamaron_gateways_v1', gateways);
}
function persistRefunds(): void {
  saveStore('zamaron_refunds_v1', refunds);
}
function persistTokenReports(): void {
  saveStore('zamaron_token_reports_v1', tokenReports);
}

export function getSecurityLogs(principal?: UserProfile | null): SecurityLogEntry[] {
  requirePermission('admin:read', principal);
  return cloneValue(logs);
}

export function appendSecurityLog(entry: Omit<SecurityLogEntry, 'id' | 'timestamp' | 'hash'>, principal?: UserProfile | null): SecurityLogEntry {
  requirePermission('admin:write', principal);
  const next: SecurityLogEntry = {
    ...entry,
    id: createId('LOG'),
    timestamp: nowIso().replace('T', ' ').slice(0, 19),
    hash: fingerprint(`${entry.actor}:${entry.action}`),
  };
  logs = [next, ...logs];
  persistLogs();
  return cloneValue(next);
}

export function exportLogsCsv(principal?: UserProfile | null): string {
  const rows = getSecurityLogs(principal);
  return toCsv(
    ['id', 'timestamp', 'severity', 'eventSource', 'actor', 'action', 'ipAddress', 'status', 'hash'],
    rows.map((log) => [log.id, log.timestamp, log.severity, log.eventSource, log.actor, log.action, log.ipAddress, log.status, log.hash])
  );
}

export function getBillingHistory(principal?: UserProfile | null): BillingTransaction[] {
  requirePermission('admin:read', principal);
  return cloneValue(billing);
}

export function getInvoice(id: string, principal?: UserProfile | null): BillingTransaction | null {
  requirePermission('admin:read', principal);
  const found = billing.find((row) => row.id === id || row.invoiceNumber === id);
  return found ? cloneValue(found) : null;
}

export function addBillingRecord(
  input: Omit<BillingTransaction, 'id' | 'invoiceNumber' | 'date' | 'status'>,
  principal?: UserProfile | null
): BillingTransaction {
  requirePermission('admin:write', principal);
  const id = createId('INV');
  const row: BillingTransaction = {
    ...input,
    id,
    invoiceNumber: id.replace('INV-', 'INV-'),
    date: todayStamp(),
    status: 'SETTLED',
  };
  billing = [row, ...billing];
  persistBilling();
  return cloneValue(row);
}

export function recordSettlement(
  input: { client: string; clientWallet: string; tier: string; amountValue: number; rail: string; description: string },
  principal?: UserProfile | null
): BillingTransaction {
  return addBillingRecord(
    {
      client: input.client,
      clientWallet: input.clientWallet,
      tier: input.tier,
      amount: `$${input.amountValue.toLocaleString()}`,
      amountValue: input.amountValue,
      rail: input.rail,
      description: input.description,
      txHash: fingerprint(`${input.client}:${Date.now()}`),
    },
    principal
  );
}

export function generateStatementCsv(principal?: UserProfile | null): string {
  const rows = getBillingHistory(principal);
  return toCsv(
    ['invoice', 'client', 'tier', 'amount', 'status', 'date', 'rail'],
    rows.map((row) => [row.invoiceNumber, row.client, row.tier, row.amount, row.status, row.date, row.rail])
  );
}

export function getSecurityConfig(principal?: UserProfile | null): SecurityConfigState {
  requirePermission('admin:read', principal);
  return { ...securityConfig };
}

export function updateSecurityConfig(
  next: SecurityConfigState,
  principal?: UserProfile | null
): SecurityConfigState {
  requirePermission('admin:write', principal);
  securityConfig = { ...next };
  persistConfig();
  return { ...securityConfig };
}

export function recordOperator(user: UserProfile): void {
  if (operators.some((row) => row.email.toLowerCase() === user.email.toLowerCase() || row.id === user.id)) {
    return;
  }
  operators = [
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      walletAddress: user.walletAddress,
      clearance: user.securityClearance,
      status: 'ACTIVE',
      lastSync: 'just now',
    },
    ...operators,
  ];
  persistOperators();
}

export function listOperators(principal?: UserProfile | null): OperatorRecord[] {
  requirePermission('admin:read', principal);
  return cloneValue(operators);
}

export function updateOperator(
  id: string,
  patch: Partial<Pick<OperatorRecord, 'role' | 'status' | 'clearance'>>,
  principal?: UserProfile | null
): OperatorRecord {
  requirePermission('admin:write', principal);
  const index = operators.findIndex((row) => row.id === id);
  if (index < 0) throw new AuthorizationError('FORBIDDEN', 'Operator not found.');
  if (patch.role && patch.role !== 'ADMIN') {
    const remainingAdmins = operators.filter((row) => row.role === 'ADMIN' && row.id !== id).length;
    if (operators[index].role === 'ADMIN' && remainingAdmins === 0) {
      throw new AuthorizationError('FORBIDDEN', 'Cannot demote the last ADMIN.');
    }
  }
  operators[index] = { ...operators[index], ...patch, lastSync: 'just now' };
  persistOperators();
  return cloneValue(operators[index]);
}

export function listProtocols(principal?: UserProfile | null): ProtocolRecord[] {
  requirePermission('admin:read', principal);
  return cloneValue(protocols);
}

export function updateProtocol(
  id: string,
  patch: Partial<Pick<ProtocolRecord, 'status' | 'gasThresholdGwei'>>,
  principal?: UserProfile | null
): ProtocolRecord {
  requirePermission('admin:write', principal);
  const index = protocols.findIndex((row) => row.id === id);
  if (index < 0) throw new AuthorizationError('FORBIDDEN', 'Protocol not found.');
  protocols[index] = { ...protocols[index], ...patch, lastSync: 'just now' };
  persistProtocols();
  return cloneValue(protocols[index]);
}

export function listApiKeys(principal?: UserProfile | null): ApiKeyRecord[] {
  requirePermission('admin:read', principal);
  return cloneValue(apiKeys);
}

export function createApiKey(input: { name: string; scopes: string; rateLimit: number }, principal?: UserProfile | null): ApiKeyRecord {
  requirePermission('admin:write', principal);
  const raw = `zm_live_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 8)}`;
  const row: ApiKeyRecord = {
    id: createId('key'),
    name: input.name,
    prefix: raw.slice(0, 14),
    secretHint: raw,
    scopes: input.scopes,
    rateLimit: input.rateLimit,
    status: 'ACTIVE',
    createdAt: todayStamp(),
    lastUsed: 'never',
  };
  apiKeys = [row, ...apiKeys];
  persistKeys();
  return cloneValue(row);
}

export function revokeApiKey(id: string, principal?: UserProfile | null): ApiKeyRecord {
  requirePermission('admin:write', principal);
  const index = apiKeys.findIndex((row) => row.id === id);
  if (index < 0) throw new AuthorizationError('FORBIDDEN', 'API key not found.');
  apiKeys[index] = { ...apiKeys[index], status: 'REVOKED' };
  persistKeys();
  return cloneValue(apiKeys[index]);
}

export function listAlertRoutes(principal?: UserProfile | null): AlertRoute[] {
  requirePermission('admin:read', principal);
  return cloneValue(alerts);
}

export function upsertAlertRoute(route: AlertRoute, principal?: UserProfile | null): AlertRoute {
  requirePermission('admin:write', principal);
  const index = alerts.findIndex((row) => row.id === route.id);
  if (index < 0) {
    const created = { ...route, id: route.id || createId('alrt') };
    alerts = [created, ...alerts];
    persistAlerts();
    return cloneValue(created);
  }
  alerts[index] = { ...route };
  persistAlerts();
  return cloneValue(alerts[index]);
}

export function listGateways(principal?: UserProfile | null): PaymentGateway[] {
  requirePermission('admin:read', principal);
  return cloneValue(gateways);
}

export function updateGateway(id: string, patch: Partial<PaymentGateway>, principal?: UserProfile | null): PaymentGateway {
  requirePermission('admin:write', principal);
  const index = gateways.findIndex((row) => row.id === id);
  if (index < 0) throw new AuthorizationError('FORBIDDEN', 'Gateway not found.');
  gateways[index] = { ...gateways[index], ...patch };
  persistGateways();
  return cloneValue(gateways[index]);
}

export function getEnabledGateway(rail: PaymentGateway['rail']): PaymentGateway | undefined {
  return gateways.find((row) => row.rail === rail && row.enabled);
}

export function listRefunds(principal?: UserProfile | null): RefundRequest[] {
  requirePermission('admin:read', principal);
  return cloneValue(refunds);
}

export function createRefund(
  input: Omit<RefundRequest, 'id' | 'status' | 'requestedAt'>,
  principal?: UserProfile | null
): RefundRequest {
  requirePermission('admin:write', principal);
  const row: RefundRequest = {
    ...input,
    id: createId('rfd'),
    status: 'PENDING',
    requestedAt: todayStamp(),
  };
  refunds = [row, ...refunds];
  persistRefunds();
  return cloneValue(row);
}

export function decideRefund(
  id: string,
  status: 'APPROVED' | 'DENIED',
  principal?: UserProfile | null
): RefundRequest {
  const user = requirePermission('admin:write', principal);
  const index = refunds.findIndex((row) => row.id === id);
  if (index < 0) throw new AuthorizationError('FORBIDDEN', 'Refund not found.');
  refunds[index] = {
    ...refunds[index],
    status,
    decidedAt: todayStamp(),
    decidedBy: user.name,
  };
  persistRefunds();
  return cloneValue(refunds[index]);
}

export function listTokenReports(principal?: UserProfile | null): TokenReportOverride[] {
  requirePermission('admin:read', principal);
  return cloneValue(tokenReports);
}

export function upsertTokenReport(
  input: Omit<TokenReportOverride, 'id' | 'updatedAt'> & { id?: string },
  principal?: UserProfile | null
): TokenReportOverride {
  requirePermission('admin:write', principal);
  const address = input.contractAddress.trim().toLowerCase();
  const existing = tokenReports.findIndex(
    (row) => row.id === input.id || row.contractAddress.toLowerCase() === address
  );
  const row: TokenReportOverride = {
    ...input,
    id: input.id || tokenReports[existing]?.id || createId('tr'),
    contractAddress: input.contractAddress.trim(),
    updatedAt: todayStamp(),
  };
  if (existing >= 0) tokenReports[existing] = row;
  else tokenReports = [row, ...tokenReports];
  persistTokenReports();
  return cloneValue(row);
}

export function deleteTokenReport(id: string, principal?: UserProfile | null): void {
  requirePermission('admin:write', principal);
  tokenReports = tokenReports.filter((row) => row.id !== id);
  persistTokenReports();
}

/** Public read used by the scan engine — does not mint privileges. */
export function peekTokenOverride(address: string): TokenReportOverride | null {
  const found = tokenReports.find((row) => row.contractAddress.toLowerCase() === address.trim().toLowerCase());
  return found ? cloneValue(found) : null;
}


