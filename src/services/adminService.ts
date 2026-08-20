import type { SecurityLogEntry, UserProfile } from '@/types';
import { mockLogs } from '@/mock/data';
import { requirePermission } from '@/services/authorization';

export interface BillingTransaction {
  id: string;
  client: string;
  tier: string;
  amount: string;
  status: string;
  date: string;
  rail: string;
}

const BILLING_LEDGER: BillingTransaction[] = [
  {
    id: 'INV-8994-VX',
    client: 'Nexus DeFi Protocol',
    tier: 'Enterprise Audit',
    amount: '$50,000',
    status: 'SETTLED',
    date: '2026-08-16',
    rail: 'USDC',
  },
  {
    id: 'INV-8993-ST',
    client: 'Aegis Staking Derivative',
    tier: 'Professional Audit',
    amount: '$25,000',
    status: 'SETTLED',
    date: '2026-08-14',
    rail: 'ETH',
  },
  {
    id: 'INV-8991-OP',
    client: 'Hyperion Flash Lending',
    tier: 'Standard Retainer',
    amount: '$12,500',
    status: 'SETTLED',
    date: '2026-08-10',
    rail: 'WIRE',
  },
];

export interface SecurityConfigState {
  fido2Required: boolean;
  autoMitigate: boolean;
  ipWhitelisting: boolean;
  rateLimitStrict: boolean;
}

let securityConfig: SecurityConfigState = {
  fido2Required: true,
  autoMitigate: true,
  ipWhitelisting: true,
  rateLimitStrict: false,
};

export function getSecurityLogs(principal?: UserProfile | null): SecurityLogEntry[] {
  requirePermission('admin:read', principal);
  return mockLogs;
}

export function getBillingHistory(principal?: UserProfile | null): BillingTransaction[] {
  requirePermission('admin:read', principal);
  return BILLING_LEDGER;
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
  return { ...securityConfig };
}
