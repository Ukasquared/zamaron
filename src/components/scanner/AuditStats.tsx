export default function AuditStats() {
  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-gutter">
      <div className="glass-panel fresnel-edge rounded-2xl p-5 md:p-6 flex-1">
        <h3 className="text-base md:text-title-md font-title-md text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">monitoring</span>
          Audit Accuracy
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-label-sm font-label-sm uppercase text-on-surface-variant">
                Heuristic Precision
              </span>
              <span className="text-label-sm font-label-sm text-primary">
                99.8%
              </span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-container shadow-[0_0_10px_rgba(0,218,243,0.5)]"
                style={{ width: "99.8%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-label-sm font-label-sm uppercase text-on-surface-variant">
                False Positive Rate
              </span>
              <span className="text-label-sm font-label-sm text-secondary">
                0.02%
              </span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary"
                style={{ width: "5%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="glass-panel rounded-2xl p-5 md:p-6 flex-1 bg-gradient-to-br from-surface-container-high to-surface-container-lowest border border-outline-variant/20">
        <h3 className="text-label-sm font-label-sm text-outline-variant uppercase mb-4 tracking-widest">
          System Integrity
        </h3>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl md:text-display-xl font-display-xl text-primary leading-none">
              SECURE
            </p>
            <p className="text-sm md:text-body-md font-body-md text-on-surface-variant mt-2">
              All protocols operational.
            </p>
          </div>
          <span className="material-symbols-outlined text-[48px] md:text-[64px] text-primary/20">
            verified_user
          </span>
        </div>
      </div>
    </div>
  );
}
