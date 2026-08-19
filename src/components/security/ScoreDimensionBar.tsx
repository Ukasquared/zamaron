import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import type { ScoreDimension } from '@/types';

export interface ScoreDimensionBarProps {
  dimension: ScoreDimension;
  compact?: boolean;
}

function barColor(value: number): string {
  if (value >= 80) return 'from-emerald-500 to-emerald-400';
  if (value >= 65) return 'from-primary to-cyan-300';
  if (value >= 50) return 'from-amber-500 to-amber-300';
  if (value >= 35) return 'from-orange-500 to-orange-400';
  return 'from-error to-red-500';
}

/** A single labelled, weighted score dimension with an inline progress bar. */
export const ScoreDimensionBar: React.FC<ScoreDimensionBarProps> = ({ dimension, compact = false }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs font-mono font-semibold text-slate-200 truncate">
            {dimension.label}
          </span>
          <button
            type="button"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            onFocus={() => setShowInfo(true)}
            onBlur={() => setShowInfo(false)}
            className="text-slate-500 hover:text-primary cursor-pointer"
            aria-label={`What is ${dimension.label}?`}
          >
            <Icon name="info" size={13} />
          </button>
          {showInfo && (
            <span className="absolute z-20 mt-8 ml-0 max-w-xs bg-[#0b1326] border border-primary/40 rounded p-2 text-[10px] font-sans text-slate-300 shadow-[0_0_15px_rgba(0,218,243,0.15)]">
              {dimension.description}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!compact && (
            <span className="text-[10px] font-mono text-slate-500">
              w{Math.round(dimension.weight * 100)}%
            </span>
          )}
          <span
            className={cn(
              'text-xs font-mono font-bold w-8 text-right',
              dimension.value >= 80
                ? 'text-emerald-400'
                : dimension.value >= 65
                ? 'text-primary'
                : dimension.value >= 50
                ? 'text-amber-300'
                : 'text-error'
            )}
          >
            {dimension.value}
          </span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', barColor(dimension.value))}
          style={{ width: `${dimension.value}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreDimensionBar;
