import React from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'fresnel' | 'terminal' | 'cyber' | 'accent';
  hoverEffect?: boolean;
  glow?: 'cyan' | 'purple' | 'emerald' | 'amber' | 'error' | 'none';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  borderGradient?: boolean;
  /** cursor spotlight glow following pointer — subtle premium hover */
  spotlight?: boolean;
  /** subtle 3D tilt on hover — premium depth, respects reduced motion */
  tilt?: boolean;
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
      spotlight = true,
      tilt = false,
      children,
      style,
      ...props
    },
    forwardedRef,
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

    const prefersReduced = usePrefersReducedMotion();
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const rafRef = React.useRef<number | null>(null);

    // Merge forwarded ref + internal ref
    const combinedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef && typeof forwardedRef === 'object') {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
        if (node && spotlight && !prefersReduced) {
          node.style.setProperty('--mx', '50%');
          node.style.setProperty('--my', '50%');
          node.style.setProperty('--spotlight-opacity', '0');
        }
      },
      [forwardedRef, spotlight, prefersReduced],
    );

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
      (e) => {
        const el = e.currentTarget;
        const isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
        if (isCoarse || prefersReduced) return;

        const rect = el.getBoundingClientRect();
        const xPct = ((e.clientX - rect.left) / rect.width) * 100;
        const yPct = ((e.clientY - rect.top) / rect.height) * 100;

        if (spotlight) {
          // rAF for spotlight coords to keep smooth, but immediate is also cheap.
          // Use direct style set (no rAF needed for spotlight, just precise).
          el.style.setProperty('--mx', `${Math.max(0, Math.min(100, xPct))}%`);
          el.style.setProperty('--my', `${Math.max(0, Math.min(100, yPct))}%`);
        }

        if (!tilt) return;

        const tiltMax = 4.6;
        const rotY = (xPct / 100 - 0.5) * tiltMax * 2;
        const rotX = (0.5 - yPct / 100) * tiltMax * 2;
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          if (!el) return;
          el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
        });
      },
      [tilt, spotlight, prefersReduced],
    );

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
      (e) => {
        const el = e.currentTarget;
        if (spotlight && !prefersReduced) {
          el.style.setProperty('--spotlight-opacity', '1');
        }
        if (tilt && !prefersReduced) {
          const isCoarse = window.matchMedia('(pointer: coarse)').matches;
          if (isCoarse) return;
          el.style.transition = 'transform 0.18s cubic-bezier(0.16,1,0.3,1)';
          window.setTimeout(() => {
            if (el) el.style.transition = 'transform 0.07s linear';
          }, 180);
        }
      },
      [tilt, spotlight, prefersReduced],
    );

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
      (e) => {
        const el = e.currentTarget;
        if (spotlight && !prefersReduced) {
          el.style.setProperty('--spotlight-opacity', '0');
          el.style.setProperty('--mx', '50%');
          el.style.setProperty('--my', '50%');
        }
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        if (tilt && !prefersReduced) {
          el.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
          el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
          window.setTimeout(() => {
            if (el) el.style.transition = '';
          }, 550);
        }
      },
      [tilt, spotlight, prefersReduced],
    );

    return (
      <div
        ref={combinedRef}
        className={cn(
          'rounded-xl text-slate-200 relative overflow-hidden group',
          blurMap[blur],
          variantStyles[variant],
          glowStyles[glow],
          borderGradient &&
            'relative before:absolute before:inset-0 before:p-[1px] before:rounded-[inherit] before:bg-gradient-to-r before:from-cyan-400/40 before:via-purple-500/30 before:to-transparent before:-z-10',
          hoverEffect &&
            'transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-cyan-400/45 hover:shadow-[0_18px_45px_-15px_rgba(0,218,243,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]',
          spotlight && 'spotlight-card',
          tilt && !prefersReduced && 'will-change-transform',
          className,
        )}
        // Initial transform for tilt base + spotlight css vars fallback
        style={
          {
            transform: tilt && !prefersReduced ? 'perspective(900px) rotateX(0) rotateY(0) translateY(0)' : undefined,
            ...(spotlight && !prefersReduced
              ? ({
                  '--mx': '50%',
                  '--my': '50%',
                  '--spotlight-opacity': '0',
                } as React.CSSProperties)
              : {}),
            ...style,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {/* Subtle top reflection sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        {/* Extra subtle hover sheen across card */}
        {hoverEffect && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 48%, transparent 58%)`,
              mixBlendMode: 'overlay' as const,
            }}
          />
        )}
        <div className="relative h-full">{children}</div>
      </div>
    );
  },
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
      className,
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
      className,
    )}
    {...props}
  />
);
