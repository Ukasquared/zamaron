import { Icon } from '@/components/ui/Icon';
import SidebarNavLink from './SidebarNavLink';
import { SIDEBAR_NAV_ITEMS } from '../../data/riskReportContent';

export default function Sidebar() {
  return (
    <nav className="bg-slate-950/60 backdrop-blur-2xl shadow-2xl h-screen w-64 border-r border-white/10 fixed left-0 top-0 flex flex-col z-40 hidden md:flex">
      <div className="p-6 border-b border-white/5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-tr from-cyan-900 to-primary-container/40 flex items-center justify-center">
              <Icon name="person" filled className="text-primary-container text-[20px]" />
            </div>
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] font-black text-cyan-400 text-xl leading-tight">
              Zamaron Terminal
            </h2>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest mt-1">
              Elite Access
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-6 gap-2 flex-1 overflow-y-auto">
        {SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarNavLink key={item.label} {...item} />
        ))}
      </div>
    </nav>
  );
}
