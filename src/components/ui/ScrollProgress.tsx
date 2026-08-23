import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Use transform scaleX for perf (GPU)
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (el) el.style.transform = `scaleX(${p})`;
        ticking = false;
      });
    };

    // Immediate
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    if (prefersReduced) {
      el.style.transition = 'none';
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full origin-left"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 shadow-[0_0_14px_rgba(0,218,243,0.65)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export default ScrollProgress;
