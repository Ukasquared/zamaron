import type { ReportTemplate } from "../../types/content";

const templates: ReportTemplate[] = [
  {
    id: "1",
    title: "Executive Risk",
    subtitle: "Institutional format",
    icon: "summarize",
    iconVariant: "primary",
  },
  {
    id: "2",
    title: "Deep Forensic",
    subtitle: "Raw data extract",
    icon: "analytics",
    iconVariant: "secondary",
  },
  {
    id: "3",
    title: "Quick Alert",
    subtitle: "Mobile-optimized",
    icon: "quick_reference",
    iconVariant: "tertiary",
  },
];

const iconBg = {
  primary: "bg-primary-container/10 text-cyan-400",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary-fixed-dim/10 text-tertiary-fixed-dim",
};

export default function ReportTemplates() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {templates.map((t) => (
        <div
          key={t.id}
          className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:border-cyan-400/50 transition-all cursor-pointer"
        >
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg[t.iconVariant]}`}
          >
            <span className="material-symbols-outlined">{t.icon}</span>
          </div>
          <div>
            <p className="text-xs font-bold text-white">{t.title}</p>
            <p className="text-[10px] text-slate-500">{t.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
