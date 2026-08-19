import React from 'react';
import { cn } from '@/lib/utils';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  fill?: boolean;
  filled?: boolean;
  size?: number | string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  fill = false,
  filled = false,
  size,
  style,
  ...props
}) => {
  const isFilled = fill || filled;
  return (
    <span
      className={cn(
        'material-symbols-outlined select-none inline-flex items-center justify-center align-middle',
        isFilled && 'fill filled',
        className
      )}
      style={{
        fontSize: typeof size === 'number' ? `${size}px` : size,
        ...style,
      }}
      {...props}
    >
      {name}
    </span>
  );
};

export default Icon;
