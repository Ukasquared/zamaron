import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in ms (default 1800ms)
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  triggerOnView?: boolean;
  onComplete?: () => void;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  className,
  triggerOnView = true,
  onComplete,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      hasAnimatedRef.current = true;
      onComplete?.();
      return;
    }

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const startTime = performance.now();
      const startVal = 0;
      const endVal = value;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Cubic ease-out curve: fast start, soft deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNumber = startVal + (endVal - startVal) * easeOut;

        setDisplayValue(currentNumber);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(endVal);
          onComplete?.();
        }
      };

      requestAnimationFrame(animate);
    };

    if (!triggerOnView) {
      startAnimation();
      return;
    }

    const currentElem = elementRef.current;
    if (!currentElem) {
      startAnimation();
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(currentElem);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, triggerOnView, onComplete]);

  // Format number with decimals and thousand separators
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
  };

  return (
    <span ref={elementRef} className={cn('inline-block tabular-nums font-mono', className)}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
