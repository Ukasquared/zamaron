type Props = {
  onMenuClick: () => void;
};

export default function AdminTopNav({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 h-14 md:h-16 border-b border-white/10 bg-slate-950/30 backdrop-blur-[20px] shadow-lg shadow-black/50 font-display-xl">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          className="md:hidden p-2 -ml-1 text-cyan-400 hover:bg-white/5 rounded-lg shrink-0"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full max-w-md group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors text-sm">
            search
          </span>
          <input
            className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none text-on-surface"
            placeholder="Search operatives, protocols, or hash..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <div className="hidden sm:flex items-center gap-2">
          {["notifications", "history", "tune"].map((icon) => (
            <button
              key={icon}
              className="p-2 text-slate-400 hover:text-cyan-300 hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)] transition-all"
            >
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>
        <div className="hidden sm:block h-8 w-px bg-white/10" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-cyan-400">COMMANDER_ALPHA</p>
            <p className="text-[10px] text-slate-500">Super Admin</p>
          </div>
          <img
            alt="Admin Avatar"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-cyan-500/30 p-0.5"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBxUCkl7yP1QV0-Nj1ERnnO3oeQWF3JNAMkVX8zQ3rTzYgRrtgokT4g3ID_3OSrzst-_zLzJ5TbKjwBpDTr52VeDYv-KFVZXPg0nB81NPz7xtJaL0AC_J6744tnkshKB7CCceHucPxD0kiFo3qZHHWhW4eHczDAIZj1O3j_SVXmmF2I2OwTOa9JsmVy7KfIp3IEiq3xsnCU4o2f1sD3MDu_2ifid9WMUyYkyM7kxTKQKXqpsKrRLj4OyKyqhI9gXkTjNPtJAOQrjvF"
          />
        </div>
      </div>
    </header>
  );
}
