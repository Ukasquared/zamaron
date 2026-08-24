import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';

export interface MegaMenuItemProps {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
  onClick?: () => void;
}

export const MegaMenuItem: React.FC<MegaMenuItemProps> = ({ label, href, description, icon, badge, onClick }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
    >
      {icon && (
        <div className="w-10 h-10 shrink-0 rounded-lg bg-[#0b1326] border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,218,243,0.3)] transition-all">
          <Icon name={icon} size={20} />
        </div>
      )}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
            {label}
          </span>
          {badge && (
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed group-hover:text-slate-300 transition-colors">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};
