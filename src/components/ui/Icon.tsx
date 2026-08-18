import React from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  fill?: boolean;
  size?: number | string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  fill = false,
  size,
  style,
  ...props
}) => {
  return (
    <span
      className={cn(
        'material-symbols-outlined select-none inline-flex items-center justify-center align-middle',
        fill && 'fill',
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
