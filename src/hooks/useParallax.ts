import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface UseParallaxOptions {
  /** Speed factor: negative = slower than scroll, positive = faster. 0.1 = subtle, 0.3 = noticeable. Keep -0.15 to 0.25 for readability. */
  speed?: number;
  /** clamp movement in px to avoid excessive drift */
  clamp?: number;
  /** enable/disable externally */
  enabled?: boolean;
}

/**
 * Lightweight scroll-parallax hook.
 * Uses a single global scroll listener + rAF per instance (cheap), drives only transform translate3d.
 * Respects prefers-reduced-motion by disabling drift.
 *
 * Usage: const ref = useParallax({ speed: -0.08 });
 *        <div ref={ref}>content</div>
 */
export function useParallax<T extends HTMLElement>({
  speed = -0.1,
  clamp = 60,
  enabled = true,
}: UseParallaxOptions = {}) {
  const ref = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced || !enabled) {
      el.style.transform = '';
      return;
    }

    let ticking = false;

    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // Center-based offset keeps motion smooth through viewport
      const viewportCenter = window.innerHeight * 0.5;
      const elCenter = rect.top + rect.height * 0.5;
      const delta = (elCenter - viewportCenter) * speed;
      const clamped = Math.max(-clamp, Math.min(clamp, delta));
      ref.current.style.transform = `translate3d(0, ${clamped}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = window.requestAnimationFrame(update);
    };

    // Immediate placement
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      if (ref.current) ref.current.style.transform = '';
    };
  }, [speed, clamp, enabled, prefersReduced]);

  return ref as React.MutableRefObject<T | null>;
}

export default useParallax;
