export default function ScamDefinitions() {
  return (
    <section className="glass-panel rounded-xl p-5 md:p-card-padding">
      <h3 className="font-headline-lg text-lg text-primary mb-4">
        Scam Definitions
      </h3>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="p-3 md:p-4 border border-white/10 rounded-lg text-center bg-white/5">
          <span className="text-display-xl text-2xl md:text-3xl font-black text-secondary">
            842
          </span>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
            Active Definitions
          </p>
        </div>
        <div className="p-3 md:p-4 border border-white/10 rounded-lg text-center bg-white/5">
          <span className="text-display-xl text-2xl md:text-3xl font-black text-cyan-400">
            +12
          </span>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
            Pending Review
          </p>
        </div>
      </div>
    </section>
  );
}
