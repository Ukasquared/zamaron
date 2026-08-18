import { useState } from "react";
import AdminSideNav from "./AdminSideNav";
import AdminTopNav from "./AdminTopNav";
import AdminStats from "./AdminStats";
import MasterRegistry from "./MasterRegistry";
import RiskHeatmap from "./RiskHeatmap";
import ActivityStream from "./ActivityStream";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-body-md text-on-surface min-h-screen bg-[radial-gradient(circle_at_top_right,#1d1e32,#111225)]">
      <div className="fixed inset-0 grid-overlay pointer-events-none" />

      <AdminSideNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:ml-72 min-h-screen relative flex flex-col">
        <AdminTopNav onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8 pb-24">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div>
              <h2 className="font-headline-lg text-xl sm:text-2xl md:text-headline-lg text-primary drop-shadow-[0_0_10px_rgba(0,219,233,0.2)]">
                User & Protocol Management
              </h2>
              <p className="text-slate-400 mt-1 max-w-2xl text-sm md:text-base">
                Oversee high-net-worth elite operatives and verified smart
                contract clusters. Monitor real-time risk tiers and security
                clearance levels.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shrink-0">
              <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 rounded-lg border border-error text-error bg-error/5 hover:bg-error/10 transition-all font-label-sm text-label-sm neon-glow-error">
                <span className="material-symbols-outlined text-[18px]">
                  gpp_maybe
                </span>
                NEW SECURITY ALERT
              </button>
              <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 rounded-lg border border-cyan-400 text-cyan-400 bg-cyan-400/5 hover:bg-cyan-400/10 transition-all font-label-sm text-label-sm neon-glow-primary">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                REGISTER OPERATIVE
              </button>
            </div>
          </div>

          <AdminStats />
          <MasterRegistry />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <RiskHeatmap />
            <ActivityStream />
          </div>
        </div>
      </main>
    </div>
  );
}
