import { Icon } from '@/components/ui/Icon';
import type { DashboardNavItemData } from '../../types';

export default function DashboardNavLink({ icon, label, href, active = false }: DashboardNavItemData) {
  return (
    <a
      href={href}
      className={
        active
          ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400 font-['Space_Grotesk'] transition-transform translate-x-1"
          : "flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 font-['Space_Grotesk'] transition-all duration-300"
      }
    >
      <Icon name={icon} filled={active} />
      {label}
    </a>
  );
}
