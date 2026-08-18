import { useState } from "react";
import ScannerTopNav from "./ScannerTopNav";
import ScannerSideNav from "./ScannerSideNav";
import ScanSearch from "./ScanSearch";
import RiskMap from "./RiskMap";
import AuditStats from "./AuditStats";
import AuditHistory from "./AuditHistory";
import ThreatFeed from "./ThreatFeed";

export default function ScannerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <ScannerTopNav onMenuClick={() => setSidebarOpen(true)} />
      <ScannerSideNav
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 min-h-screen pt-8 md:pt-12 pb-20 px-4 sm:px-6 md:px-margin-safe max-w-[1280px] mx-auto">
        <section className="mb-8 md:mb-12 text-center">
          <h1 className="text-xl sm:text-2xl md:text-headline-lg font-headline-lg text-primary glow-text-cyan mb-2">
            SCAM DETECTOR PROTOCOL
          </h1>
          <p className="text-sm md:text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Deploying heuristic neural analysis for smart contract auditing and
            phishing pattern recognition.
          </p>
        </section>

        <ScanSearch />

        <div className="grid grid-cols-12 gap-4 md:gap-gutter">
          <RiskMap />
          <AuditStats />
          <AuditHistory />
        </div>
      </main>

      <ThreatFeed />
    </div>
  );
}
