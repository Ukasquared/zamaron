import type { TipCard } from "../../types/assessment";

const cards: TipCard[] = [
  {
    id: "tip",
    type: "tip",
    icon: "lightbulb",
    title: "Tip",
    message: "Look for state changes after external calls.",
  },
  {
    id: "streak",
    type: "streak",
    icon: "bolt",
    title: "Security Streak",
    message:
      "You've answered 7 questions correctly in a row. Keep the momentum!",
  },
];

export default function InfoCards() {
  return (
    <div className="w-full max-w-5xl mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Tip card */}
      <div className="glass-panel p-4 md:p-5 rounded-2xl border border-white/5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-cyan-400">
            {cards[0].icon}
          </span>
        </div>
        <div>
          <p className="text-[10px] font-label-sm text-slate-500 uppercase">
            {cards[0].title}
          </p>
          <p className="text-xs text-slate-300">{cards[0].message}</p>
        </div>
      </div>

      {/* Streak card */}
      <div className="md:col-span-2 glass-panel p-4 md:p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary">
              {cards[1].icon}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-label-sm text-slate-500 uppercase">
              {cards[1].title}
            </p>
            <p className="text-xs text-slate-300">{cards[1].message}</p>
          </div>
        </div>
        <div className="flex -space-x-2 shrink-0">
          <div className="w-6 h-6 rounded-full bg-cyan-500 border border-slate-900" />
          <div className="w-6 h-6 rounded-full bg-cyan-600 border border-slate-900" />
          <div className="w-6 h-6 rounded-full bg-cyan-700 border border-slate-900" />
        </div>
      </div>
    </div>
  );
}
