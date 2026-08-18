import React from 'react';
import { cn } from '@/lib/utils';
import { SeverityLevel } from '@/types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'critical'
    | 'high'
    | 'medium'
    | 'low'
    | 'info'
    | 'success'
    | 'warning'
    | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-surface-variant text-slate-300 border-outline',
    primary: 'bg-primary/10 text-primary border-primary/40 shadow-[0_0_8px_rgba(0,218,243,0.2)]',
    secondary: 'bg-secondary/10 text-secondary border-secondary/40 shadow-[0_0_8px_rgba(221,183,255,0.2)]',
    critical: 'bg-error/15 text-[#ff7167] border-error/50 shadow-[0_0_8px_rgba(255,84,73,0.3)]',
    high: 'bg-orange-500/15 text-orange-400 border-orange-500/40 shadow-[0_0_8px_rgba(249,115,22,0.2)]',
    medium: 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)]',
    low: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
    info: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]',
    warning: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40',
    outline: 'bg-transparent text-slate-400 border-outline',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] gap-1 tracking-wider',
    md: 'px-2.5 py-1 text-xs gap-1.5 tracking-wide',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-semibold uppercase rounded border transition-colors select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full bg-current',
            pulse && 'animate-pulse'
          )}
        />
      )}
      {children}
    </span>
  );
};

export const SeverityBadge: React.FC<{ severity: SeverityLevel; size?: 'sm' | 'md' }> = ({
  severity,
  size = 'sm',
}) => {
  const map: Record<SeverityLevel, { label: string; variant: BadgeProps['variant'] }> = {
    CRITICAL: { label: 'CRIT', variant: 'critical' },
    HIGH: { label: 'HIGH', variant: 'high' },
    MEDIUM: { label: 'MED', variant: 'medium' },
    LOW: { label: 'LOW', variant: 'low' },
    INFORMATIONAL: { label: 'INFO', variant: 'info' },
  };

  const config = map[severity] || { label: severity, variant: 'default' };

  return (
    <Badge variant={config.variant} size={size} dot>
      {config.label}
    </Badge>
  );
};
