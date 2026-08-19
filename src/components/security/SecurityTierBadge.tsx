import React from 'react';
import { cn } from '@/lib/utils';
import { tierBadgeVariant, tierLabel } from '@/services/securityScoreService';
import { Badge } from '@/components/ui/Badge';
import type { SecurityTier } from '@/types';

export interface SecurityTierBadgeProps {
  tier: SecurityTier;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/** Letter-tier badge (AAA–D) with the semantic color mapping from the score engine. */
export const SecurityTierBadge: React.FC<SecurityTierBadgeProps> = ({
  tier,
  showLabel = false,
  size = 'sm',
  className,
}) => {
  return (
    <Badge
      variant={tierBadgeVariant(tier)}
      size={size}
      className={cn('font-bold tracking-wider', className)}
    >
      {tier}
      {showLabel && <span className="opacity-70 font-normal ml-1">· {tierLabel(tier)}</span>}
    </Badge>
  );
};

export default SecurityTierBadge;
