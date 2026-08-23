import React from 'react';
import { cn } from '@/lib/utils';
import { useParallax } from '@/hooks/useParallax';

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  clamp?: number;
  disabled?: boolean;
}

/**
 * ParallaxLayer: wraps children and applies subtle Y translation driven by scroll.
 * Only touches transform (GPU-friendly). Disabled automatically when prefers-reduced-motion.
 * Use for decorative layers (orbs, image, grids), never for readable text blocks.
 */
export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className,
  speed = -0.08,
  clamp = 48,
  disabled = false,
  style,
  ...props
}) => {
  const layerRef = useParallax<HTMLDivElement>({ speed, clamp, enabled: !disabled });

  return (
    <div
      ref={layerRef}
      className={cn('will-change-transform', className)}
      style={{ transform: 'translate3d(0,0,0)', ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Parallax;
