interface IconProps {
  name: string;
  className?: string;
  /** Renders the filled variant of the glyph (FILL 1) */
  filled?: boolean;
}

export default function Icon({ name, className = '', filled = false }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'filled' : ''} ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
