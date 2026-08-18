import { useState } from "react";
import ContentSideNav from "./ContentSideNav";
import ContentTopNav from "./ContentTopNav";
import NeuralPatterns from "./NeuralPatterns";
import ScamDefinitions from "./ScamDefinitions";
import ModuleEditor from "./ModuleEditor";
import ReportTemplates from "./ReportTemplates";

export default function ContentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-body-md text-on-surface min-h-screen bg-[radial-gradient(circle_at_50%_50%,#1d1e32_0%,#0b0c1f_100%)]">
      <ContentSideNav
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ContentTopNav onMenuClick={() => setSidebarOpen(true)} />

      <main className="md:ml-72 p-4 sm:p-6 md:p-8 min-h-screen cyber-grid pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 md:mb-10">
          <div>
            <h2 className="font-headline-lg text-xl sm:text-2xl md:text-headline-lg text-primary leading-none">
              Content Administration
            </h2>
            <p className="font-body-md text-slate-400 mt-2 text-sm md:text-base">
              Manage the neural-linked educational ecosystem of ZAMARON Academy.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
            <button className="glass-panel px-4 md:px-6 py-2 rounded-lg text-label-sm font-label-sm text-cyan-400 flex items-center justify-center gap-2 hover:bg-cyan-500/10 transition-all border border-cyan-400/20">
              <span className="material-symbols-outlined text-sm">publish</span>
              DEPLOY MODULES
            </button>
            <button className="bg-primary-container px-4 md:px-6 py-2 rounded-lg text-label-sm font-label-sm text-on-primary-container flex items-center justify-center gap-2 neon-glow-primary hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-sm">
                add_circle
              </span>
              NEW COURSE
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <NeuralPatterns />
            <ScamDefinitions />
          </div>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-6">
            <ModuleEditor />
            <ReportTemplates />
          </div>
        </div>
      </main>

      {/* FAB */}
      <div className="fixed bottom-8 right-6 md:right-8 z-50">
        <button className="w-12 h-12 md:w-14 md:h-14 bg-cyan-400 rounded-full flex items-center justify-center text-on-primary shadow-[0_0_25px_rgba(0,219,233,0.5)] hover:scale-110 active:scale-95 transition-all">
          <span
            className="material-symbols-outlined text-2xl md:text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            smart_toy
          </span>
        </button>
      </div>
    </div>
  );
}
