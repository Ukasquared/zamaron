import type { MetricCard } from "../../types/analytics";

const metrics: MetricCard[] = [
  {
    id: "detection",
    label: "Detection Rate",
    value: "98.2%",
    badge: "+2.4%",
    badgeVariant: "cyan",
    type: "sparkline",
    sparklineHeights: [25, 50, 33, 75, 100, 83, 66],
  },
  {
    id: "accuracy",
    label: "Audit Accuracy",
    value: "99.9%",
    icon: "check_circle",
    type: "progress",
    progress: 99.9,
    description: "Only 1 false negative recorded in last 50 assessments.",
  },
  {
    id: "mitigation",
    label: "Avg Mitigation Time",
    value: "1.4m",
    badge: "-12s",
    badgeVariant: "secondary",
    type: "status",
    description:
      "Reduction achieved through the 'Logic Flow' advanced module completion.",
  },
];

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-section-gap">
      {metrics.map((m) => (
        <div
          key={m.id}
          className="glass-panel p-6 md:p-card-padding rounded-xl flex flex-col h-full"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-label-sm text-xs uppercase mb-1">
                {m.label}
              </p>
              <h4 className="text-white font-data-lg text-data-lg">{m.value}</h4>
            </div>
            {m.badge && (
              <div
                className={`px-2 py-1 rounded text-[10px] font-label-sm ${
                  m.badgeVariant === "secondary"
                    ? "bg-secondary-container/20 text-secondary-container"
                    : "bg-cyan-500/10 text-cyan-400"
                }`}
              >
                {m.badge}
              </div>
            )}
            {m.icon && (
              <span className="material-symbols-outlined text-cyan-400">
                {m.icon}
              </span>
            )}
          </div>

          {m.type === "sparkline" && m.sparklineHeights && (
            <div className="flex-1 min-h-[80px] flex items-end gap-1">
              {m.sparklineHeights.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm ${
                    h === 100
                      ? "bg-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                      : h >= 75
                        ? "bg-cyan-400/40"
                        : h >= 50
                          ? "bg-cyan-400/30"
                          : "bg-cyan-400/20"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          )}

          {m.type === "progress" && (
            <div className="space-y-3">
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full neon-glow-cyan"
                  style={{ width: `${m.progress}%` }}
                />
              </div>
              {m.description && (
                <p className="text-slate-500 text-[11px] font-body-md">
                  {m.description}
                </p>
              )}
            </div>
          )}

          {m.type === "status" && (
            <div className="relative mt-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-secondary-container shadow-[0_0_8px_#cf5cff]" />
                <span className="text-xs text-slate-300 font-label-sm uppercase">
                  Optimized Pathing
                </span>
              </div>
              {m.description && (
                <p className="mt-4 text-slate-400 text-xs">{m.description}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
