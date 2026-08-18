import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  iconColor?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'fresnel' | 'glass';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  deltaType = 'positive',
  icon,
  iconColor = 'text-primary',
  description,
  className,
  variant = 'glass',
}) => {
  return (
    <Card variant={variant} hoverEffect className={cn('p-4 flex flex-col justify-between', className)}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              'p-2 rounded-sm bg-[#060e20] border border-outline/50 flex items-center justify-center',
              iconColor
            )}
          >
            <Icon name={icon} size={20} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="font-display font-bold text-2xl text-white tracking-tight flex items-baseline gap-2">
          <span>{value}</span>
        </div>

        {(delta || description) && (
          <div className="flex items-center gap-2 mt-2 text-xs font-mono">
            {delta && (
              <span
                className={cn(
                  'flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold',
                  deltaType === 'positive' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
                  deltaType === 'negative' && 'bg-error/10 text-error border border-error/30',
                  deltaType === 'neutral' && 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                )}
              >
                <Icon
                  name={deltaType === 'positive' ? 'trending_up' : deltaType === 'negative' ? 'trending_down' : 'remove'}
                  size={14}
                />
                {delta}
              </span>
            )}
            {description && <span className="text-slate-400 truncate">{description}</span>}
          </div>
        )}
      </div>
    </Card>
  );
};
