import type { RiskPattern } from "../../types/content";

const patterns: RiskPattern[] = [
  {
    id: "1",
    code: "Pattern-901",
    name: "Crypto Draining",
    riskLabel: "HIGH RISK",
    riskVariant: "high",
    description:
      "Detects signature hex-code deviations in decentralized wallet interactions.",
    progressPercent: 75,
    barColor: "secondary",
    titleColor: "text-secondary",
  },
  {
    id: "2",
    code: "Pattern-112",
    name: "Synthetic Identity",
    riskLabel: "NORMALIZED",
    riskVariant: "normalized",
    description:
      "Cross-references biometric hash signatures against known deepfake models.",
    progressPercent: 50,
    barColor: "cyan",
    titleColor: "text-cyan-400",
  },
  {
    id: "3",
    code: "Pattern-404",
    name: "Social Engineering",
    riskLabel: "OBSERVED",
    riskVariant: "observed",
    description:
      "Linguistic analysis of urgent-request metadata in cross-chain messaging.",
    progressPercent: 20,
    barColor: "tertiary",
    titleColor: "text-tertiary-fixed-dim",
  },
];

const badgeClass = {
  high: "text-on-tertiary-container bg-error-container",
  normalized: "text-on-primary-container bg-primary-container",
  observed: "text-tertiary-fixed-dim bg-on-tertiary-fixed",
};

const barClass = {
  secondary: "bg-secondary shadow-[0_0_8px_rgba(236,178,255,0.6)]",
  cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(0,219,233,0.6)]",
  tertiary: "bg-tertiary-fixed-dim shadow-[0_0_8px_rgba(255,177,195,0.6)]",
};

export default function NeuralPatterns() {
  return (
    <section className="glass-panel-heavy rounded-xl p-5 md:p-card-padding flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
        <h3 className="font-headline-lg text-lg text-cyan-400 flex items-center gap-2">
          <span className="material-symbols-outlined">neurology</span>
          Neural Risk Patterns
        </h3>
        <span className="text-[10px] font-label-sm px-2 py-0.5 rounded border border-cyan-400/30 text-cyan-400 bg-cyan-400/5">
          AI ENGINE v4.2
        </span>
      </div>
      <div className="space-y-4">
        {patterns.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/40 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start gap-2 mb-2">
              <span className={`font-bold text-sm ${p.titleColor}`}>
                {p.code}: {p.name}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded shrink-0 ${badgeClass[p.riskVariant]}`}
              >
                {p.riskLabel}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {p.description}
            </p>
            <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${barClass[p.barColor]}`}
                style={{ width: `${p.progressPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
