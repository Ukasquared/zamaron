import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  /** Stagger delay in ms before the reveal transition starts */
  delay?: number;
  /** Offset before the element is considered visible (px from viewport bottom) */
  offset?: number;
}

/**
 * Subtle scroll-triggered entrance. Fades + rises the content into view once,
 * using the `.reveal` / `.is-visible` classes defined in index.css.
 * Falls back to fully visible content when IntersectionObserver is unavailable
 * or when the user prefers reduced motion.
 */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, offset = 40 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: `0px 0px -${offset}px 0px` }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [offset]);

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
