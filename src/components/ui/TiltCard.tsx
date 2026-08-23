import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** max tilt in degrees */
  tiltMax?: number;
  /** scale on hover */
  scale?: number;
  /** glare effect layer */
  glare?: boolean;
}

/**
 * TiltCard: subtle 3D tilt responding to cursor position.
 * Lightweight: only transform rotateX/rotateY + scale. Uses rAF.
 * Disabled on touch / reduced-motion / small screens via media query.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  tiltMax = 5,
  scale = 1.015,
  glare = true,
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    // Skip tilt on touch devices (coarse pointer)
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    let bounds: DOMRect | null = null;

    const updateBounds = () => {
      if (ref.current) bounds = ref.current.getBoundingClientRect();
    };

    const onMove = (e: MouseEvent) => {
      if (!el || !bounds) return;
      const x = (e.clientX - bounds.left) / bounds.width; // 0..1
      const y = (e.clientY - bounds.top) / bounds.height;
      const rotY = (x - 0.5) * tiltMax * 2; // -tilt..tilt
      const rotX = (0.5 - y) * tiltMax * 2;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        // glare position
        if (glare) {
          ref.current.style.setProperty('--tilt-mx', `${x * 100}%`);
          ref.current.style.setProperty('--tilt-my', `${y * 100}%`);
        }
      });
    };

    const onEnter = () => {
      updateBounds();
      el.style.transition = 'transform 0.18s cubic-bezier(0.16,1,0.3,1)';
      // briefly allow transition then switch to rAF-driven
      window.setTimeout(() => {
        if (ref.current) ref.current.style.transition = 'transform 0.05s linear';
      }, 180);
    };

    const onLeave = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      el.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      if (glare) {
        el.style.setProperty('--tilt-mx', '50%');
        el.style.setProperty('--tilt-my', '50%');
      }
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [tiltMax, scale, glare, prefersReduced]);

  return (
    <div
      ref={ref}
      className={cn('relative will-change-transform [transform-style:preserve-3d]', className)}
      style={{
        transform: 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)',
        // glare vars
        ...({
          '--tilt-mx': '50%',
          '--tilt-my': '50%',
        } as React.CSSProperties),
        ...style,
      }}
      {...props}
    >
      {/* subtle cursor glare */}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(520px circle at var(--tilt-mx) var(--tilt-my), rgba(0,218,243,0.10), transparent 65%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

export default TiltCard;
