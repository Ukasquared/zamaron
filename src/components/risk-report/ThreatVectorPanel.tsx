import ThreatItem from './ThreatItem';
import { THREAT_ITEMS, THREAT_COUNTS } from '../../data/riskReportContent';

export default function ThreatVectorPanel() {
  return (
    <div className="bg-surface-container/30 backdrop-blur-[30px] border border-outline-variant/40 rounded-xl overflow-hidden flex-1 flex flex-col">
      <div className="bg-surface-container-high/60 p-6 border-b border-outline-variant/30 flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface text-xl">Threat Vector Analysis</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 border border-error/50 text-error font-label-sm text-label-sm rounded-full bg-error-container/10 glow-box-error">
            Critical: {THREAT_COUNTS.critical}
          </span>
          <span className="px-3 py-1 border border-tertiary-fixed-dim/50 text-tertiary-fixed-dim font-label-sm text-label-sm rounded-full bg-tertiary-container/10">
            Warn: {THREAT_COUNTS.warning}
          </span>
        </div>
      </div>

      <div className="p-card-padding flex flex-col gap-6 overflow-y-auto">
        {THREAT_ITEMS.map((item) => (
          <ThreatItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
