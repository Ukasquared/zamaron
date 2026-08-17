import type { NetworkHealthStats } from "../../types/threat";

const stats: NetworkHealthStats = {
  engineStatus: "100% Online",
  scans24h: "14.2k",
  threatsBlocked: 892,
};

export default function NetworkHealth() {
  return (
    <div className="bg-surface-container-highest/40 backdrop-blur-[20px] rounded-xl border border-white/5 p-6 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-container/20 blur-[40px] rounded-full" />
      <h4 className="font-headline-lg text-data-lg text-on-surface mb-6">
        Network Health
      </h4>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between font-label-sm text-label-sm text-outline mb-2">
            <span>Analysis Engine</span>
            <span className="text-primary-container">{stats.engineStatus}</span>
          </div>
          <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
            <div className="h-full bg-primary-container w-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div>
            <p className="font-label-sm text-label-sm text-outline uppercase">
              Scans (24h)
            </p>
            <p className="font-display-xl text-headline-lg text-primary mt-1">
              {stats.scans24h}
            </p>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-outline uppercase">
              Threats Blocked
            </p>
            <p className="font-display-xl text-headline-lg text-error mt-1 drop-shadow-[0_0_8px_rgba(255,180,171,0.3)]">
              {stats.threatsBlocked}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}