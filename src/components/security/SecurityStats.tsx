import type { SecurityStat } from "../../types/security";

const stats: SecurityStat[] = [
  {
    id: "sessions",
    label: "Active Sessions",
    value: "124",
    icon: "sensors",
    valueColor: "text-primary",
    iconColor: "text-cyan-400",
  },
  {
    id: "failed",
    label: "Failed Logins (24h)",
    value: "12",
    icon: "gpp_bad",
    valueColor: "text-error",
    iconColor: "text-error",
    borderClass: "border-error/20",
  },
  {
    id: "neural",
    label: "Neural Updates",
    value: "42",
    icon: "psychology",
    valueColor: "text-primary-container",
    iconColor: "text-primary-container",
    borderClass: "border-primary-container/20",
  },
  {
    id: "integrity",
    label: "System Integrity",
    value: "99.9%",
    icon: "verified_user",
    valueColor: "text-secondary",
    iconColor: "text-secondary",
  },
];

export default function SecurityStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {stats.map((s) => (
        <div
          key={s.id}
          className={`glass-panel p-4 md:p-6 rounded-xl flex flex-col justify-between min-h-[100px] md:h-32 ${s.borderClass ?? ""}`}
        >
          <div className="flex justify-between items-start gap-2">
            <span className="font-label-sm text-slate-500 uppercase tracking-widest text-[10px] md:text-xs">
              {s.label}
            </span>
            <span className={`material-symbols-outlined ${s.iconColor}`}>
              {s.icon}
            </span>
          </div>
          <div
            className={`font-display-xl text-2xl md:text-display-xl ${s.valueColor}`}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
