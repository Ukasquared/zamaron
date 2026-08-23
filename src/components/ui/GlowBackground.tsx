import React from 'react';
import { cn } from '@/lib/utils';
import web3Image from '@/assets/web3-image.jpg';
import { Parallax } from '@/components/ui/Parallax';
import { BlockchainViz } from '@/components/ui/BlockchainViz';

export interface GlowBackgroundProps {
  variant?: 'hero' | 'subtle' | 'matrix' | 'mesh';
  className?: string;
  children?: React.ReactNode;
}

/**
 * GlowBackground — premium luminous field with scroll-driven depth.
 *
 * Motion principles:
 *  - Decorative layers drift with subtle parallax (image slowest, orbs faster, grid slowest)
 *  - Hero variant embeds BlockchainViz canvas with elegant node network
 *  - Orbs breathe (opacity/scale) and drift slowly; respects reduced motion
 *  - Only transforms/opacity/filter used; no layout jank
 */
export const GlowBackground: React.FC<GlowBackgroundProps> = ({
  variant = 'hero',
  className,
  children,
}) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Background ambient lighting — pointer events off, behind content */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {variant === 'hero' && (
          <>
            {/* Layer 1: Frosted product imagery — slowest parallax for depth */}
            <Parallax speed={-0.04} clamp={28} className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[1280px] max-w-none h-[78%] min-h-[560px] [mask-image:radial-gradient(75%_70%_at_50%_30%,black,transparent_78%)]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={web3Image}
                  alt=""
                  className="w-full h-full object-cover object-top opacity-[0.20] blur-[3px] saturate-[0.9] brightness-[0.86] select-none scale-[1.02]"
                  draggable={false}
                  loading="eager"
                  decoding="async"
                />
                {/* image veil + subtle gradient to keep premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-[#060e20]/10 to-transparent" />
              </div>
            </Parallax>

            {/* Layer 2: BlockchainViz — centered subtle network, mid parallax */}
            <Parallax speed={-0.07} clamp={36} className="absolute inset-0">
              <div className="absolute inset-0 opacity-[0.95]">
                <BlockchainViz className="absolute inset-0" density="medium" />
              </div>
            </Parallax>

            {/* Readability scrims — static, never parallax (so text stays legible) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060e20]/55 via-[#060e20]/30 to-[#060e20]" />

            {/* Orbs — each with distinct parallax + breathing */}
            <Parallax speed={-0.11} clamp={44} className="absolute inset-0 pointer-events-none">
              {/* Top Cyan Glow Orb */}
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-cyan-500/15 via-cyan-400/5 to-transparent blur-3xl rounded-full animate-orb-breathe" />
            </Parallax>

            <Parallax speed={-0.065} clamp={34} className="absolute inset-0 pointer-events-none">
              {/* Secondary Purple Glow Orb */}
              <div className="absolute top-[28%] -left-48 w-[520px] h-[520px] bg-purple-600/10 blur-[100px] rounded-full animate-orb-drift" />
            </Parallax>

            <Parallax speed={-0.09} clamp={38} className="absolute inset-0 pointer-events-none">
              {/* Emerald Node Accent */}
              <div className="absolute top-[46%] -right-48 w-[460px] h-[460px] bg-emerald-500/10 blur-[100px] rounded-full animate-orb-breathe [animation-delay:1200ms]" />
            </Parallax>

            {/* Grid overlay — ultra subtle parallax for depth */}
            <Parallax speed={0.02} clamp={16} className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-grid-cyber opacity-[0.22]" />
            </Parallax>

            {/* Bottom fade to body color */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060e20]/60 to-[#060e20]" />
          </>
        )}

        {variant === 'subtle' && (
          <>
            <Parallax speed={-0.05} clamp={28} className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-cyan-500/10 blur-[90px] rounded-full animate-orb-breathe" />
            </Parallax>
            <Parallax speed={-0.04} clamp={24} className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-1/4 w-[350px] h-[250px] bg-purple-600/10 blur-[80px] rounded-full" />
            </Parallax>
            <div className="absolute inset-0 bg-grid-cyber opacity-20" />
          </>
        )}

        {variant === 'matrix' && (
          <>
            <div className="absolute inset-0 bg-dot-matrix opacity-25" />
            <Parallax speed={-0.06} clamp={30} className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 left-1/3 w-[500px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full animate-orb-breathe" />
            </Parallax>
          </>
        )}

        {variant === 'mesh' && (
          <>
            <Parallax speed={-0.06} clamp={30} className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-cyan-500/12 blur-[110px] rounded-full animate-orb-drift" />
            </Parallax>
            <Parallax speed={-0.05} clamp={28} className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-purple-600/12 blur-[100px] rounded-full animate-orb-breathe" />
            </Parallax>
            <Parallax speed={-0.07} clamp={32} className="absolute inset-0 pointer-events-none">
              <div className="absolute -bottom-24 left-1/3 w-[500px] h-[400px] bg-emerald-500/8 blur-[100px] rounded-full" />
            </Parallax>
            <div className="absolute inset-0 bg-grid-cyber opacity-25" />
          </>
        )}
      </div>

      {children}
    </div>
  );
};

export default GlowBackground;
