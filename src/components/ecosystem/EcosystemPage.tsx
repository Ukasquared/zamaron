import { useState } from "react";
import EcosystemSideNav from "./EcosystemSideNav";
import EcosystemTopNav from "./EcosystemTopNav";
import ClusterTelemetry from "./ClusterTelemetry";
import NeuralAccuracy from "./NeuralAccuracy";
import ScannerLoad from "./ScannerLoad";
import TrafficHeatmap from "./TrafficHeatmap";
import SystemAlerts from "./SystemAlerts";
import BannerStats from "./BannerStats";

export default function EcosystemPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-body-md text-on-surface min-h-screen bg-[radial-gradient(circle_at_top_right,#1d1e32,#111225)]">
      <EcosystemSideNav
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <EcosystemTopNav onMenuClick={() => setSidebarOpen(true)} />

      <main className="md:ml-72 p-4 sm:p-6 md:p-8 pb-24">
        <header className="mb-8 md:mb-10">
          <h2 className="font-display-xl text-2xl sm:text-3xl md:text-display-xl text-primary tracking-tight">
            Ecosystem Health Monitor
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mt-2 text-sm md:text-base">
            Real-time telemetry and neural performance diagnostic for the
            ZAMARON global backbone.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left column */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <ClusterTelemetry />
            <NeuralAccuracy />
            <ScannerLoad />
            <TrafficHeatmap />
          </div>

          {/* Right column - Alerts */}
          <div className="lg:col-span-4">
            <SystemAlerts />
          </div>
        </div>

        <BannerStats />
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-6 md:bottom-10 md:right-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl md:text-3xl font-bold">
          terminal
        </span>
      </button>
    </div>
  );
}
