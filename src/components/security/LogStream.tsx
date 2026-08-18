import type { LogEntry, LogStatus } from "../../types/security";

const logs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2023-11-24 14:02:11.452",
    actor: "admin.kyrios",
    actorVariant: "admin",
    source: "Neural_Core_01",
    sourceVariant: "normal",
    action: "Update Weights: Lattice_Delta_V8",
    actionVariant: "normal",
    status: "COMMITTED",
    traceId: "TRC-882-QX",
  },
  {
    id: "2",
    timestamp: "2023-11-24 14:03:02.001",
    actor: "UNKNOWN_IP: 192.168.1.105",
    actorVariant: "unknown",
    source: "Auth_Gateway",
    sourceVariant: "error",
    action: "FAILED_LOGIN_ATTEMPT: Invalid MFA Token",
    actionVariant: "error",
    status: "REJECTED",
    traceId: "TRC-109-AF",
  },
  {
    id: "3",
    timestamp: "2023-11-24 14:04:45.912",
    actor: "System.Guardian",
    actorVariant: "system",
    source: "Firewall_Primary",
    sourceVariant: "normal",
    action: "Rule Modification: Block Port 8080",
    actionVariant: "normal",
    status: "EXECUTED",
    traceId: "TRC-441-LL",
  },
  {
    id: "4",
    timestamp: "2023-11-24 14:05:12.332",
    actor: "admin.seraphine",
    actorVariant: "admin",
    source: "DB_Archive_Vault",
    sourceVariant: "normal",
    action: "Data Decryption: Cold_Storage_2022",
    actionVariant: "normal",
    status: "AUTHORIZED",
    traceId: "TRC-098-MM",
  },
  {
    id: "5",
    timestamp: "2023-11-24 14:06:59.102",
    actor: "admin.kyrios",
    actorVariant: "admin",
    source: "Neural_Core_01",
    sourceVariant: "normal",
    action: "Sync State: Cluster_Alpha",
    actionVariant: "normal",
    status: "SYNC_OK",
    traceId: "TRC-332-PP",
  },
  {
    id: "6",
    timestamp: "2023-11-24 14:08:22.019",
    actor: "UNKNOWN_IP: 45.2.119.3",
    actorVariant: "unknown",
    source: "External_API",
    sourceVariant: "error",
    action: "QUERY_OVERLOAD: Rate Limit Exceeded",
    actionVariant: "error",
    status: "THROTTLED",
    traceId: "TRC-555-BB",
  },
];

function actorClass(v: LogEntry["actorVariant"]) {
  if (v === "unknown") return "text-error";
  if (v === "system") return "text-secondary";
  return "text-cyan-300";
}

function statusColor(s: LogStatus) {
  if (s === "REJECTED" || s === "THROTTLED") return "text-error";
  if (s === "EXECUTED") return "text-secondary";
  return "text-cyan-400";
}

function statusDot(s: LogStatus) {
  if (s === "REJECTED" || s === "THROTTLED") return "bg-error";
  if (s === "EXECUTED") return "bg-secondary";
  return "bg-cyan-400";
}

export default function LogStream() {
  return (
    <div className="flex-1 glass-panel rounded-xl flex flex-col overflow-hidden border-white/5 relative min-h-[400px]">
      {/* Terminal Header */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-white/5 bg-white/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-error opacity-50" />
            <div className="w-2.5 h-2.5 rounded-full bg-secondary opacity-50" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 opacity-50" />
          </div>
          <span className="font-mono text-[10px] md:text-xs text-slate-500 uppercase tracking-widest truncate">
            ZAMARON_LOG_STREAM_v4.2.0
          </span>
        </div>
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <span className="text-cyan-400/70 font-mono text-[10px] animate-pulse hidden sm:inline">
            ● LIVE STREAMING
          </span>
          <button className="text-slate-500 hover:text-white">
            <span className="material-symbols-outlined text-sm">
              filter_list
            </span>
          </button>
          <button className="text-slate-500 hover:text-white hidden sm:block">
            <span className="material-symbols-outlined text-sm">fullscreen</span>
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block flex-1 overflow-y-auto terminal-scroll p-4 md:p-6 font-mono text-sm">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="sticky top-0 bg-surface-container-low z-10">
            <tr className="text-slate-500 text-[10px] uppercase tracking-widest">
              <th className="pb-4 pl-4">Timestamp</th>
              <th className="pb-4">Actor</th>
              <th className="pb-4">Event Source</th>
              <th className="pb-4">Action Detail</th>
              <th className="pb-4">Status</th>
              <th className="pb-4 text-right pr-4">Trace ID</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="group hover:bg-white/5 transition-colors"
              >
                <td className="py-3 pl-4 text-slate-400 whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className={`py-3 ${actorClass(log.actorVariant)}`}>
                  {log.actor}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded border text-[10px] ${
                      log.sourceVariant === "error"
                        ? "border-error/20 bg-error/5 text-error"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    {log.source}
                  </span>
                </td>
                <td
                  className={`py-3 ${
                    log.actionVariant === "error" ? "text-error" : "text-on-surface"
                  }`}
                >
                  {log.action}
                </td>
                <td className="py-3">
                  <span
                    className={`text-[10px] flex items-center gap-1 ${statusColor(log.status)}`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${statusDot(log.status)}`}
                    />
                    {log.status}
                  </span>
                </td>
                <td className="py-3 text-right pr-4 text-slate-600">
                  {log.traceId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex-1 overflow-y-auto terminal-scroll p-4 space-y-3 font-mono text-xs">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2"
          >
            <div className="flex justify-between items-start gap-2">
              <span className={`font-medium ${actorClass(log.actorVariant)}`}>
                {log.actor}
              </span>
              <span
                className={`text-[10px] flex items-center gap-1 shrink-0 ${statusColor(log.status)}`}
              >
                <span
                  className={`w-1 h-1 rounded-full ${statusDot(log.status)}`}
                />
                {log.status}
              </span>
            </div>
            <p
              className={
                log.actionVariant === "error" ? "text-error" : "text-on-surface"
              }
            >
              {log.action}
            </p>
            <div className="flex flex-wrap gap-2 items-center text-slate-500">
              <span
                className={`px-2 py-0.5 rounded border text-[10px] ${
                  log.sourceVariant === "error"
                    ? "border-error/20 bg-error/5 text-error"
                    : "border-white/10 bg-white/5 text-slate-400"
                }`}
              >
                {log.source}
              </span>
              <span className="text-[10px]">{log.timestamp}</span>
              <span className="text-[10px] text-slate-600 ml-auto">
                {log.traceId}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Console */}
      <div className="px-4 md:px-6 py-3 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[10px]">
        <div className="flex flex-wrap gap-3 md:gap-6">
          <span className="text-slate-500">
            MEM: <span className="text-cyan-400">1.2GB/16GB</span>
          </span>
          <span className="text-slate-500">
            CPU_LOAD: <span className="text-cyan-400">4.5%</span>
          </span>
          <span className="text-slate-500">
            NET_STATUS: <span className="text-secondary">ENCRYPTED_SSL</span>
          </span>
        </div>
        <div className="text-slate-500 italic">
          Showing 6 of 12,450 log entries.
        </div>
      </div>
    </div>
  );
}
