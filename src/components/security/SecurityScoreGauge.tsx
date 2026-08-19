import React from 'react';
import { cn } from '@/lib/utils';
import { tierColor, tierLabel } from '@/services/securityScoreService';
import type { SecurityTier } from '@/types';

export interface SecurityScoreGaugeProps {
  score: number;
  tier: SecurityTier;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

/**
 * Circular progress gauge for a project's composite security score.
 * Purely presentational — scoring logic lives in securityScoreService.
 */
export const SecurityScoreGauge: React.FC<SecurityScoreGaugeProps> = ({
  score,
  tier,
  size = 168,
  strokeWidth = 10,
  className,
  label = 'Security Score',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;
  const colorClass = tierColor(tier);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#22304d"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(colorClass, 'transition-all duration-700')}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={cn('font-display font-black text-3xl leading-none', colorClass)}>
          {clamped.toFixed(1)}
        </span>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">
          {label}
        </span>
        <span className={cn('text-xs font-mono font-bold mt-0.5', colorClass)}>
          {tier} · {tierLabel(tier)}
        </span>
      </div>
    </div>
  );
};

export default SecurityScoreGauge;
