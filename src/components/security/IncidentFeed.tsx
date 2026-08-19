import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import { formatUsdShort, timeAgo } from '@/services/incidentService';
import type { SecurityIncident } from '@/types';

export interface IncidentFeedProps {
  incidents: SecurityIncident[];
  maxItems?: number;
  className?: string;
}

const SEVERITY_VARIANT = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'info',
} as const;

const STATUS_VARIANT = {
  ONGOING: 'critical',
  CONTAINED: 'warning',
  UNDER_INVESTIGATION: 'info',
  RESOLVED: 'success',
} as const;

const TYPE_ICON: Record<SecurityIncident['type'], string> = {
  EXPLOIT: 'bug_report',
  RUGPULL: 'mood_bad',
  PHISHING: 'phishing',
  BRIDGE_HACK: 'cable',
  ORACLE_MANIPULATION: 'query_stats',
  FLASH_LOAN: 'bolt',
  PRIVATE_KEY_COMPROMISE: 'key_off',
};

/** Terminal-style feed of security incidents (exploits, rugpulls, hacks). */
export const IncidentFeed: React.FC<IncidentFeedProps> = ({
  incidents,
  maxItems,
  className,
}) => {
  const items = maxItems ? incidents.slice(0, maxItems) : incidents;

  if (items.length === 0) {
    return (
      <div
        className={cn(
          'bg-[#060e20] border border-outline/60 rounded p-6 text-center text-xs font-mono text-slate-500',
          className
        )}
      >
        No incidents match the current filters.
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((incident) => (
        <div
          key={incident.id}
          className="flex gap-3 p-3 rounded bg-[#060e20] border border-outline/60 hover:border-primary/40 transition-colors"
        >
          <div
            className={cn(
              'p-2 rounded self-start',
              incident.severity === 'CRITICAL'
                ? 'bg-error/15 text-error'
                : incident.severity === 'HIGH'
                ? 'bg-orange-500/15 text-orange-400'
                : 'bg-amber-500/15 text-amber-300'
            )}
          >
            <Icon name={TYPE_ICON[incident.type]} size={18} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display font-bold text-sm text-white">{incident.projectName}</span>
              <Badge variant={SEVERITY_VARIANT[incident.severity]} size="sm">
                {incident.type.replace(/_/g, ' ')}
              </Badge>
              <Badge variant={STATUS_VARIANT[incident.status]} size="sm">
                {incident.status.replace(/_/g, ' ')}
              </Badge>
            </div>

            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{incident.summary}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Icon name="schedule" size={12} /> {timeAgo(incident.timestamp)}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="link" size={12} /> {incident.chain}
              </span>
              {incident.fundsLostUsd > 0 ? (
                <span className="text-error font-bold">
                  {formatUsdShort(incident.fundsLostUsd)} lost
                </span>
              ) : (
                <span className="text-emerald-400 font-bold">No funds lost</span>
              )}
              {incident.txHash && <span className="text-primary">{incident.txHash}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentFeed;
