import type { AssessmentRow } from "../../types/analytics";

const rows: AssessmentRow[] = [
  {
    id: "1",
    moduleId: "#ZAM-8842",
    name: "Deep Neural Network Hijack",
    timestamp: "2024.10.12 | 14:22",
    score: "9850/10000",
    proficiency: "MASTER",
  },
  {
    id: "2",
    moduleId: "#ZAM-9012",
    name: "Zero-Day Protocol Analysis",
    timestamp: "2024.10.11 | 09:45",
    score: "9200/10000",
    proficiency: "ELITE",
  },
  {
    id: "3",
    moduleId: "#ZAM-7721",
    name: "Quantum Encryption Brute",
    timestamp: "2024.10.09 | 22:10",
    score: "8800/10000",
    proficiency: "EXPERT",
  },
  {
    id: "4",
    moduleId: "#ZAM-1044",
    name: "Cold Wallet Infiltration",
    timestamp: "2024.10.08 | 11:30",
    score: "9980/10000",
    proficiency: "MASTER",
  },
];

const badgeClass = {
  MASTER: "bg-primary/20 text-primary border-primary/30",
  ELITE: "bg-secondary/20 text-secondary border-secondary/30",
  EXPERT:
    "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30",
};

export default function AssessmentHistory() {
  return (
    <div className="md:col-span-12 glass-panel fresnel-edge rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-outline-variant/20 flex justify-between items-center gap-3">
        <h3 className="text-title-md font-title-md">Assessment History</h3>
        <button className="text-label-sm font-label-sm text-primary hover:underline transition-all shrink-0">
          Download Audit Report
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-high/50">
              {["MODULE ID", "CHALLENGE NAME", "TIMESTAMP", "SCORE", "PROFICIENCY"].map(
                (h) => (
                  <th
                    key={h}
                    className={`p-4 text-label-sm font-label-sm text-on-surface-variant ${
                      h === "SCORE" || h === "PROFICIENCY" ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-white/[0.02] hover:bg-white/5 transition-colors"
              >
                <td className="p-4 font-label-sm text-primary">
                  {row.moduleId}
                </td>
                <td className="p-4 font-body-md font-bold">{row.name}</td>
                <td className="p-4 text-on-surface-variant">
                  {row.timestamp}
                </td>
                <td className="p-4 text-right font-label-sm">{row.score}</td>
                <td className="p-4 text-right">
                  <span
                    className={`px-2 py-1 border rounded text-label-sm ${badgeClass[row.proficiency]}`}
                  >
                    {row.proficiency}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-outline-variant/10">
        {rows.map((row) => (
          <div key={row.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="font-label-sm text-primary text-xs">
                  {row.moduleId}
                </p>
                <p className="font-bold text-sm text-on-surface">{row.name}</p>
              </div>
              <span
                className={`px-2 py-0.5 border rounded text-[10px] shrink-0 ${badgeClass[row.proficiency]}`}
              >
                {row.proficiency}
              </span>
            </div>
            <div className="flex justify-between text-label-sm text-on-surface-variant">
              <span>{row.timestamp}</span>
              <span className="font-label-sm text-on-surface">{row.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
