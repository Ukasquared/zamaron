import { Icon } from '@/components/ui/Icon';
import { DASHBOARD_NAV_ITEMS } from '../../data/coursesContent';

export default function MobileBottomNav() {
  // Bottom nav mirrors the top 4 desktop sidebar items (no Settings) —
  // sliced from the same array so the two navs can never fall out of sync.
  const items = DASHBOARD_NAV_ITEMS.slice(0, 4);

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center h-16 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 pb-safe">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center gap-1 p-2 ${item.active ? 'text-cyan-400' : 'text-slate-500'}`}
        >
          <Icon name={item.icon} filled={item.active} />
        </a>
      ))}
    </nav>
  );
}
