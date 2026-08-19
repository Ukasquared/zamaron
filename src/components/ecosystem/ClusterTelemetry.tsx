import type { ClusterMetric } from "../../types/ecosystem";

const metrics: ClusterMetric[] = [
  { id: "cpu", label: "CPU LOAD", value: "24.8%", percent: 24.8, color: "cyan" },
  { id: "mem", label: "MEM UTIL", value: "61.2%", percent: 61.2, color: "cyan" },
  { id: "latency", label: "LATENCY", value: "12ms", percent: 12, color: "secondary" },
  { id: "throughput", label: "THROUGHPUT", value: "8.4GB/s", percent: 84, color: "cyan" },
];

export default function ClusterTelemetry() {
  return (
    <div className="col-span-full lg:col-span-2 glass-panel p-5 md:p-card-padding rounded-xl scanning-sweep">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h3 className="font-headline-lg text-xl md:text-headline-lg text-primary flex items-center gap-3">
          <span className="material-symbols-outlined text-cyan-400">dns</span>
          Core Clusters Telemetry
        </h3>
        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 text-xs font-bold rounded-full">
          OPERATIONAL
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {metrics.map((m) => (
          <div
            key={m.id}
            className="p-3 md:p-4 bg-white/5 rounded-lg border border-white/5"
          >
            <p className="text-label-sm font-label-sm text-slate-400 uppercase text-[10px] md:text-xs">
              {m.label}
            </p>
            <p
              className={`text-lg md:text-data-lg font-data-lg mt-2 ${
                m.color === "secondary" ? "text-secondary" : "text-cyan-400"
              }`}
            >
              {m.value}
            </p>
            <div className="w-full bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  m.color === "secondary"
                    ? "bg-secondary shadow-[0_0_10px_rgba(236,178,255,0.8)]"
                    : "bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                }`}
                style={{ width: `${m.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
