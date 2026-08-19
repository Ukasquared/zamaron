export default function ModuleEditor() {
  return (
    <section className="glass-panel-heavy rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900/40">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <span className="material-symbols-outlined text-cyan-400 shrink-0">
            edit_note
          </span>
          <h3 className="font-headline-lg text-base md:text-lg text-primary truncate">
            Module Editor:{" "}
            <span className="text-cyan-400">Advanced Ledger Security</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">
            Auto-saving...
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[320px] md:h-[500px]">
        {/* Markdown Editor */}
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-black/20 border-b md:border-b-0 md:border-r border-white/10 font-mono text-xs sm:text-sm leading-relaxed text-cyan-100/80 focus-within:bg-black/40 transition-colors overflow-y-auto max-h-[240px] md:max-h-none">
          <p className="mb-4 text-slate-500">
            # Lesson 4: Hardware Wallet Verification
          </p>
          <p className="mb-4">
            In this segment, we explore the **Neural Verification Path** (NVP)
            used to confirm the physical integrity of Cold Storage devices.
          </p>
          <p className="mb-4 text-cyan-500/50">
            ![Security Mesh Diagram](asset-321)
          </p>
          <p className="mb-4">
            &gt; Warning: Never broadcast your private entropy hash over
            unencrypted holographic channels.
          </p>
          <p className="mb-4">## Steps for Verification:</p>
          <p>
            1. Initialize the quantum handshake.
            <br />
            2. Scan for physical tampering markers.
            <br />
            3. Verify firmware signature against ZAMARON mainnet.
          </p>
        </div>

        {/* Preview Canvas */}
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-slate-900/60 overflow-y-auto">
          <div className="mb-4 md:mb-6">
            <span className="text-[10px] text-secondary font-label-sm border border-secondary/30 px-2 py-0.5 rounded">
              PREVIEW MODE
            </span>
            <h1 className="font-headline-lg text-xl sm:text-2xl md:text-3xl text-white mt-3 md:mt-4">
              Hardware Wallet Verification
            </h1>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden mb-4 md:mb-6 border border-cyan-400/20 shadow-2xl relative group">
            <img
              alt="Hardware Security"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj7noAerZzb39qZOaOw2ArMN8yN8MRxxlN5RCb3k5PZyx4mveIG4USMoXgBh0zUlEruCGYmrNy7Uq5u003TtszxR4bxVLTvnzfs4P1-FAk_VphW3Akc4GeWttR5R_Ffnq7G_anIH8PpdeFjKI4PPXto7DuCEiuHg9H3MjtYJzhFnJFmNLl4awgbJ11rJhzbQibqH5sQOLKDaeNv8eeLBkyAQX6tDKUsktstOVDOO7pCkTAZ167ZQcmVHngFiXJUA1Q83WLITGgYS7D"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
              <button className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                <span className="material-symbols-outlined text-white">
                  play_arrow
                </span>
              </button>
            </div>
          </div>
          <article className="space-y-3 md:space-y-4 text-slate-300 text-sm">
            <p>
              In this segment, we explore the{" "}
              <span className="text-cyan-400 font-bold">
                Neural Verification Path
              </span>{" "}
              (NVP) used to confirm the physical integrity of Cold Storage
              devices.
            </p>
            <div className="p-3 md:p-4 bg-tertiary-container/5 border-l-2 border-tertiary-fixed-dim rounded-r-lg">
              <p className="text-xs italic text-tertiary-fixed-dim">
                Warning: Never broadcast your private entropy hash over
                unencrypted holographic channels.
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="p-3 md:p-4 bg-slate-950/80 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 border-t border-white/10">
        <button className="px-4 py-2 text-label-sm text-slate-400 hover:text-white transition-all order-3 sm:order-1">
          Discard Changes
        </button>
        <button className="px-4 md:px-6 py-2 bg-secondary/10 border border-secondary/30 rounded-lg text-label-sm text-secondary hover:bg-secondary/20 transition-all order-2">
          Update Patterns
        </button>
        <button className="px-4 md:px-6 py-2 bg-cyan-400 text-on-primary-container rounded-lg text-label-sm font-bold shadow-[0_0_20px_rgba(0,219,233,0.4)] order-1 sm:order-3">
          Publish to Academy
        </button>
      </div>
    </section>
  );
}
