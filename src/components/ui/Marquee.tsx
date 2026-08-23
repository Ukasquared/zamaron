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
  // Premium seamless timing — slow enough to read, fast enough to feel alive
  const animationDuration = {
    slow: '72s',
    normal: '52s',
    fast: '30s',
  }[speed];

  const directionClass = direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee';

  const defaultContent = items ? (
    <div className="flex items-center gap-4 sm:gap-6 shrink-0 pr-4 sm:pr-6">
      {items.map((item, idx) => (
        <div
          key={item.id || `${item.name}-${idx}`}
          className="group flex items-center gap-4 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-white border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-16px_rgba(15,23,42,0.12)] hover:border-cyan-500/40 hover:shadow-[0_10px_28px_-14px_rgba(0,218,243,0.35)] hover:-translate-y-0.5 transition-all duration-300 cursor-default will-change-transform"
        >
          <div
            className={cn(
              'w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs sm:text-sm font-bold font-mono text-slate-700 group-hover:bg-cyan-50 group-hover:border-cyan-500/30 group-hover:text-cyan-700 transition-all duration-300',
            )}
            style={item.color ? { color: item.color } : undefined}
          >
            {item.symbol || item.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="leading-none">
            <div className="font-display font-semibold text-base sm:text-lg text-[#0B1020] group-hover:text-cyan-700 transition-colors tracking-tight whitespace-nowrap">
              {item.name}
            </div>
            {item.badge && (
              <span className="text-xs sm:text-sm font-mono text-slate-500 group-hover:text-cyan-600 block mt-1.5 tracking-wide whitespace-nowrap transition-colors">
                {item.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex items-center gap-4 sm:gap-6 shrink-0">{children}</div>
  );

  return (
    <div
      className={cn(
        'relative overflow-hidden w-full py-6 sm:py-8 select-none',
        gradientMask && '[mask-image:linear-gradient(to_right,transparent,black_6%,black_92%,transparent)]',
        className,
      )}
    >
      {/* Seamless loop: duplicated track ensures no visible jump at -50% */}
      <div
        className={cn('flex w-max items-center will-change-transform', directionClass, pauseOnHover && 'hover:[animation-play-state:paused]')}
        style={{ animationDuration }}
        aria-hidden={false}
      >
        {/* Duplicate content twice — key invariant for seamless -50% translate */}
        {defaultContent}
        <div aria-hidden="true" className="flex items-center">
          {defaultContent}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
