import type { AuditRow } from "../../types/scanner";

const rows: AuditRow[] = [
  {
    id: "1",
    timestamp: "14:22:01",
    entity: "0x7a25...488d",
    entityLabel: "Uniswap V2 Router",
    entityVariant: "primary",
    network: "Ethereum",
    riskScore: "0.002",
    riskVariant: "primary",
    status: "Institutional",
    statusVariant: "institutional",
  },
  {
    id: "2",
    timestamp: "13:58:12",
    entity: "dex-liq-drain.eth",
    entityLabel: "Suspicious Phishing URL",
    entityVariant: "error",
    network: "N/A",
    riskScore: "0.994",
    riskVariant: "error",
    status: "Blacklisted",
    statusVariant: "blacklisted",
  },
  {
    id: "3",
    timestamp: "13:45:00",
    entity: "0xbc4c...f132",
    entityLabel: "Unknown Token Contract",
    entityVariant: "secondary",
    network: "Base",
    riskScore: "0.420",
    riskVariant: "secondary",
    status: "Watchlist",
    statusVariant: "watchlist",
  },
];

const entityClass = {
  primary: "text-primary",
  error: "text-error",
  secondary: "text-secondary",
};

const statusClass = {
  institutional: "bg-primary/10 text-primary border-primary/20",
  blacklisted: "bg-error/10 text-error border-error/20",
  watchlist: "bg-secondary/10 text-secondary border-secondary/20",
};

export default function AuditHistory() {
  return (
    <div className="col-span-12 glass-panel fresnel-edge rounded-2xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-outline-variant/10 flex justify-between items-center gap-3">
        <h2 className="text-base md:text-title-md font-title-md text-secondary">
          Recent Audit History
        </h2>
        <button className="text-label-sm font-label-sm text-primary hover:underline shrink-0">
          EXPORT REPORT
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              {[
                "Timestamp",
                "Contract / Entity",
                "Network",
                "Risk Score",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h || "action"}
                  className="p-4 text-label-sm font-label-sm text-outline-variant uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-surface-variant/20 transition-colors"
              >
                <td className="p-4 font-label-sm text-on-surface-variant">
                  {row.timestamp}
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span
                      className={`font-bold ${entityClass[row.entityVariant]}`}
                    >
                      {row.entity}
                    </span>
                    <span className="text-label-sm text-outline-variant">
                      {row.entityLabel}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-on-surface">{row.network}</td>
                <td className="p-4">
                  <span
                    className={`font-bold ${entityClass[row.riskVariant]}`}
                  >
                    {row.riskScore}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full border text-label-sm ${statusClass[row.statusVariant]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <a
                    href="#"
                    className="material-symbols-outlined cursor-pointer hover:text-primary"
                  >
                    open_in_new
                  </a>
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
                <p
                  className={`font-bold text-sm ${entityClass[row.entityVariant]}`}
                >
                  {row.entity}
                </p>
                <p className="text-label-sm text-outline-variant">
                  {row.entityLabel}
                </p>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full border text-[10px] shrink-0 ${statusClass[row.statusVariant]}`}
              >
                {row.status}
              </span>
            </div>
            <div className="flex justify-between text-label-sm text-on-surface-variant">
              <span>{row.timestamp}</span>
              <span>{row.network}</span>
              <span className={`font-bold ${entityClass[row.riskVariant]}`}>
                {row.riskScore}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
