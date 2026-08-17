export default function TopNav() {
  return (
    <nav className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      <div className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-display-xl">
        ZAMARON
      </div>
      <button className="text-cyan-400 p-2">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </nav>
  );
}
