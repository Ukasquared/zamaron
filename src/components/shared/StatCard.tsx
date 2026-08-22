import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
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
  variant?: 'default' | 'fresnel' | 'glass' | 'elevated' | 'subtle';
  animate?: boolean;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  deltaType = 'positive',
  icon,
  iconColor = 'text-cyan-400',
  description,
  className,
  variant = 'glass',
  animate = false,
  numericValue,
  prefix,
  suffix,
  decimals,
}) => {
  // Map variant to GlassCard variant
  const glassVariant =
    variant === 'fresnel'
      ? 'fresnel'
      : variant === 'elevated'
      ? 'elevated'
      : variant === 'subtle'
      ? 'subtle'
      : 'default';

  // Helper to parse numeric values from strings like "$64.2B", "1,420", "98.4 / 100" if requested
  const renderValue = () => {
    if (numericValue !== undefined) {
      return (
        <AnimatedCounter
          value={numericValue}
          prefix={prefix || ''}
          suffix={suffix || ''}
          decimals={decimals ?? (Number.isInteger(numericValue) ? 0 : 1)}
        />
      );
    }

    if (animate && typeof value === 'number') {
      return (
        <AnimatedCounter
          value={value}
          prefix={prefix || ''}
          suffix={suffix || ''}
          decimals={decimals ?? (Number.isInteger(value) ? 0 : 1)}
        />
      );
    }

    // If animate is true and string is parseable (e.g. "$64.2B", "1,420", "8,940", "98.4")
    if (animate && typeof value === 'string') {
      const match = value.match(/^([^\d.-]*)([\d,]+(?:\.\d+)?)(.*)$/);
      if (match) {
        const parsedPrefix = prefix !== undefined ? prefix : match[1];
        const numStr = match[2].replace(/,/g, '');
        const parsedNum = parseFloat(numStr);
        const parsedSuffix = suffix !== undefined ? suffix : match[3];
        const parsedDecimals = decimals ?? (match[2].includes('.') ? match[2].split('.')[1].length : 0);

        if (!isNaN(parsedNum)) {
          return (
            <AnimatedCounter
              value={parsedNum}
              prefix={parsedPrefix}
              suffix={parsedSuffix}
              decimals={parsedDecimals}
            />
          );
        }
      }
    }

    return <span>{value}</span>;
  };

  return (
    <GlassCard
      variant={glassVariant}
      hoverEffect
      blur="lg"
      className={cn('p-4 flex flex-col justify-between border-white/10 group', className)}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider group-hover:text-slate-300 transition-colors">
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              'p-2 rounded-lg bg-[#060e20]/80 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-cyan-500/40 group-hover:shadow-[0_0_12px_rgba(0,218,243,0.25)] transition-all',
              iconColor
            )}
          >
            <Icon name={icon} size={18} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="font-display font-black text-2xl text-white tracking-tight flex items-baseline gap-2">
          {renderValue()}
        </div>

        {(delta || description) && (
          <div className="flex items-center gap-2 mt-2 text-xs font-mono">
            {delta && (
              <span
                className={cn(
                  'flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold tracking-tight',
                  deltaType === 'positive' &&
                    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
                  deltaType === 'negative' &&
                    'bg-red-500/15 text-red-400 border border-red-500/30',
                  deltaType === 'neutral' &&
                    'bg-slate-500/15 text-slate-400 border border-slate-500/30'
                )}
              >
                <Icon
                  name={
                    deltaType === 'positive'
                      ? 'trending_up'
                      : deltaType === 'negative'
                      ? 'trending_down'
                      : 'remove'
                  }
                  size={13}
                />
                {delta}
              </span>
            )}
            {description && <span className="text-slate-400 truncate text-[11px]">{description}</span>}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default StatCard;
