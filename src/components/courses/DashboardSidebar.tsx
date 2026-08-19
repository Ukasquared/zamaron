import { Icon } from '@/components/ui/Icon';
import DashboardNavLink from './DashboardNavLink';
import { DASHBOARD_NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../../data/coursesContent';

export default function DashboardSidebar() {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-white/5 shadow-2xl bg-slate-950/60 backdrop-blur-2xl z-40 py-8">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline/30 flex items-center justify-center dashboard-neon-border">
            <Icon name="security" className="text-primary-fixed" />
          </div>
          <div>
            <h2 className="text-cyan-400 font-black font-['Space_Grotesk'] text-lg leading-tight">
              Zamaron Academy
            </h2>
            <p className="text-label-sm font-label-sm text-on-surface-variant opacity-70">
              Elite Crypto Learning
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {DASHBOARD_NAV_ITEMS.map((item) => (
          <DashboardNavLink key={item.label} {...item} />
        ))}
      </nav>

      <div className="px-4 mt-auto space-y-4">
        <button className="w-full py-3 rounded-lg border border-primary-fixed/50 text-primary-fixed font-label-sm text-label-sm tracking-widest uppercase hover:bg-primary-fixed/10 transition-colors dashboard-neon-border">
          Upgrade to Pro
        </button>
        <div className="space-y-1">
          {SECONDARY_NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 font-['Space_Grotesk'] text-sm transition-all duration-300"
            >
              <Icon name={item.icon} className="text-sm" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
