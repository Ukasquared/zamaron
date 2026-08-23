import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type RevealVariant = 'fade' | 'rise' | 'scale' | 'blur' | 'clip' | 'hero';

export interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  /** Stagger delay in ms before the reveal transition starts */
  delay?: number;
  /** Offset before the element is considered visible (px from viewport bottom) */
  offset?: number;
  /** Visual variant. Default 'rise' (18px up + opacity). */
  variant?: RevealVariant;
  /** Duration ms override — keeps motion premium & fast enough. */
  duration?: number;
  /** threshold override */
  threshold?: number;
  /** Disable reveal entirely (for reduced motion fallbacks externally) */
  disabled?: boolean;
}

/**
 * Premium scroll-triggered reveal.
 * Choreographed, deliberate entrances using only transform/opacity/filter (GPU).
 * Variants:
 *  - fade: opacity only, ultra subtle
 *  - rise: translateY(18px) + opacity (default, elegant)
 *  - scale: scale 0.97→1 + opacity + slight Y
 *  - blur: blur(8px)→0 + opacity + translate
 *  - clip: inset clipping + scale, depth reveal
 *  - hero: refined hero entrance — blur+scale+rise, longer stagger feel
 *
 * Respects prefers-reduced-motion: instantly visible without transition.
 * Uses IntersectionObserver once — zero scroll listeners.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  offset = 40,
  variant = 'rise',
  duration,
  threshold = 0.14,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      // element not yet in DOM — show after mount interval
      const id = window.setTimeout(() => setVisible(true), 120);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: `0px 0px -${offset}px 0px` },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [offset, threshold, disabled]);

  // Map variant to CSS handling — kept as inline style for perf control
  const variantClasses: Record<RevealVariant, string> = {
    fade: 'reveal',
    rise: 'reveal',
    scale: 'reveal reveal--scale',
    blur: 'reveal reveal--blur',
    clip: 'reveal reveal--clip',
    hero: 'reveal reveal--hero',
  };

  // duration map: fast enough, no bounce
  const defaultDuration: Record<RevealVariant, number> = {
    fade: 620,
    rise: 700,
    scale: 760,
    blur: 760,
    clip: 780,
    hero: 860,
  };

  const effectiveDuration = duration ?? defaultDuration[variant];

  return (
    <div
      ref={ref}
      className={cn(variantClasses[variant], visible && 'is-visible', className)}
      style={
        {
          transitionDelay: delay ? `${delay}ms` : undefined,
          transitionDuration: `${effectiveDuration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default Reveal;
