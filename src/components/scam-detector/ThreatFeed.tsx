import type { ThreatItem } from "../../types/threat";

const threats: ThreatItem[] = [
  {
    id: "1",
    timeLabel: "Just now",
    target: "0x71C...976F",
    risk: "Critical",
  },
  {
    id: "2",
    timeLabel: "2m ago",
    target: "solana-airdrop-claim.net",
    risk: "Elevated",
  },
  {
    id: "3",
    timeLabel: "5m ago",
    target: "0x1f9...B421",
    risk: "Safe",
  },
];

function riskStyles(risk: ThreatItem["risk"]) {
  switch (risk) {
    case "Critical":
      return {
        row: "bg-error/5 border-error/10 hover:bg-error/10",
        badge:
          "text-error border-error/30 bg-error/10 drop-shadow-[0_0_5px_rgba(255,180,171,0.5)]",
        arrow: "text-error",
      };
    case "Elevated":
      return {
        row: "bg-white/5 border-white/5 hover:bg-white/10",
        badge:
          "text-secondary-container border-secondary-container/30 bg-secondary-container/10",
        arrow: "text-on-surface-variant",
      };
    case "Safe":
    default:
      return {
        row: "bg-white/5 border-white/5 hover:bg-white/10",
        badge:
          "text-primary-container border-primary-container/30 bg-primary-container/10",
        arrow: "text-on-surface-variant",
      };
  }
}

export default function ThreatFeed() {
  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-3">
          <span
            className="material-symbols-outlined text-error"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            warning
          </span>
          Global Threat Feed
        </h3>
        <span className="font-label-sm text-label-sm text-primary-container flex items-center gap-2 bg-primary-container/10 px-3 py-1 rounded-full border border-primary-container/20">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          Live
        </span>
      </div>

      <div className="bg-surface-container-highest/40 backdrop-blur-[20px] rounded-xl border border-white/5 overflow-hidden flex flex-col h-[500px]">
        <div className="bg-surface-container-highest/80 px-6 py-4 border-b border-white/5 grid grid-cols-12 gap-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">
          <div className="col-span-2">Time</div>
          <div className="col-span-6">Target Hash / Domain</div>
          <div className="col-span-2">Risk</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {threats.map((item) => {
            const styles = riskStyles(item.risk);
            return (
              <div
                key={item.id}
                className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg border transition-colors cursor-pointer group ${styles.row}`}
              >
                <div className="col-span-2 font-body-md text-body-md text-on-surface-variant">
                  {item.timeLabel}
                </div>
                <div className="col-span-6 font-body-md text-body-md text-on-surface font-mono truncate">
                  {item.target}
                </div>
                <div className="col-span-2">
                  <span
                    className={`font-label-sm text-label-sm border px-2 py-1 rounded ${styles.badge}`}
                  >
                    {item.risk}
                  </span>
                </div>
                <div
                  className={`col-span-2 text-right flex justify-end ${styles.arrow}`}
                >
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}