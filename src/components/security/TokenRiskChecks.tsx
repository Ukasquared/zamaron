import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import type { TokenScanResult } from '@/services/tokenScanService';

export interface TokenRiskChecksProps {
  result: TokenScanResult;
  className?: string;
}

const STATUS_STYLES = {
  pass: {
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    icon: 'check_circle',
  },
  warn: {
    text: 'text-amber-300',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    icon: 'warning',
  },
  fail: {
    text: 'text-error',
    border: 'border-error/40',
    bg: 'bg-error/5',
    icon: 'dangerous',
  },
} as const;

/**
 * Grid of contract-level risk checks (honeypot, mint, blacklist, liquidity
 * lock, holder concentration, etc.) driven by a TokenScanResult.
 */
export const TokenRiskChecks: React.FC<TokenRiskChecksProps> = ({ result, className }) => {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
          Contract Risk Checks
        </h4>
        {result.flaggedCount > 0 ? (
          <Badge variant={result.flaggedCount >= 4 ? 'critical' : 'warning'} size="sm">
            {result.flaggedCount} FLAGGED
          </Badge>
        ) : (
          <Badge variant="success" size="sm">ALL CLEAR</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
        {result.checks.map((check) => {
          const style = STATUS_STYLES[check.status];
          return (
            <div
              key={check.label}
              className={cn(
                'flex items-center justify-between gap-2 p-2.5 rounded border',
                style.border,
                style.bg
              )}
            >
              <span className="flex items-center gap-2 text-slate-300 min-w-0">
                <Icon name={style.icon} size={15} className={cn('shrink-0', style.text)} />
                <span className="truncate">{check.label}</span>
              </span>
              <span className={cn('font-bold shrink-0', style.text)}>{check.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TokenRiskChecks;
