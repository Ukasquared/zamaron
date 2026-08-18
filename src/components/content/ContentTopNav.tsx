type Props = {
  onMenuClick: () => void;
};

export default function ContentTopNav({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 md:ml-72 h-14 md:h-16 border-b border-white/10 bg-slate-950/30 backdrop-blur-[20px] shadow-lg shadow-black/50 font-display-xl">
      <div className="flex items-center gap-3 flex-1 min-w-0 max-w-xl">
        <button
          className="md:hidden p-2 -ml-1 text-cyan-400 hover:bg-white/5 rounded-lg shrink-0"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full focus-within:ring-1 focus-within:ring-cyan-500/50 rounded-lg">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            className="w-full bg-slate-900/50 border-none rounded-lg py-2 pl-10 pr-4 text-sm text-cyan-100 placeholder:text-slate-600 focus:ring-0 outline-none"
            placeholder="Search neural patterns or modules..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <div className="hidden sm:flex items-center gap-4">
          {["notifications", "history", "tune"].map((icon) => (
            <button
              key={icon}
              className="text-slate-400 hover:text-cyan-300 hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)] transition-all"
            >
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>
        <div className="h-8 w-8 rounded-full border border-cyan-400/30 p-0.5 overflow-hidden">
          <img
            alt="Admin Avatar"
            className="w-full h-full object-cover rounded-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDJhJoKfmFwrZOJTdvZONMG4A9TUEHkCXL-5mSwI8W0mFXKmIRHuflWzKmT9BqOEMe2enH3dwropdrelROD5cSvCm3t17SomBGiGLEaYjwzxi90LGMPPEZuENoWq--u-uveAnD-BsCVN8xM1xuTr5nntZuQ6g1ku5mvfJPMvZBowVgboAUZpl78KmXW-vV7zXUASImFI4o7V9Ll-h_JfxSAYnFNjdhYlWvfX4LsIz3uPCTdORv1ls1072eZlgsXk-Cf6expcp6dT7p"
          />
        </div>
      </div>
    </header>
  );
}
