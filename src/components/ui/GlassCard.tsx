import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'fresnel' | 'terminal' | 'cyber' | 'accent';
  hoverEffect?: boolean;
  glow?: 'cyan' | 'purple' | 'emerald' | 'amber' | 'error' | 'none';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  borderGradient?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'default',
      hoverEffect = false,
      glow = 'none',
      blur = 'lg',
      borderGradient = false,
      children,
      ...props
    },
    ref
  ) => {
    const blurMap = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl',
    };

    const variantStyles = {
      default:
        'bg-gradient-to-b from-white/[0.07] to-white/[0.02] bg-slate-900/60 border border-white/10 shadow-[0_10px_35px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]',
      elevated:
        'bg-gradient-to-b from-[#131f3f]/85 to-[#0a142c]/90 border border-cyan-400/20 shadow-[0_18px_45px_-15px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]',
      subtle:
        'bg-gradient-to-b from-white/[0.05] to-transparent bg-slate-950/45 border border-white/[0.07] shadow-[0_8px_25px_-15px_rgba(0,0,0,0.5)]',
      fresnel:
        'bg-gradient-to-b from-[#0e1b38]/85 to-[#081126]/90 border border-cyan-400/30 shadow-[0_0_28px_-6px_rgba(0,218,243,0.22),inset_0_0_18px_-8px_rgba(0,218,243,0.18),inset_0_1px_0_rgba(255,255,255,0.08)]',
      terminal:
        'bg-gradient-to-b from-[#081126]/92 to-[#050b1a]/95 border border-cyan-500/25 font-mono shadow-[inset_0_0_22px_rgba(0,218,243,0.07),inset_0_1px_0_rgba(255,255,255,0.06)]',
      cyber:
        'bg-gradient-to-b from-[#101d3d]/85 to-[#070e1f]/92 border border-cyan-400/25 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]',
      accent:
        'bg-gradient-to-br from-[#151f42]/85 via-[#0c1630]/85 to-[#221236]/85 border border-purple-400/30 shadow-[0_14px_40px_-14px_rgba(155,81,224,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]',
    };

    const glowStyles = {
      none: '',
      cyan: 'shadow-[0_0_28px_-4px_rgba(0,218,243,0.3)] border-cyan-400/40',
      purple: 'shadow-[0_0_28px_-4px_rgba(221,183,255,0.3)] border-purple-400/40',
      emerald: 'shadow-[0_0_28px_-4px_rgba(0,230,118,0.3)] border-emerald-400/40',
      amber: 'shadow-[0_0_28px_-4px_rgba(255,183,77,0.3)] border-amber-400/40',
      error: 'shadow-[0_0_28px_-4px_rgba(255,84,73,0.3)] border-red-400/40',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl text-slate-200 transition-all duration-300 relative overflow-hidden',
          blurMap[blur],
          variantStyles[variant],
          glowStyles[glow],
          borderGradient && 'relative before:absolute before:inset-0 before:p-[1px] before:rounded-[inherit] before:bg-gradient-to-r before:from-cyan-400/40 before:via-purple-500/30 before:to-transparent before:-z-10',
          hoverEffect &&
            'hover:-translate-y-1 hover:border-cyan-400/45 hover:shadow-[0_18px_45px_-15px_rgba(0,218,243,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]',
          className
        )}
        {...props}
      >
        {/* Subtle top reflection sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export const GlassCardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex items-center justify-between gap-3 mb-4', className)}
    {...props}
  />
);

export const GlassCardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={cn(
      'font-display font-bold text-lg text-white tracking-wide flex items-center gap-2',
      className
    )}
    {...props}
  />
);

export const GlassCardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn('text-xs text-slate-400 font-sans mt-1 leading-relaxed', className)}
    {...props}
  />
);

export const GlassCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn('space-y-4', className)} {...props} />;

export const GlassCardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs text-slate-400',
      className
    )}
    {...props}
  />
);
