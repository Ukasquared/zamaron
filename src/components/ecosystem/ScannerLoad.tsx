import type { ScannerNode } from "../../types/ecosystem";

const nodes: ScannerNode[] = [
  { id: "1", name: "Node_Alpha_9", status: "Optimized", loadPercent: 45 },
  { id: "2", name: "Node_Gamma_2", status: "High Load", loadPercent: 82 },
  { id: "3", name: "Node_Zeta_Cluster", status: "Idle", loadPercent: 15 },
];

function statusColor(status: ScannerNode["status"]) {
  if (status === "High Load") return "text-secondary";
  return "text-cyan-400";
}

function barGradient(status: ScannerNode["status"]) {
  if (status === "High Load")
    return "bg-gradient-to-r from-secondary-container to-secondary";
  return "bg-gradient-to-r from-cyan-500 to-primary-container";
}

export default function ScannerLoad() {
  return (
    <div className="glass-panel p-5 md:p-card-padding rounded-xl">
      <h4 className="font-label-sm text-label-sm text-slate-400 uppercase mb-4">
        Scanner Load Balancing
      </h4>
      <div className="space-y-4">
        {nodes.map((node) => (
          <div key={node.id}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-on-surface-variant font-medium">
                {node.name}
              </span>
              <span className={`text-xs ${statusColor(node.status)}`}>
                {node.status}
              </span>
            </div>
            <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${barGradient(node.status)}`}
                style={{ width: `${node.loadPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
