import type { ProficiencyStats } from "../../types/analytics";

type Props = {
  stats: ProficiencyStats;
};

export default function ProficiencyHero({ stats }: Props) {
  const circumference = 2 * Math.PI * 100;
  const offset = circumference * (1 - stats.score / 100);

  return (
    <div className="lg:col-span-2 glass-panel p-6 md:p-card-padding rounded-xl relative flex flex-col sm:flex-row items-center gap-8 md:gap-12 overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10 group-hover:bg-cyan-500/20 transition-all duration-700" />

      {/* Circular Gauge */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-[240px] md:h-[240px] shrink-0">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 220 220"
        >
          <circle
            cx="110"
            cy="110"
            r="100"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
          />
          <circle
            cx="110"
            cy="110"
            r="100"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 8px #00f0ff)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl sm:text-5xl font-display-xl text-cyan-400 text-glow-cyan leading-none">
            {stats.score}
          </span>
          <span className="text-[10px] sm:text-xs font-label-sm text-slate-500 tracking-widest mt-1 uppercase">
            Proficiency
          </span>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="material-symbols-outlined text-cyan-400 text-sm">
              verified_user
            </span>
            <span className="font-label-sm text-cyan-400 text-xs uppercase tracking-widest">
              Security Status: {stats.status}
            </span>
          </div>
          <h3 className="font-headline-lg text-xl md:text-headline-lg text-white mb-3 md:mb-4">
            {stats.title}
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            {stats.description}{" "}
            <span className="text-cyan-400">{stats.highlight}</span> certification.
          </p>
        </div>
        <div className="flex justify-center sm:justify-start gap-6 md:gap-8">
          <div>
            <p className="text-slate-500 text-xs font-label-sm uppercase mb-1">
              Global Rank
            </p>
            <p className="text-white font-data-lg text-lg md:text-data-lg">
              {stats.globalRank}
            </p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <p className="text-slate-500 text-xs font-label-sm uppercase mb-1">
              XP Earned
            </p>
            <p className="text-white font-data-lg text-lg md:text-data-lg">
              {stats.xpEarned}
            </p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <p className="text-slate-500 text-xs font-label-sm uppercase mb-1">
              Streaks
            </p>
            <p className="text-white font-data-lg text-lg md:text-data-lg">
              {stats.streaks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
