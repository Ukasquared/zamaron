import React from 'react';
import { cn } from '@/lib/utils';
import web3Image from '@/assets/web3-image.jpg';

export interface GlowBackgroundProps {
  variant?: 'hero' | 'subtle' | 'matrix' | 'mesh';
  className?: string;
  children?: React.ReactNode;
}

export const GlowBackground: React.FC<GlowBackgroundProps> = ({
  variant = 'hero',
  className,
  children,
}) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {variant === 'hero' && (
          <>
            {/* Frosted product imagery — soft, blurred, never competing with copy */}
            <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[1280px] max-w-none h-[75%] min-h-[560px] [mask-image:radial-gradient(75%_70%_at_50%_30%,black,transparent_78%)]">
              <img
                src={web3Image}
                alt=""
                className="w-full h-full object-cover object-top opacity-[0.20] blur-[3px] saturate-[0.9] brightness-[0.85] select-none"
                draggable={false}
              />
            </div>
            {/* Readability scrims */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060e20]/55 via-[#060e20]/30 to-[#060e20]" />
            {/* Top Cyan Glow Orb */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-cyan-500/15 via-cyan-400/5 to-transparent blur-3xl rounded-full" />
            {/* Secondary Purple Glow Orb */}
            <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full" />
            {/* Emerald Node Accent */}
            <div className="absolute top-1/2 -right-48 w-[450px] h-[450px] bg-emerald-500/10 blur-[100px] rounded-full" />
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid-cyber opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060e20]/60 to-[#060e20]" />
          </>
        )}

        {variant === 'subtle' && (
          <>
            <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-cyan-500/10 blur-[90px] rounded-full" />
            <div className="absolute bottom-0 left-1/4 w-[350px] h-[250px] bg-purple-600/10 blur-[80px] rounded-full" />
            <div className="absolute inset-0 bg-grid-cyber opacity-20" />
          </>
        )}

        {variant === 'matrix' && (
          <>
            <div className="absolute inset-0 bg-dot-matrix opacity-25" />
            <div className="absolute -top-24 left-1/3 w-[500px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full" />
          </>
        )}

        {variant === 'mesh' && (
          <>
            <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-cyan-500/12 blur-[110px] rounded-full" />
            <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-purple-600/12 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 left-1/3 w-[500px] h-[400px] bg-emerald-500/8 blur-[100px] rounded-full" />
            <div className="absolute inset-0 bg-grid-cyber opacity-25" />
          </>
        )}
      </div>

      {children}
    </div>
  );
};

export default GlowBackground;
