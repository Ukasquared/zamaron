import React from 'react';
import { cn } from '@/lib/utils';
import { Badge, BadgeProps } from './Badge';

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: BadgeProps['variant'];
  badgeDot?: boolean;
  badgePulse?: boolean;
  title: string | React.ReactNode;
  gradientText?: string;
  description?: string | React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = 'primary',
  badgeDot = true,
  badgePulse = false,
  title,
  gradientText,
  description,
  align = 'center',
  className,
}) => {
  const alignmentClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left mr-auto items-start',
    right: 'text-right ml-auto items-end',
  }[align];

  return (
    <div className={cn('flex flex-col max-w-3xl space-y-4', alignmentClasses, className)}>
      {badge && (
        <Badge
          variant={badgeVariant}
          size="sm"
          dot={badgeDot}
          pulse={badgePulse}
          className="shadow-[0_0_14px_rgba(0,218,243,0.18)] tracking-[0.18em]"
        >
          {badge}
        </Badge>
      )}

      <h2 className="font-display font-bold sm:font-extrabold text-[1.75rem] sm:text-4xl text-white tracking-tight leading-[1.15] text-balance">
        {title}{' '}
        {gradientText && (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-100 to-purple-300">
            {gradientText}
          </span>
        )}
      </h2>

      {description && (
        <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-2xl font-sans text-pretty">
          {description}
        </p>
      )}

      {align === 'center' && (
        <div className="flex items-center justify-center gap-2 pt-1" aria-hidden="true">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400/50" />
          <span className="h-1 w-1 rounded-full bg-cyan-400/80" />
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/50" />
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
