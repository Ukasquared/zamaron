import type { AdminStat } from "../../types/admin";

const stats: AdminStat[] = [
  {
    id: "operatives",
    label: "Active Operatives",
    value: "1,284",
    icon: "groups",
    iconColor: "text-cyan-400",
    trend: "+12% from last cycle",
    trendIcon: "trending_up",
    trendColor: "text-cyan-400/70",
  },
  {
    id: "protocols",
    label: "Tracked Protocols",
    value: "42",
    icon: "terminal",
    iconColor: "text-secondary",
    trend: "98.2% Security Rating",
    trendIcon: "shield",
    trendColor: "text-secondary/70",
    borderTop: "border-t-2 border-t-cyan-400/30",
  },
  {
    id: "anomalies",
    label: "Anomalies Detected",
    value: "03",
    icon: "warning",
    iconColor: "text-error",
    trend: "Immediate action required",
    trendIcon: "error",
    trendColor: "text-error/70",
    borderTop: "border-t-2 border-t-error/30",
    valueColor: "text-error",
  },
  {
    id: "actions",
    label: "Admin Actions",
    value: "582",
    icon: "lock_open",
    iconColor: "text-primary-fixed-dim",
    trend: "Last 24 hours log activity",
    trendColor: "text-slate-500",
  },
];

export default function AdminStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((s) => (
        <div
          key={s.id}
          className={`glass-panel p-4 md:p-card-padding rounded-xl flex flex-col justify-between ${s.borderTop ?? ""}`}
        >
          <div className="flex items-start justify-between gap-2">
            <span className={`material-symbols-outlined ${s.iconColor}`}>
              {s.icon}
            </span>
            <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-right ${s.iconColor}/50`}>
              {s.label}
            </span>
          </div>
          <div className="mt-3 md:mt-4">
            <p
              className={`font-display-xl text-2xl md:text-display-xl ${s.valueColor ?? "text-on-surface"}`}
            >
              {s.value}
            </p>
            {s.trend && (
              <p
                className={`text-[10px] md:text-xs flex items-center gap-1 mt-1 ${s.trendColor ?? "text-slate-500"}`}
              >
                {s.trendIcon && (
                  <span className="material-symbols-outlined text-[14px]">
                    {s.trendIcon}
                  </span>
                )}
                {s.trend}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
