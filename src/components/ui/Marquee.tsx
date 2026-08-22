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
  // The base .animate-marquee keyframes hard-code a duration, so the real
  // animation speed is driven via inline style (inline wins over shorthand).
  const animationDuration = {
    slow: '75s',
    normal: '52s',
    fast: '30s',
  }[speed];

  const directionClass = direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee';

  const defaultContent = items ? (
    <div className="flex items-center gap-4 sm:gap-6 shrink-0 pr-4 sm:pr-6">
      {items.map((item, idx) => (
        <div
          key={item.id || `${item.name}-${idx}`}
          className="group flex items-center gap-3.5 px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-16px_rgba(15,23,42,0.12)] hover:border-cyan-500/40 hover:shadow-[0_10px_28px_-14px_rgba(0,218,243,0.35)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
        >
          <div
            className={cn(
              'w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] sm:text-xs font-bold font-mono text-slate-700 group-hover:bg-cyan-50 group-hover:border-cyan-500/30 group-hover:text-cyan-700 transition-all duration-300'
            )}
            style={item.color ? { color: item.color } : undefined}
          >
            {item.symbol || item.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="leading-none">
            <div className="font-display font-semibold text-sm sm:text-[15px] text-slate-800 group-hover:text-slate-950 transition-colors tracking-tight whitespace-nowrap">
              {item.name}
            </div>
            {item.badge && (
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 group-hover:text-cyan-600 block mt-1 tracking-wide whitespace-nowrap transition-colors">
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
        'relative overflow-hidden w-full py-3 select-none',
        gradientMask && '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex w-max items-center',
          directionClass,
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{ animationDuration }}
      >
        {defaultContent}
        {defaultContent}
      </div>
    </div>
  );
};

export default Marquee;
