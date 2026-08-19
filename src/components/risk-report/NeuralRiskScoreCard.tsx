import { Icon } from '@/components/ui/Icon';

interface NeuralRiskScoreCardProps {
  score: number;
  max: number;
  summary: string;
}

export default function NeuralRiskScoreCard({ score, max, summary }: NeuralRiskScoreCardProps) {
  const percent = Math.round((score / max) * 100);

  return (
    <div className="bg-surface-container/40 backdrop-blur-[20px] border border-error/30 rounded-xl p-card-padding flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-error/10 rounded-full blur-[40px] -mr-10 -mt-10" />

      <div className="flex justify-between items-start mb-6">
        <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
          Neural Risk Score
        </h3>
        <Icon name="memory" className="text-outline-variant" />
      </div>

      <div className="flex items-end gap-4 mt-auto">
        <div className="font-display-xl text-display-xl text-error glow-text-error leading-none">
          {score}
        </div>
        <div className="font-data-lg text-data-lg text-outline-variant leading-none mb-1">/ {max}</div>
      </div>

      <div className="w-full h-2 bg-surface-container-highest mt-6 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-error shadow-[0_0_10px_rgba(255,180,171,0.8)] relative"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
        </div>
      </div>

      <p className="font-body-md text-body-md text-error/80 mt-3 text-sm">{summary}</p>
    </div>
  );
}
