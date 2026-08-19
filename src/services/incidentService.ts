import type { IncidentSeverity, SecurityIncident } from '@/types';
import { DEMO_INCIDENTS } from '@/data/securityData';

/**
 * Security incident / exploit alert feed.
 *
 * Reads from DEMO_INCIDENTS today. Designed to be replaced by a real
 * incident-monitoring API or on-chain alert engine.
 */

export type IncidentFilter = IncidentSeverity | 'ALL';

export function getAllIncidents(): SecurityIncident[] {
  return [...DEMO_INCIDENTS].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getIncidentStats(incidents: SecurityIncident[]) {
  const totalFundsLost = incidents.reduce((sum, i) => sum + i.fundsLostUsd, 0);
  const critical = incidents.filter((i) => i.severity === 'CRITICAL').length;
  const ongoing = incidents.filter((i) => i.status === 'ONGOING').length;
  const last24h = incidents.filter((i) => {
    const ageMs = Date.now() - new Date(i.timestamp).getTime();
    return ageMs <= 24 * 60 * 60 * 1000;
  }).length;

  return { totalFundsLost, critical, ongoing, last24h, total: incidents.length };
}

export function filterIncidents(
  incidents: SecurityIncident[],
  filter: IncidentFilter,
  query: string
): SecurityIncident[] {
  const q = query.trim().toLowerCase();
  return incidents.filter((i) => {
    if (filter !== 'ALL' && i.severity !== filter) return false;
    if (!q) return true;
    return (
      i.projectName.toLowerCase().includes(q) ||
      i.summary.toLowerCase().includes(q) ||
      i.chain.toLowerCase().includes(q) ||
      i.type.toLowerCase().includes(q)
    );
  });
}

export function formatUsdShort(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(2)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount}`;
}

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
