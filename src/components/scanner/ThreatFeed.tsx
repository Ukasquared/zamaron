import type { ThreatFeedItem } from "../../types/scanner";

const items: ThreatFeedItem[] = [
  {
    id: "1",
    level: "CRITICAL",
    message: "Rug pull detected: 0x21...ff (Liquidity removed 2 mins ago)",
  },
  {
    id: "2",
    level: "ALERT",
    message:
      "High volume phishing campaign targeting 'MetaMask' users via X.com",
  },
  {
    id: "3",
    level: "INTEL",
    message: "New whitelist entry: 0x89...aa (Verified Institutional)",
  },
  {
    id: "4",
    level: "CRITICAL",
    message:
      "Re-entrancy vulnerability found in 'YieldMaster' smart contract",
  },
  {
    id: "5",
    level: "ALERT",
    message: "Suspicious DNS resolution changes for 5 major DeFi gateways",
  },
];

const levelClass = {
  CRITICAL: "text-error",
  ALERT: "text-secondary",
  INTEL: "text-primary",
};

export default function ThreatFeed() {
  const doubled = [...items, ...items];

  return (
    <footer className="fixed bottom-0 left-0 lg:left-64 right-0 z-50 h-12 bg-background/90 backdrop-blur-xl border-t border-error/20 flex items-center overflow-hidden">
      <div className="bg-error px-3 md:px-4 h-full flex items-center gap-2 text-on-error font-bold text-label-sm whitespace-nowrap shrink-0">
        <span
          className="material-symbols-outlined text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          warning
        </span>
        <span className="hidden sm:inline">LIVE THREAT FEED</span>
      </div>
      <div className="flex-1 px-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap items-center text-label-sm font-label-sm text-on-surface-variant gap-12">
          {doubled.map((item, i) => (
            <span key={`${item.id}-${i}`} className="flex items-center gap-2 mx-6">
              <span className={levelClass[item.level]}>[{item.level}]</span>
              {item.message}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
