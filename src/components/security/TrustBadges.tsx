import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import type { TrustBadge } from '@/types';

export interface TrustBadgesProps {
  badges: TrustBadge[];
  size?: 'sm' | 'md';
  className?: string;
}

const BADGE_META: Record<
  TrustBadge['type'],
  { icon: string; label: string }
> = {
  AUDIT: { icon: 'fact_check', label: 'Audited' },
  KYC: { icon: 'badge', label: 'Team KYC' },
  BUG_BOUNTY: { icon: 'bug_report', label: 'Bug Bounty' },
  VERIFIED_CONTRACT: { icon: 'verified', label: 'Verified Contract' },
  FORMAL_VERIFICATION: { icon: 'verified_user', label: 'Formal Verification' },
};

/** Row of verified / missing trust signals (audit, KYC, bounty, etc.). */
export const TrustBadges: React.FC<TrustBadgesProps> = ({ badges, size = 'md', className }) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {badges.map((badge) => {
        const meta = BADGE_META[badge.type];
        return (
          <div
            key={badge.type}
            title={badge.detail ?? meta.label}
            className={cn(
              'inline-flex items-center gap-1.5 rounded border font-mono font-semibold transition-colors',
              size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
              badge.verified
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-700/20 text-slate-500 border-outline/60 line-through decoration-slate-600/60'
            )}
          >
            <Icon name={badge.verified ? meta.icon : 'remove_done'} size={size === 'sm' ? 13 : 15} />
            <span>{meta.label}</span>
            {badge.verified && badge.detail && (
              <span className="text-emerald-400/70 normal-case">· {badge.detail}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
