export default function HeroSearch() {
  return (
    <section className="flex flex-col items-center text-center mt-12 md:mt-24 space-y-8 relative">
      {/* Decorative Holographic Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
      <h2 className="font-display-xl text-display-xl text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
        Neural{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">
          Scam Detector
        </span>
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
        Deploy advanced heuristics to analyze smart contracts, wallet addresses,
        and domains for malicious signatures.
      </p>
      {/* Search Console */}
      <div className="w-full max-w-3xl mt-8 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative bg-surface-container-high/60 backdrop-blur-[40px] rounded-xl border border-white/10 p-2 flex items-center shadow-2xl">
          <span className="material-symbols-outlined text-outline ml-4 mr-2">
            search
          </span>
          <input
            className="flex-1 bg-transparent border-none text-on-surface font-body-md text-body-md focus:ring-0 placeholder:text-outline/70 py-4 outline-none"
            placeholder="Enter Contract Address, Domain, or Wallet ID..."
            type="text"
          />
          <button className="bg-primary-container/10 text-primary-container border border-primary-container/50 font-label-sm text-label-sm uppercase px-8 py-4 rounded-lg hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">radar</span>
            Scan Now
          </button>
        </div>
      </div>
    </section>
  );
}
