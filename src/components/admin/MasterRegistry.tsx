import type { RegistryRow } from "../../types/admin";

const rows: RegistryRow[] = [
  {
    id: "1",
    type: "operative",
    name: "Xavier Zephyr",
    subtitle: "0x4a...E9b2",
    initials: "XZ",
    gradient: "from-cyan-400 to-blue-600",
    clearance: "LEVEL 4 - OVERSEER",
    clearanceVariant: "level",
    status: "Verified",
    statusVariant: "verified",
    riskPercent: 15,
    riskLabel: "MINIMAL (1.2)",
    riskVariant: "minimal",
    lastSync: "2m ago",
    action: "menu",
  },
  {
    id: "2",
    type: "protocol",
    name: "AETHER_LIQUIDITY_V3",
    subtitle: "Contract Hub [DeFi]",
    clearance: "STANDARD API",
    clearanceVariant: "standard",
    status: "Monitoring",
    statusVariant: "monitoring",
    riskPercent: 45,
    riskLabel: "MODERATE (4.8)",
    riskVariant: "moderate",
    lastSync: "14h ago",
    action: "menu",
  },
  {
    id: "3",
    type: "suspicious",
    name: "Unknown_Entity_88",
    subtitle: "0xBD...0101",
    clearance: "REVOKED",
    clearanceVariant: "revoked",
    status: "Suspicious",
    statusVariant: "suspicious",
    riskPercent: 88,
    riskLabel: "CRITICAL (8.8)",
    riskVariant: "critical",
    lastSync: "ACTIVE NOW",
    lastSyncUrgent: true,
    action: "isolate",
  },
  {
    id: "4",
    type: "operative",
    name: "Elena Lyra",
    subtitle: "0x9F...C001",
    initials: "EL",
    gradient: "from-purple-500 to-pink-600",
    clearance: "LEVEL 2 - ANALYST",
    clearanceVariant: "level",
    status: "Verified",
    statusVariant: "verified",
    riskPercent: 22,
    riskLabel: "LOW (2.2)",
    riskVariant: "minimal",
    lastSync: "1h ago",
    action: "menu",
  },
  {
    id: "5",
    type: "blacklisted",
    name: "Ghost_Protocol_7",
    subtitle: "BLACKLISTED",
    clearance: "TERMINATED",
    clearanceVariant: "terminated",
    status: "Blacklisted",
    statusVariant: "blacklisted",
    riskPercent: 100,
    riskLabel: "MAXIMAL (10.0)",
    riskVariant: "maximal",
    lastSync: "12d ago",
    action: "restore",
  },
];

function clearanceClass(v: RegistryRow["clearanceVariant"]) {
  switch (v) {
    case "level":
      return "border-cyan-400/30 text-cyan-400 bg-cyan-400/5";
    case "revoked":
      return "border-error/30 text-error bg-error/5";
    case "terminated":
      return "border-white/10 text-slate-600";
    default:
      return "border-white/10 text-slate-400";
  }
}

function statusClass(v: RegistryRow["statusVariant"]) {
  switch (v) {
    case "verified":
      return "text-cyan-400";
    case "monitoring":
      return "text-secondary";
    case "suspicious":
      return "text-error";
    default:
      return "text-slate-600";
  }
}

function riskBarClass(v: RegistryRow["riskVariant"]) {
  switch (v) {
    case "critical":
      return "bg-error";
    case "moderate":
      return "bg-secondary";
    case "maximal":
      return "bg-slate-600";
    default:
      return "bg-cyan-400";
  }
}

function EntityAvatar({ row }: { row: RegistryRow }) {
  if (row.type === "protocol") {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/10 shrink-0">
        <span
          className="material-symbols-outlined text-secondary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          terminal
        </span>
      </div>
    );
  }
  if (row.type === "suspicious") {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-error/50 shrink-0">
        <span className="material-symbols-outlined text-error">person_alert</span>
      </div>
    );
  }
  if (row.type === "blacklisted") {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-white/10 shrink-0">
        <span className="material-symbols-outlined text-slate-500">block</span>
      </div>
    );
  }
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${row.gradient} flex items-center justify-center text-white font-bold text-xs ring-2 ring-cyan-400/20 shrink-0`}
    >
      {row.initials}
    </div>
  );
}

export default function MasterRegistry() {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
      {/* Toolbar */}
      <div className="p-4 md:p-6 border-b border-white/5 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h3 className="font-headline-lg text-lg text-on-surface">
            Master Registry
          </h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 rounded bg-cyan-400 text-on-primary text-[10px] font-bold tracking-widest uppercase">
              ALL
            </button>
            <button className="px-3 py-1 rounded border border-white/10 text-slate-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-[10px] font-bold tracking-widest uppercase">
              OPERATIVES
            </button>
            <button className="px-3 py-1 rounded border border-white/10 text-slate-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-[10px] font-bold tracking-widest uppercase">
              PROTOCOLS
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-slate-300 hover:text-white transition-all text-xs md:text-sm">
            <span className="material-symbols-outlined text-[18px]">
              filter_alt
            </span>
            Risk Filter
          </button>
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-slate-300 hover:text-white transition-all text-xs md:text-sm">
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            Export
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 text-slate-400 font-label-sm text-[10px] tracking-[0.2em] uppercase">
              <th className="px-8 py-4 font-semibold">
                <input
                  className="rounded border-white/10 bg-transparent text-cyan-400 focus:ring-cyan-500"
                  type="checkbox"
                />
              </th>
              <th className="px-6 py-4 font-semibold">Identity / Entity</th>
              <th className="px-6 py-4 font-semibold">Security Clearance</th>
              <th className="px-6 py-4 font-semibold">Current Status</th>
              <th className="px-6 py-4 font-semibold">Risk Rating</th>
              <th className="px-6 py-4 font-semibold">Last Sync</th>
              <th className="px-8 py-4 font-semibold text-right">Command</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-body-md text-sm">
            {rows.map((row) => (
              <tr
                key={row.id}
                className={`transition-colors group ${
                  row.type === "suspicious"
                    ? "hover:bg-error/[0.02] bg-error/5"
                    : row.type === "blacklisted"
                      ? "hover:bg-slate-900 opacity-60"
                      : "hover:bg-cyan-400/[0.02]"
                }`}
              >
                <td className="px-8 py-5">
                  <input
                    className="rounded border-white/10 bg-transparent text-cyan-400 focus:ring-cyan-500"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <EntityAvatar row={row} />
                    <div>
                      <p
                        className={`font-bold ${
                          row.type === "suspicious"
                            ? "text-error"
                            : row.type === "blacklisted"
                              ? "text-slate-500 line-through"
                              : "text-on-surface"
                        }`}
                      >
                        {row.name}
                      </p>
                      <p
                        className={`text-xs ${
                          row.type === "suspicious"
                            ? "text-error/70"
                            : row.type === "blacklisted"
                              ? "text-slate-600"
                              : "text-slate-500"
                        }`}
                      >
                        {row.subtitle}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`px-2 py-1 rounded border text-[10px] font-bold ${clearanceClass(row.clearanceVariant)}`}
                  >
                    {row.clearance}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div
                    className={`flex items-center gap-2 ${statusClass(row.statusVariant)}`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        row.statusVariant === "verified"
                          ? "bg-cyan-400 animate-pulse"
                          : row.statusVariant === "monitoring"
                            ? "bg-secondary"
                            : row.statusVariant === "suspicious"
                              ? "bg-error"
                              : "bg-slate-600"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        row.statusVariant === "suspicious"
                          ? "uppercase tracking-wider"
                          : ""
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${riskBarClass(row.riskVariant)}`}
                      style={{ width: `${row.riskPercent}%` }}
                    />
                  </div>
                  <span
                    className={`text-[10px] mt-1 block ${
                      row.riskVariant === "critical"
                        ? "text-error font-bold"
                        : row.riskVariant === "maximal"
                          ? "text-slate-600"
                          : "text-slate-500"
                    }`}
                  >
                    {row.riskLabel}
                  </span>
                </td>
                <td
                  className={`px-6 py-5 text-xs uppercase tracking-tighter ${
                    row.lastSyncUrgent
                      ? "text-error font-bold underline"
                      : row.type === "blacklisted"
                        ? "text-slate-600"
                        : "text-slate-400"
                  }`}
                >
                  {row.lastSync}
                </td>
                <td className="px-8 py-5 text-right">
                  {row.action === "isolate" ? (
                    <button className="px-4 py-1.5 rounded bg-error text-on-error font-label-sm text-[10px] hover:brightness-110 transition-all">
                      ISOLATE
                    </button>
                  ) : (
                    <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                      <span className="material-symbols-outlined">
                        {row.action === "restore"
                          ? "settings_backup_restore"
                          : "more_vert"}
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden divide-y divide-white/5">
        {rows.map((row) => (
          <div
            key={row.id}
            className={`p-4 space-y-3 ${
              row.type === "suspicious"
                ? "bg-error/5"
                : row.type === "blacklisted"
                  ? "opacity-60"
                  : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <EntityAvatar row={row} />
                <div className="min-w-0">
                  <p
                    className={`font-bold text-sm truncate ${
                      row.type === "suspicious"
                        ? "text-error"
                        : row.type === "blacklisted"
                          ? "text-slate-500 line-through"
                          : "text-on-surface"
                    }`}
                  >
                    {row.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{row.subtitle}</p>
                </div>
              </div>
              {row.action === "isolate" ? (
                <button className="px-3 py-1 rounded bg-error text-on-error font-label-sm text-[10px] shrink-0">
                  ISOLATE
                </button>
              ) : (
                <button className="p-1 text-slate-500 shrink-0">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span
                className={`px-2 py-0.5 rounded border text-[10px] font-bold ${clearanceClass(row.clearanceVariant)}`}
              >
                {row.clearance}
              </span>
              <div
                className={`flex items-center gap-1.5 ${statusClass(row.statusVariant)}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    row.statusVariant === "verified"
                      ? "bg-cyan-400"
                      : row.statusVariant === "monitoring"
                        ? "bg-secondary"
                        : row.statusVariant === "suspicious"
                          ? "bg-error"
                          : "bg-slate-600"
                  }`}
                />
                <span className="text-xs">{row.status}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${riskBarClass(row.riskVariant)}`}
                    style={{ width: `${row.riskPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500">{row.riskLabel}</span>
              </div>
              <span
                className={`uppercase tracking-tighter ${
                  row.lastSyncUrgent ? "text-error font-bold" : "text-slate-400"
                }`}
              >
                {row.lastSync}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer pagination */}
      <div className="p-4 md:p-6 bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <span className="text-xs text-slate-500">
            Selected: <span className="text-cyan-400 font-bold">0</span>
          </span>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-bold text-slate-400 disabled:opacity-50"
              disabled
            >
              BULK VERIFY
            </button>
            <button
              className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-bold text-slate-400 disabled:opacity-50"
              disabled
            >
              SUSPEND ACCESS
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <span className="text-xs text-slate-500">
            Displaying 1-10 of 1,284 entries
          </span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-slate-500 hover:bg-white/5">
              <span className="material-symbols-outlined text-[18px]">
                chevron_left
              </span>
            </button>
            <button className="w-8 h-8 rounded bg-cyan-400 text-on-primary font-bold text-xs">
              1
            </button>
            <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 text-xs hidden sm:flex">
              2
            </button>
            <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 text-xs hidden sm:flex">
              3
            </button>
            <span className="text-slate-500 text-xs px-1">...</span>
            <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 text-xs">
              129
            </button>
            <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-slate-500 hover:bg-white/5">
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
