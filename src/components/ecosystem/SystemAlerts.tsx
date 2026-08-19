import type { SystemAlert } from "../../types/ecosystem";

const alerts: SystemAlert[] = [
  {
    id: "1",
    category: "Critical Infrastructure",
    categoryVariant: "critical",
    timeLabel: "2m ago",
    title: "Database Shard Desync",
    description:
      "Cluster-7 experiencing replication lag exceeding 500ms. Immediate re-balancing required.",
    actions: true,
  },
  {
    id: "2",
    category: "Security Protocol",
    categoryVariant: "security",
    timeLabel: "14m ago",
    title: "DDoS Mitigation Active",
    description:
      "Layer 7 scrubbing enabled for Endpoint_Beta. 4k requests throttled from localized IP pool.",
  },
  {
    id: "3",
    category: "System Update",
    categoryVariant: "update",
    timeLabel: "1h ago",
    title: "Neural Model v4.2.1 Deployed",
    description:
      "Core inference engine upgraded. Preliminary benchmarks show 14% improvement in response time.",
  },
  {
    id: "4",
    category: "Maintenance",
    categoryVariant: "maintenance",
    timeLabel: "4h ago",
    title: "Scheduled Backup Complete",
    description:
      "Full system snapshots stored in ColdStorage_9. Integrity verified across all sectors.",
    dimmed: true,
  },
];

const categoryClass: Record<SystemAlert["categoryVariant"], string> = {
  critical: "text-error",
  security: "text-secondary",
  update: "text-cyan-400",
  maintenance: "text-slate-500",
};

export default function SystemAlerts() {
  return (
    <div className="glass-panel p-5 md:p-card-padding rounded-xl h-full border-l-4 border-error/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-lg text-xl md:text-headline-lg text-error flex items-center gap-2">
          <span className="material-symbols-outlined">warning</span>
          System Alerts
        </h3>
        <span className="text-xs text-on-surface-variant">Live Feed</span>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg group transition-all cursor-pointer ${
              alert.categoryVariant === "critical"
                ? "bg-error-container/10 border border-error/20 hover:border-error/50"
                : "bg-white/5 border border-white/10 hover:border-cyan-500/50"
            } ${alert.dimmed ? "opacity-60" : ""}`}
          >
            <div className="flex justify-between items-start gap-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-tighter ${categoryClass[alert.categoryVariant]}`}
              >
                {alert.category}
              </span>
              <span className="text-[10px] text-slate-500 shrink-0">
                {alert.timeLabel}
              </span>
            </div>
            <h5
              className={`text-sm font-bold mt-1 ${alert.dimmed ? "text-slate-300" : "text-white"}`}
            >
              {alert.title}
            </h5>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              {alert.description}
            </p>
            {alert.actions && (
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1 bg-error/20 text-error text-[10px] font-bold rounded uppercase hover:bg-error/40 transition-all">
                  Resolve
                </button>
                <button className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-bold rounded uppercase hover:bg-white/10 transition-all">
                  Ignore
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="w-full mt-6 md:mt-8 py-3 border border-dashed border-white/20 rounded-lg text-xs font-bold text-slate-500 hover:text-white hover:border-white/40 transition-all uppercase tracking-widest">
        View Full Archive
      </button>
    </div>
  );
}
