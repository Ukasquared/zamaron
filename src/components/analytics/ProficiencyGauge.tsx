export default function ProficiencyGauge() {
  return (
    <div className="md:col-span-4 glass-panel fresnel-edge rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center">
      <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-surface-container-highest stroke-current"
            cx="50"
            cy="50"
            fill="transparent"
            r="45"
            strokeWidth="10"
          />
          <circle
            className="gauge-ring text-primary stroke-current"
            cx="50"
            cy="50"
            fill="transparent"
            r="45"
            strokeLinecap="round"
            strokeWidth="10"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display-xl text-3xl md:text-display-xl text-on-surface">
            94%
          </span>
          <span className="text-label-sm font-label-sm text-primary">
            MASTERY
          </span>
        </div>
      </div>
      <h3 className="text-title-md font-title-md mb-2">
        Master Level Proficiency
      </h3>
      <p className="text-on-surface-variant text-sm md:text-body-md mb-6">
        Top 0.8% of global auditors
      </p>
      <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
        <div className="h-full cyan-purple-gradient shimmer" style={{ width: "94%" }} />
      </div>
    </div>
  );
}
