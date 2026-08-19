import type { BannerStat } from "../../types/ecosystem";

const stats: BannerStat[] = [
  {
    id: "nodes",
    label: "TOTAL NODES",
    value: "1,402",
    icon: "hub",
    iconVariant: "cyan",
  },
  {
    id: "response",
    label: "AVG RESPONSE",
    value: "0.04s",
    icon: "speed",
    iconVariant: "secondary",
  },
  {
    id: "uptime",
    label: "UPTIME",
    value: "99.998%",
    icon: "cloud_done",
    iconVariant: "tertiary",
  },
  {
    id: "energy",
    label: "ENERGY EFFICIENCY",
    value: "A++ Grade",
    icon: "bolt",
    iconVariant: "error",
  },
];

const iconBg: Record<BannerStat["iconVariant"], string> = {
  cyan: "bg-cyan-500/10 text-cyan-400",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary/10 text-tertiary",
  error: "bg-error/10 text-error",
};

export default function BannerStats() {
  return (
    <div className="mt-gutter grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-gutter">
      {stats.map((s) => (
        <div
          key={s.id}
          className="glass-panel p-4 md:p-6 rounded-xl flex items-center gap-3 md:gap-4"
        >
          <div className={`p-2.5 md:p-3 rounded-lg shrink-0 ${iconBg[s.iconVariant]}`}>
            <span className="material-symbols-outlined text-xl md:text-2xl">
              {s.icon}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-label-sm font-label-sm text-slate-400 text-[10px] md:text-xs truncate">
              {s.label}
            </p>
            <p className="text-base md:text-data-lg font-data-lg text-primary truncate">
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
