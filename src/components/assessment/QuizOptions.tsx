import type { QuizOption } from "../../types/assessment";

type Props = {
  options: QuizOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function QuizOptions({ options, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {options.map((opt) => {
        const selected = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`glass-panel p-4 md:p-6 rounded-2xl border text-left transition-all neon-border-glow group relative overflow-hidden ${
              selected
                ? "border-cyan-400/50 bg-cyan-500/10"
                : "border-white/5"
            }`}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center font-data-lg text-sm shrink-0 transition-colors ${
                  selected
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-400/40"
                    : "bg-white/5 border-white/10 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400"
                }`}
              >
                {opt.label}
              </div>
              <p
                className={`font-body-md text-sm md:text-base transition-colors ${
                  selected
                    ? "text-white"
                    : "text-slate-300 group-hover:text-white"
                }`}
              >
                {opt.text}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
