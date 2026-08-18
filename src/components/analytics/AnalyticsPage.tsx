import { useState } from "react";
import AnalyticsSideNav from "./AnalyticsSideNav";
import AnalyticsTopBar from "./AnalyticsTopBar";
import ProficiencyGauge from "./ProficiencyGauge";
import SkillRadar from "./SkillRadar";
import KpiCards from "./KpiCards";
import AssessmentHistory from "./AssessmentHistory";

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen selection:bg-primary/30">
      <AnalyticsSideNav
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
        <AnalyticsTopBar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 sm:p-6 md:p-8 max-w-[1280px] mx-auto">
          <div className="mb-6 md:mb-gutter flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h2 className="font-display-xl text-2xl sm:text-3xl md:text-display-xl text-primary mb-2">
                Performance Analytics
              </h2>
              <p className="text-sm md:text-body-lg text-on-surface-variant">
                Mastery telemetry for Operator: Alex
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-label-sm font-label-sm text-primary">
                STATUS
              </span>
              <span className="text-body-md font-bold text-on-surface flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Live Sync Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-gutter">
            <ProficiencyGauge />
            <SkillRadar />
            <KpiCards />
            <AssessmentHistory />
          </div>
        </div>

        <footer className="w-full py-10 md:py-12 mt-8 md:mt-12 bg-background border-t border-outline-variant/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-gutter flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xl md:text-headline-lg font-display-xl text-primary">
                ZAMARON
              </span>
              <p className="text-sm text-on-surface-variant">
                © 2024 ZAMARON Academy. Encrypted Future.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                "Privacy Protocol",
                "Terms of Service",
                "Bug Bounty",
                "Audit Status",
              ].map((link) => (
                <a
                  key={link}
                  className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary transition-colors"
                  href="#"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-low/90 backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center z-50">
        {[
          { icon: "dashboard", label: "Home", active: false },
          { icon: "analytics", label: "Metrics", active: true, fill: true },
          { icon: "school", label: "Library", active: false },
          { icon: "person", label: "Profile", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1 ${
              item.active ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={
                item.fill ? { fontVariationSettings: "'FILL' 1" } : undefined
              }
            >
              {item.icon}
            </span>
            <span className="text-[10px] uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
