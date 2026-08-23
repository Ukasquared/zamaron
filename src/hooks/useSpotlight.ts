import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Cursor-responsive spotlight hook.
 * Writes --mx / --my CSS variables (in %) to the host element.
 * Consumed by CSS radial gradients for subtle glow following the cursor.
 * Respects reduced motion: disables movement, keeps faint static center.
 */
export function useSpotlight<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || prefersReduced) {
      if (el) {
        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '50%');
        el.style.removeProperty('--spotlight-opacity');
      }
      return;
    }

    let raf: number | null = null;
    let targetX = 50;
    let targetY = 50;

    const update = () => {
      if (!ref.current) return;
      ref.current.style.setProperty('--mx', `${targetX}%`);
      ref.current.style.setProperty('--my', `${targetY}%`);
      raf = null;
    };

    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // convert inside-element coords to 0-100%
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
      targetX = Math.max(0, Math.min(100, targetX));
      targetY = Math.max(0, Math.min(100, targetY));
      if (raf === null) raf = requestAnimationFrame(update);
    };

    const onEnter = () => {
      el.style.setProperty('--spotlight-opacity', '1');
    };
    const onLeave = () => {
      el.style.setProperty('--spotlight-opacity', '0');
      // Reset to center for a gentle fade
      targetX = 50;
      targetY = 50;
      if (raf === null) raf = requestAnimationFrame(update);
    };

    // default hidden until hover
    el.style.setProperty('--spotlight-opacity', '0');
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [enabled, prefersReduced]);

  return ref;
}

export default useSpotlight;
