export default function ScanSearch() {
  return (
    <section className="max-w-4xl mx-auto mb-10 md:mb-16">
      <div className="glass-panel fresnel-edge rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 group transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,218,243,0.2)]">
        <div className="pl-4 text-primary hidden sm:block">
          <span className="material-symbols-outlined text-headline-lg">
            terminal
          </span>
        </div>
        <input
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm md:text-title-md font-label-sm placeholder:text-outline-variant text-primary-fixed outline-none px-4 py-3 sm:py-0"
          placeholder="Enter Contract Address, URL, or Transaction Hash..."
          type="text"
        />
        <button className="bg-gradient-to-r from-primary to-secondary text-background font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
          <span className="material-symbols-outlined">search</span>
          <span>INITIALIZE SCAN</span>
        </button>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-8 text-label-sm font-label-sm text-outline-variant">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          SYSTEM READY
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          LATENCY: 24ms
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-error" />
          THREAT LEVEL: ELEVATED
        </span>
      </div>
    </section>
  );
}
