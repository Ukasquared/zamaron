export default function RiskHeatmap() {
  return (
    <div className="glass-panel rounded-2xl p-5 md:p-card-padding">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-headline-lg text-lg text-primary">
          Protocol Risk Heatmap
        </h4>
        <span className="material-symbols-outlined text-cyan-400">map</span>
      </div>
      <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,219,233,0.1),transparent)] opacity-50" />
        <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-error/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-cyan-400/10 rounded-full blur-2xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            alt="Cyber Security Visual"
            className="w-full h-full object-cover opacity-20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV12zZ8T5nfcCsXZYWd9Z-46k4cj19auQEkkqK8VPE6Zp-qwa1L-rcJMuDFwul3jDDkKuP-5il0mZg8yWHT5ZJiaArMkgdQHYRcIC_6lqRs_eiajT83DuySr0wLYMJ2_RDy2nDeW_Vn3jPD9XBdQS7g8izfjLL_LFNV7oB6Vo-ZwLxj6yVkw0oE6mwgpXcrQz5YY93tGaGDpDeQQtOVSfbsq05g1D8SQTvwuX7AprZKieftL_nhSLux4I3enxtGijDJsBpZHHXE5Og"
          />
        </div>
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 p-2.5 md:p-3 bg-slate-900/80 backdrop-blur rounded-lg border border-white/10">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Current Focus
          </p>
          <p className="text-xs md:text-sm font-bold text-white">
            Central European Cluster [NODE_04]
          </p>
        </div>
      </div>
    </div>
  );
}
