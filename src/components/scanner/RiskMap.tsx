export default function RiskMap() {
  return (
    <div className="col-span-12 lg:col-span-8 glass-panel fresnel-edge rounded-2xl p-4 md:p-6 min-h-[280px] md:min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-base md:text-title-md font-title-md text-secondary flex items-center gap-2">
          <span className="material-symbols-outlined">public</span>
          Global Risk Cluster Map
        </h2>
        <span className="px-3 py-1 rounded-full bg-surface-container-highest text-label-sm font-label-sm border border-outline-variant/30">
          LIVE VIEW
        </span>
      </div>
      <div className="flex-1 rounded-xl overflow-hidden relative border border-outline-variant/20 bg-surface-container-lowest min-h-[200px]">
        <img
          className="w-full h-full object-cover opacity-60 absolute inset-0"
          alt="Global risk map"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuABRwwaKtT5tf0aKpPv6Ho8r4Hi6w1aFMVEF75LDxpHSIfSU6gdGaD6p0Az3PWa6nrAb-SXrs6dh98zlWPWBI4qFeHBFmCYTZquAkSZ4E_k0eJvgEvq53NydLh4ZOqYeeSHug1OXK6-bUl_S9pKo03ZEX_0iEn0kSkjth2RcyKIiKdTj4Tej7RJUe1F-9D1fHPWwg02n3JxDM0DVwyXmIPfuXQDl-Q0g2tMm6WuouOM_TgmsecgZiWxLFiEGJcOkDMm6sJ8AdnCucM5"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 p-2.5 md:p-3 bg-surface/80 backdrop-blur-md rounded-lg border border-primary/20 text-label-sm font-label-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>ACTIVE NODES: 1,429</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error" />
            <span>CRITICAL FLARES: 12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
