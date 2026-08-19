import { Icon } from '@/components/ui/Icon';
import type { SidebarNavItemData } from '../../types';

export default function SidebarNavLink({ icon, label, href, active = false }: SidebarNavItemData) {
  if (active) {
    return (
      <a
        href={href}
        className="bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400 flex items-center gap-3 px-6 py-4 translate-x-1 transition-transform font-['Space_Grotesk'] font-medium shadow-[inset_20px_0_40px_-20px_rgba(0,240,255,0.1)]"
      >
        <Icon name={icon} filled className="text-primary-container" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="text-slate-500 flex items-center gap-3 px-6 py-4 hover:bg-white/5 hover:text-cyan-200 transition-all font-['Space_Grotesk'] font-medium"
    >
      <Icon name={icon} />
      <span>{label}</span>
    </a>
  );
}
