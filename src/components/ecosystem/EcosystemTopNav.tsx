type Props = {
  onMenuClick: () => void;
};

export default function EcosystemTopNav({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 md:ml-72 h-14 md:h-16 border-b border-white/10 bg-slate-950/30 backdrop-blur-[20px] shadow-lg shadow-black/50 font-display-xl">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          className="md:hidden p-2 -ml-1 text-cyan-400 hover:bg-white/5 rounded-lg shrink-0"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full max-w-md group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            className="w-full bg-slate-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50 placeholder:text-slate-500 transition-all text-on-surface"
            placeholder="Scan ecosystem parameters..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <button className="material-symbols-outlined hover:text-cyan-300 hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)] transition-all">
            notifications
          </button>
          <button className="material-symbols-outlined hover:text-cyan-300 hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)] transition-all">
            history
          </button>
          <button className="material-symbols-outlined hover:text-cyan-300 hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)] transition-all">
            tune
          </button>
        </div>
        <div className="flex items-center gap-3 sm:pl-6 sm:border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-cyan-400">ADMIN_01</p>
            <p className="text-[10px] text-slate-500">ROOT PRIVILEGES</p>
          </div>
          <img
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full border border-cyan-500/50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNMxvBiFEclJdUy3uDFh9wM-5aJppACF7vGgp8fADzMtR1P_hZh7Xf5Jv_ZRa4JvTPIJvsddW8tEozwCJpdwFDgVJ_OLGA9OQYpkDe7cHC8O58dJe5VkXps0XC2Qm_B9GWuyaDDfBy2V8OZ6ngYcYAzRv-9g3EMY8tmlYN7O7REuDsY3KjUduMTv4_79XsUs0tvM4QudlZDmWV8M8lkuvlEOwTggBAu-GR6Rg1sGimf7YEB3ER4VBkJyxmOLL2noDHCzA2deUMUR1u"
          />
        </div>
      </div>
    </header>
  );
}
