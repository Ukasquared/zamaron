const navItems = [
  { id: "health", label: "System Health", icon: "monitor_heart", active: false },
  { id: "users", label: "User Management", icon: "group", active: false },
  { id: "content", label: "Content", icon: "description", active: false },
  { id: "security", label: "Security Logs", icon: "security", active: true, fill: true },
  { id: "settings", label: "Settings", icon: "settings", active: false },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SecuritySideNav({ open, onClose }: Props) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col w-72 border-r border-white/10 bg-slate-950/40 backdrop-blur-[20px] shadow-2xl shadow-cyan-900/20 font-display-xl text-sm tracking-wide transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 md:p-8 flex items-start justify-between">
          <div>
            <div className="text-xl font-black tracking-tighter text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
              ZAMARON
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
              Admin Console
            </div>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white p-1"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 mt-2 md:mt-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className={`flex items-center gap-3 px-6 py-4 transition-all duration-300 ease-out active:scale-95 ${
                item.active
                  ? "text-cyan-400 bg-cyan-500/10 border-r-2 border-cyan-400 font-bold"
                  : "text-slate-400 font-medium hover:bg-white/5 hover:text-cyan-200"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  item.fill
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-error font-medium hover:bg-error/5 rounded-lg transition-all">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
