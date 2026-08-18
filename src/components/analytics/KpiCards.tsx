import type { KpiCard } from "../../types/analytics";

const cards: KpiCard[] = [
  {
    id: "1",
    label: "Detection Rate",
    value: "99.2%",
    delta: "+0.4%",
    icon: "radar",
    borderColor: "primary",
    iconColor: "text-primary",
    deltaColor: "text-primary",
  },
  {
    id: "2",
    label: "Audit Accuracy",
    value: "100%",
    delta: "STABLE",
    icon: "verified",
    borderColor: "secondary",
    iconColor: "text-secondary",
    deltaColor: "text-secondary",
  },
  {
    id: "3",
    label: "Mitigation Time",
    value: "14m",
    delta: "-2m 30s",
    icon: "timer",
    borderColor: "primary",
    iconColor: "text-primary",
    deltaColor: "text-primary",
  },
];

export default function KpiCards() {
  return (
    <>
      {cards.map((c) => (
        <div
          key={c.id}
          className={`md:col-span-4 glass-panel fresnel-edge rounded-xl p-5 md:p-6 border-l-4 ${
            c.borderColor === "primary" ? "border-primary" : "border-secondary"
          }`}
        >
          <span
            className={`material-symbols-outlined ${c.iconColor} mb-3 md:mb-4`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {c.icon}
          </span>
          <p className="text-label-sm font-label-sm text-on-surface-variant uppercase mb-1">
            {c.label}
          </p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-2xl md:text-headline-lg font-display-xl">
              {c.value}
            </h4>
            <span className={`text-label-sm ${c.deltaColor}`}>{c.delta}</span>
          </div>
        </div>
      ))}
    </>
  );
}
