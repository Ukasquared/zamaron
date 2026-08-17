export default function SideNav() {
  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-full flex-col bg-slate-950/60 backdrop-blur-2xl border-r border-white/10 w-64 shadow-2xl z-40">
      <div className="px-6 py-8 border-b border-white/5">
        <h1 className="text-xl font-black text-cyan-400 font-display-xl tracking-tighter">
          ZAMARON
        </h1>
        <p className="font-label-sm text-label-sm text-outline mt-1 uppercase tracking-widest">
          Elite Access
        </p>
      </div>
      <div className="flex-1 py-6 overflow-y-auto space-y-2">
        <a
          className="text-slate-500 flex items-center gap-3 px-6 py-4 hover:bg-white/5 hover:text-cyan-200 transition-all font-body-md text-body-md"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            dashboard
          </span>
          Dashboard
        </a>
        <a
          className="bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400 flex items-center gap-3 px-6 py-4 font-body-md text-body-md shadow-[inset_0_0_20px_rgba(0,240,255,0.05)] translate-x-1 transition-transform"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            security
          </span>
          Scam Detector
        </a>
        <a
          className="text-slate-500 flex items-center gap-3 px-6 py-4 hover:bg-white/5 hover:text-cyan-200 transition-all font-body-md text-body-md"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            school
          </span>
          Course Library
        </a>
        <a
          className="text-slate-500 flex items-center gap-3 px-6 py-4 hover:bg-white/5 hover:text-cyan-200 transition-all font-body-md text-body-md"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            analytics
          </span>
          Risk Reports
        </a>
        <a
          className="text-slate-500 flex items-center gap-3 px-6 py-4 hover:bg-white/5 hover:text-cyan-200 transition-all font-body-md text-body-md"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            settings
          </span>
          Settings
        </a>
      </div>
    </nav>
  );
}
