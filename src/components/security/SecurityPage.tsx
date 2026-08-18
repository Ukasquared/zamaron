import { useState } from "react";
import SecuritySideNav from "./SecuritySideNav";
import SecurityTopNav from "./SecurityTopNav";
import SecurityStats from "./SecurityStats";
import LogStream from "./LogStream";

export default function SecurityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md min-h-screen md:h-screen md:overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-on-primary-container opacity-10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-on-tertiary-container opacity-10 rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <SecuritySideNav
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="md:ml-72 flex flex-col min-h-screen md:h-screen">
        <SecurityTopNav onMenuClick={() => setSidebarOpen(true)} />

        <section className="flex-1 overflow-y-auto md:overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8 pb-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline-lg text-xl sm:text-2xl md:text-headline-lg text-primary tracking-tight">
                Forensic Security Audit
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-2 text-sm md:text-base">
                Real-time surveillance of administrative protocols, neural
                lattice modifications, and access authorization events.
              </p>
            </div>
            <button className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-label-sm text-label-sm uppercase hover:bg-cyan-400 hover:text-slate-950 transition-all active:scale-95 flex items-center gap-2 neon-glow-cyan shrink-0 w-full md:w-auto justify-center">
              <span className="material-symbols-outlined text-sm">terminal</span>
              Export Audit for Protocol Command
            </button>
          </div>

          <SecurityStats />
          <LogStream />
        </section>
      </main>
    </div>
  );
}
