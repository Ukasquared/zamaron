import React from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeItem {
  id?: string;
  name: string;
  symbol?: string;
  icon?: string;
  badge?: string;
  color?: string;
}

export interface MarqueeProps {
  items?: MarqueeItem[];
  children?: React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gradientMask?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  gradientMask = true,
  className,
}) => {
  const speedClass = {
    slow: 'duration-[60s]',
    normal: 'duration-[35s]',
    fast: 'duration-[20s]',
  }[speed];

  const directionClass = direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee';

  const defaultContent = items ? (
    <div className="flex items-center gap-6 sm:gap-8 shrink-0">
      {items.map((item, idx) => (
        <div
          key={item.id || `${item.name}-${idx}`}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 backdrop-blur-md hover:border-cyan-400/40 hover:bg-slate-900/80 transition-all cursor-default group"
        >
          <div className="w-7 h-7 rounded-md bg-[#060e20] border border-cyan-500/20 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_10px_rgba(0,218,243,0.3)] transition-all">
            {item.symbol || item.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-display font-semibold text-xs text-slate-200 group-hover:text-white transition-colors">
              {item.name}
            </div>
            {item.badge && (
              <span className="text-[10px] font-mono text-cyan-400/80 block leading-none mt-0.5">
                {item.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    children
  );

  return (
    <div
      className={cn(
        'relative overflow-hidden w-full py-4 select-none',
        gradientMask && '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex w-max items-center gap-6 sm:gap-8',
          directionClass,
          speedClass,
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {defaultContent}
        {defaultContent}
      </div>
    </div>
  );
};

export default Marquee;
