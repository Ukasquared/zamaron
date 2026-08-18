import React from 'react';
import { cn } from '@/lib/utils';

export interface QuorumProgressProps {
  current: number; // 0 - 100
  target: number; // 0 - 100
  forVotes: number;
  againstVotes: number;
  className?: string;
}

export const QuorumProgress: React.FC<QuorumProgressProps> = ({
  current,
  target,
  forVotes,
  againstVotes,
  className,
}) => {
  const total = forVotes + againstVotes || 1;
  const forPercent = (forVotes / total) * 100;
  const againstPercent = (againstVotes / total) * 100;
  const reached = current >= target;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400">
          Quorum Progress: <span className="text-white font-bold">{current.toFixed(1)}%</span>
        </span>
        <span className={cn('font-semibold', reached ? 'text-emerald-400' : 'text-amber-400')}>
          {reached ? 'QUORUM REACHED' : `TARGET: ${target}%`}
        </span>
      </div>

      {/* Target Marker Bar */}
      <div className="relative w-full h-3 bg-surface-variant rounded-full overflow-hidden border border-outline">
        <div
          className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(current, 100)}%` }}
        />
        {/* Target threshold indicator line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-10"
          style={{ left: `${target}%` }}
          title={`Target Quorum: ${target}%`}
        />
      </div>

      {/* For vs Against Breakdown */}
      <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          FOR: {forPercent.toFixed(1)}% ({forVotes.toLocaleString()})
        </span>
        <span className="flex items-center gap-1.5 text-error">
          <span className="w-2 h-2 rounded-full bg-error" />
          AGAINST: {againstPercent.toFixed(1)}% ({againstVotes.toLocaleString()})
        </span>
      </div>
    </div>
  );
};
