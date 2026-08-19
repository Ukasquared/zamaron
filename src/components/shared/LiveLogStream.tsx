import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { SecurityLogEntry } from '@/types';
import { mockLogs } from '@/mock/data';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';

export interface LiveLogStreamProps {
  logs?: SecurityLogEntry[];
  maxHeight?: string;
  className?: string;
  showFilters?: boolean;
}

export const LiveLogStream: React.FC<LiveLogStreamProps> = ({
  logs = mockLogs,
  maxHeight = 'max-h-80',
  className,
  showFilters = true,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'CRIT' | 'WARN' | 'INFO'>('ALL');
  const [isLive, setIsLive] = useState(true);

  const filteredLogs = logs.filter((log) => {
    if (filter === 'ALL') return true;
    return log.severity === filter;
  });

  return (
    <div
      className={cn(
        'bg-[#060e20] border border-primary/20 rounded-md overflow-hidden font-mono text-xs shadow-inner flex flex-col',
        className
      )}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b1326] border-b border-outline/60">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-error/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
          </span>
          <span className="text-slate-300 font-bold text-[11px] tracking-wider uppercase ml-1 flex items-center gap-1.5">
            <Icon name="terminal" size={16} className="text-primary" />
            Live Security Audit Trail
          </span>
          <span
            onClick={() => setIsLive(!isLive)}
            className={cn(
              'px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest cursor-pointer ml-2 border',
              isLive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                : 'bg-slate-700/40 text-slate-400 border-slate-600'
            )}
          >
            {isLive ? 'LIVE FEED' : 'PAUSED'}
          </span>
        </div>

        {showFilters && (
          <div className="flex items-center gap-1">
            {(['ALL', 'CRIT', 'WARN', 'INFO'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors cursor-pointer',
                  filter === lvl
                    ? 'bg-primary text-[#00363d]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-surface-variant'
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Log Stream Content */}
      <div className={cn('p-3 overflow-y-auto space-y-2 cyber-scrollbar', maxHeight)}>
        {filteredLogs.length === 0 ? (
          <div className="text-center py-6 text-slate-500">No telemetry logs matching filter.</div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 py-1.5 px-2 rounded hover:bg-[#0c162d] transition-colors border border-transparent hover:border-outline/40"
            >
              <span className="text-slate-500 text-[10px] shrink-0">{log.timestamp}</span>

              <Badge
                variant={
                  log.severity === 'CRIT'
                    ? 'critical'
                    : log.severity === 'WARN'
                    ? 'warning'
                    : 'info'
                }
                size="sm"
                className="shrink-0"
              >
                {log.severity}
              </Badge>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{log.eventSource}:</span>
                  <span className="text-slate-200 truncate">{log.action}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-3">
                  <span>Actor: <span className="text-slate-300">{log.actor}</span></span>
                  <span>IP: <span className="text-slate-300">{log.ipAddress}</span></span>
                  <span>Status: <span className={cn('font-bold', log.status === 'BLOCKED' ? 'text-error' : 'text-emerald-400')}>{log.status}</span></span>
                </div>
              </div>

              <span className="text-[10px] text-slate-500 font-mono shrink-0 hidden sm:inline">
                {log.hash}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
