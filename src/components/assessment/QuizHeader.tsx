import type { AssessmentMeta } from "../../types/assessment";

type Props = {
  meta: AssessmentMeta;
  onMenuClick: () => void;
};

export default function QuizHeader({ meta, onMenuClick }: Props) {
  return (
    <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
      <div className="flex items-start gap-3">
        <button
          className="md:hidden p-2 -ml-2 text-cyan-400 hover:bg-white/5 rounded-lg"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex flex-col">
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight text-2xl md:text-[32px]">
            {meta.courseTitle}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-label-sm font-label-sm text-cyan-400 uppercase">
              {meta.phaseLabel}
            </span>
          </div>
        </div>
      </div>
      <div className="glass-panel px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-cyan-500/30 flex items-center gap-3 self-end sm:self-auto">
        <span className="material-symbols-outlined text-cyan-400">timer</span>
        <span className="font-data-lg text-data-lg text-cyan-400 text-lg md:text-2xl">
          {meta.timeRemaining}
        </span>
      </div>
    </div>
  );
}
