import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import type { ActiveMonitor, MonitorTarget } from '@/types';

export interface ActiveMonitorsProps {
  monitors: ActiveMonitor[];
  className?: string;
}

const MONITOR_ICON: Record<MonitorTarget, string> = {
  WEBSITE: 'language',
  CODE_REPOSITORY: 'code',
  SMART_CONTRACT: 'smartphone',
  SOCIAL_MEDIA: 'campaign',
};

const STATUS_STYLES: Record<ActiveMonitor['status'], { dot: string; text: string; label: string }> = {
  ACTIVE: { dot: 'bg-emerald-400', text: 'text-emerald-400', label: 'Active' },
  INACTIVE: { dot: 'bg-slate-500', text: 'text-slate-500', label: 'Not Activated' },
  ALERT: { dot: 'bg-error animate-pulse', text: 'text-error', label: 'Alert' },
};

/** Grid of on-/off-chain asset monitors (website, repo, contracts, social). */
export const ActiveMonitors: React.FC<ActiveMonitorsProps> = ({ monitors, className }) => {
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {monitors.map((monitor) => {
        const style = STATUS_STYLES[monitor.status];
        return (
          <div
            key={monitor.target}
            className="flex items-center gap-3 p-3 rounded bg-[#060e20] border border-outline/60"
          >
            <div className="p-2 rounded bg-surface-variant border border-outline/50 text-primary">
              <Icon name={MONITOR_ICON[monitor.target]} size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-mono font-semibold text-slate-200 truncate">
                {monitor.label}
              </div>
              <div className={cn('flex items-center gap-1.5 text-[10px] font-mono mt-0.5', style.text)}>
                <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} />
                {style.label}
                <span className="text-slate-600">· {monitor.lastChecked}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveMonitors;
