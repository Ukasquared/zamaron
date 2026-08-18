type Props = {
  onMenuClick: () => void;
};

export default function SecurityTopNav({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 h-14 md:h-16 border-b border-white/10 bg-slate-950/30 backdrop-blur-[20px] shadow-lg shadow-black/50 font-display-xl">
      <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
        <button
          className="md:hidden p-2 -ml-1 text-cyan-400 hover:bg-white/5 rounded-lg shrink-0"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full max-w-md group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
            search
          </span>
          <input
            className="bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 w-full text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-cyan-300 placeholder:text-slate-600"
            placeholder="Advanced regex search..."
            type="text"
          />
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm shrink-0">
          <span className="material-symbols-outlined text-sm">
            calendar_today
          </span>
          <span>Last 24 Hours</span>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <div className="hidden sm:flex items-center gap-4">
          {["notifications", "history", "tune"].map((icon) => (
            <button
              key={icon}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>
        <div className="h-8 w-8 rounded-full border border-cyan-500/50 overflow-hidden">
          <img
            alt="Admin Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQyQ00sa7TKU-KxsG1JdfDLezhTlGvaXl4GQ2aZKopDmaVGskfUl4FWPND_9v_t9kxksVulHX4H9dkTvpUihDtEPp1DlG4f5m0w7pLxxsPgukkHwLLr_f8ljDGkyaXXSlsnZ5hWghnbslrAQoyVJFihYQrfvCjXbgEbu0jK09E6JFnj6b-Vf9SvNFLJCS-2qvnhqUhiXcS8qZ1iTi_SEo0SSeuZt3zxyY_y90sP83Ur4qSBDoRXoMSLjkjRc1cKJIVaoXj07yxGSDb"
          />
        </div>
      </div>
    </header>
  );
}
