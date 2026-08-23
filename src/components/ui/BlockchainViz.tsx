import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface BlockchainVizProps {
  className?: string;
  /** restricts canvas drawing complexity for perf */
  density?: 'low' | 'medium' | 'high';
}

/**
 * BlockchainViz — lightweight canvas network: nodes + traveling packets.
 * Simple elegant Web3/security visualization: no WebGL, no heavy libs.
 * Keeps under 45 nodes, draws only stroke + circles, runs at 30-45fps throttle.
 * Respects reduced motion: renders static frame.
 */
export const BlockchainViz: React.FC<BlockchainVizProps> = ({ className, density = 'medium' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const isLowPerf = density === 'low' || window.innerWidth < 768;

    const config = {
      nodes: isLowPerf ? 18 : density === 'high' ? 42 : 28,
      linkDist: isLowPerf ? 170 : 190,
      speed: 0.35,
    };

    type Node = { x: number; y: number; vx: number; vy: number; pulsePhase: number };
    let nodes: Node[] = [];
    let packets: { a: number; b: number; t: number; dir: number }[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // seed nodes
      nodes = Array.from({ length: config.nodes }, (_, i) => {
        // arrange loosely in centered field, slightly denser near middle
        const margin = 40;
        const x = margin + Math.random() * (width - margin * 2);
        const y = margin + Math.random() * (height - margin * 2);
        const angle = Math.random() * Math.PI * 2;
        const spd = 0.12 + Math.random() * config.speed;
        return {
          x,
          y,
          vx: Math.cos(angle) * spd * 0.45,
          vy: Math.sin(angle) * spd * 0.45,
          pulsePhase: (i / config.nodes) * Math.PI * 2,
        };
      });

      packets = nodes
        .slice(0, Math.min(10, nodes.length))
        .map((_, i) => ({
          a: i % nodes.length,
          b: (i + 2) % nodes.length,
          t: Math.random(),
          dir: Math.random() > 0.5 ? 1 : -1,
        }));
    };

    const draw = (time: number) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // subtle grid? No — keep clean.

      // move nodes (unless reduced)
      if (!prefersReduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 30 || n.x > width - 30) n.vx *= -1;
          if (n.y < 30 || n.y > height - 30) n.vy *= -1;
          // gentle containment
          n.x = Math.max(28, Math.min(width - 28, n.x));
          n.y = Math.max(28, Math.min(height - 28, n.y));
        }
        for (const p of packets) {
          p.t += 0.0045 * p.dir;
          if (p.t > 1) p.t = 0;
          if (p.t < 0) p.t = 1;
        }
      }

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < config.linkDist) {
            const alpha = (1 - dist / config.linkDist) * 0.18; // very subtle
            // slight cyan shift for nearby, softer for far
            ctx.strokeStyle = `rgba(0,218,243,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // packet dots traveling along a link
      if (!isLowPerf) {
        for (const p of packets) {
          const a = nodes[p.a];
          const b = nodes[p.b];
          if (!a || !b) continue;
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          // glow
          const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
          g.addColorStop(0, 'rgba(0,218,243,0.95)');
          g.addColorStop(0.35, 'rgba(0,218,243,0.28)');
          g.addColorStop(1, 'rgba(0,218,243,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.95)';
          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = prefersReduced ? 0 : Math.sin(time * 0.0012 + n.pulsePhase) * 0.5 + 0.5;

        // outer glow
        const outerAlpha = 0.14 + pulse * 0.10;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18);
        grad.addColorStop(0, `rgba(0,218,243,${outerAlpha})`);
        grad.addColorStop(1, 'rgba(0,218,243,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
        ctx.fill();

        // core node
        ctx.fillStyle = i % 3 === 0 ? 'rgba(6,14,32,0.96)' : 'rgba(12,20,46,0.96)';
        ctx.strokeStyle = i % 3 === 0 ? 'rgba(0,218,243,0.85)' : 'rgba(148,163,184,0.23)';
        ctx.lineWidth = i % 3 === 0 ? 1.1 : 0.8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, i % 3 === 0 ? 5.2 : 3.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // inner shine for primary nodes
        if (i % 3 === 0) {
          const shine = 0.55 + pulse * 0.45;
          ctx.fillStyle = `rgba(0,218,243,${0.15 * shine})`;
          ctx.beginPath();
          ctx.arc(n.x - 1.2, n.y - 1.3, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let lastTime = performance.now();
    const fpsInterval = 1000 / 44; // throttle

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      // throttle frame rate slightly for power saving
      if (now - lastTime < fpsInterval - 4) return;
      lastTime = now;
      draw(now);
    };

    resize();
    draw(performance.now());

    if (prefersReduced) {
      // static single render
      return;
    }

    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced, density]);

  return (
    <div className={className} aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
      <canvas ref={canvasRef} className="block w-full h-full" style={{ display: 'block' }} />
      {/* subtle vignette so nodes never compete with text */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_18%,transparent_38%,rgba(6,14,32,0.72)_86%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060e20]" />
    </div>
  );
};

export default BlockchainViz;
