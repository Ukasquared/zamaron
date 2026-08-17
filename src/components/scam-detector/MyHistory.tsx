import type { ScanHistoryItem } from "../../types/threat";

const history: ScanHistoryItem[] = [
  {
    id: "1",
    target: "0x4B2...19A",
    dateLabel: "Yesterday",
    status: "Clean",
    type: "contract",
  },
  {
    id: "2",
    target: "eth-staking.pro",
    dateLabel: "Oct 12",
    status: "Flagged",
    type: "domain",
  },
];

function typeIcon(type: ScanHistoryItem["type"]) {
  switch (type) {
    case "domain":
      return "language";
    case "wallet":
      return "account_balance_wallet";
    case "contract":
    default:
      return "description";
  }
}

export default function MyHistory() {
  return (
    <div className="bg-surface-container-highest/40 backdrop-blur-[20px] rounded-xl border border-white/5 flex-1 flex flex-col">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container-highest/60">
        <h4 className="font-data-lg text-data-lg text-on-surface">My History</h4>
        <button className="text-outline hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">
            more_horiz
          </span>
        </button>
      </div>
      <div className="p-4 space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center border border-white/10">
                <span className="material-symbols-outlined text-outline">
                  {typeIcon(item.type)}
                </span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface truncate w-32 font-mono">
                  {item.target}
                </p>
                <p className="font-label-sm text-[10px] text-outline">
                  {item.dateLabel}
                </p>
              </div>
            </div>
            <span
              className={`font-label-sm text-[10px] border px-2 py-0.5 rounded ${
                item.status === "Clean"
                  ? "text-primary-container border-primary-container/30 bg-primary-container/10"
                  : "text-error border-error/30 bg-error/10"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}