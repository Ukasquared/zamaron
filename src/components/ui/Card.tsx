import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'crystalline' | 'fresnel' | 'terminal' | 'elevated' | 'subtle';
  hoverEffect?: boolean;
  glow?: 'cyan' | 'purple' | 'emerald' | 'none';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = false, glow = 'none', children, ...props }, ref) => {
    const variantStyles = {
      default:
        'bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.36)]',
      glass:
        'bg-slate-900/50 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]',
      crystalline:
        'bg-gradient-to-b from-[#101c38]/80 to-[#091024]/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl',
      fresnel:
        'bg-[#0a1329]/80 backdrop-blur-lg border border-cyan-400/30 shadow-[0_0_25px_-5px_rgba(0,218,243,0.2),inset_0_0_15px_-5px_rgba(0,218,243,0.1)]',
      terminal:
        'bg-[#060e20]/90 backdrop-blur-md border border-cyan-500/25 font-mono shadow-[inset_0_0_20px_rgba(0,218,243,0.06)]',
      elevated:
        'bg-[#0c162d]/85 backdrop-blur-xl border border-cyan-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)]',
      subtle:
        'bg-slate-950/40 backdrop-blur-md border border-white/5 shadow-md',
    };

    const glowStyles = {
      none: '',
      cyan: 'shadow-[0_0_25px_rgba(0,218,243,0.25)] border-cyan-400/40',
      purple: 'shadow-[0_0_25px_rgba(221,183,255,0.25)] border-purple-400/40',
      emerald: 'shadow-[0_0_25px_rgba(0,230,118,0.25)] border-emerald-400/40',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-5 text-slate-200 transition-all duration-300 relative overflow-hidden',
          variantStyles[variant],
          glowStyles[glow],
          hoverEffect &&
            'hover:border-cyan-400/50 hover:shadow-[0_12px_35px_rgba(0,218,243,0.15)] hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {/* Subtle top reflection sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn('flex items-center justify-between gap-3 mb-4', className)} {...props} />;

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
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

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p className={cn('text-xs text-slate-400 font-sans mt-1 leading-relaxed', className)} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn('space-y-4', className)} {...props} />;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs text-slate-400', className)}
    {...props}
  />
);
