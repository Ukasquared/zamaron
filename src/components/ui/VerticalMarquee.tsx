import React from "react";

interface VerticalMarqueeProps {
  children: React.ReactNode;
  direction?: "up" | "down";
  duration?: number;
  pauseOnHover?: boolean;
  className?: string;
  height?: string; 
}

export const VerticalMarquee: React.FC<VerticalMarqueeProps> = ({
  children,
  direction = "up",
  duration = 20,
  pauseOnHover = true,
  className = "",
  height = "400px", // DEFAULT HEIGHT
}) => {
  const animation =
    direction === "up"
      ? "vertical-marquee"
      : "vertical-marquee-reverse";

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height, // APPLY HEIGHT
        "--marquee-duration": `${duration}s`,
      } as React.CSSProperties}
    >
      <div
        className={`flex w-full flex-col gap-6 ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `${animation} var(--marquee-duration) linear infinite`,
        }}
      >
        {/* First set */}
        <div className="flex flex-col gap-6">
          {children}
        </div>

        {/* Duplicate set for seamless loop */}
        <div
          aria-hidden="true"
          className="flex flex-col gap-6"
        >
          {children}
        </div>
      </div>
    </div>
  );
};