import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export interface NavDropdownProps {
  label: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ label, isActive, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // slight delay to make it smooth
  };

  const handleFocus = () => setIsOpen(true);
  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      // optionally focus back to the button, but focus is fine
    }
  };

  return (
    <div
      className="relative h-full flex items-center group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        aria-expanded={isOpen}
        className={cn(
          "text-sm font-mono tracking-wide transition-all px-3 py-2 rounded-md flex items-center gap-1",
          isActive
            ? "text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,218,243,0.2)]"
            : isOpen
            ? "text-white bg-white/5"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        )}
      >
        {label}
        <Icon 
          name="expand_more" 
          size={16} 
          className={cn("transition-transform duration-300", isOpen && "rotate-180 text-cyan-400")}
        />
      </button>

      {/* Invisible bridge to prevent hover loss */}
      <div className="absolute top-full left-0 w-full h-4" />

      {/* Mega Menu Panel */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 origin-top",
          isOpen
            ? "opacity-100 translate-y-0 scale-100 visible pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 invisible pointer-events-none"
        )}
      >
        <div className="w-[600px] lg:w-[750px] max-w-[90vw] bg-[#070f23]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(0,218,243,0.1)] p-6 overflow-hidden relative">
          {/* Subtle Glows */}
          <div className="absolute top-0 left-1/4 w-64 h-32 bg-cyan-500/10 blur-[60px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-purple-500/10 blur-[60px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {/* Staggered reveal effect */}
            {React.Children.map(children, (child, index) => (
              <div 
                className={cn(
                  "transition-all duration-500 ease-out", 
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
