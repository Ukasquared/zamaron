import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface UseInViewOnceOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Single-element in-view detector for count-up / entrances.
 * Returns [ref, isVisible]. Disconnects after first entry when once=true.
 * Respects reduced motion: returns true immediately (no waiting).
 */
export function useInViewOnce<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
}: UseInViewOnceOptions = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      // No element yet — wait for mount
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once && entry) {
          setVisible(entry.isIntersecting);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, prefersReduced]);

  // Also attempt to handle lazy-mounted refs after first render
  useEffect(() => {
    if (visible || prefersReduced) return;
    if (!ref.current) return;

    // If effect above missed due to null at mount, retry
    const timer = window.setTimeout(() => {
      if (ref.current && typeof IntersectionObserver !== 'undefined' && !visible) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              setVisible(true);
              observer.disconnect();
            }
          },
          { threshold, rootMargin },
        );
        observer.observe(ref.current);
      }
    }, 100);

    return () => window.clearTimeout(timer);
  }, [visible, prefersReduced, threshold, rootMargin]);

  return [ref, visible] as const;
}

export default useInViewOnce;
