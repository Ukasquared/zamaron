import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonSize, ButtonVariant } from '../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Applies the frosted glass-panel background used on hero CTAs */
  glass?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'border-primary-fixed-dim text-primary-fixed-dim hover:bg-primary-fixed-dim hover:text-on-primary neon-glow-primary',
  secondary:
    'border-secondary-container text-secondary-container hover:bg-secondary-container hover:text-on-secondary neon-glow-secondary',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-6 py-2 rounded-full',
  lg: 'px-8 py-4 rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'sm',
  glass = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        'font-label-sm text-label-sm border transition-all duration-300 flex items-center gap-2',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        glass ? 'glass-panel' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
