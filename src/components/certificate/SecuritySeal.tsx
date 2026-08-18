export default function SecuritySeal() {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center shrink-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-full animate-pulse border border-white/20" />
      <div className="absolute inset-1.5 sm:inset-2 border border-dashed border-cyan-400/40 rounded-full" />
      <div className="relative z-10 flex flex-col items-center">
        <span
          className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          security
        </span>
        <span className="font-label-sm text-[6px] sm:text-[7px] md:text-[8px] mt-0.5 md:mt-1 text-primary-fixed-dim text-center leading-tight">
          GENESIS
          <br />
          SHIELD
        </span>
      </div>
    </div>
  );
}
