const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", active: false },
  { id: "scam", label: "Scam Detector", icon: "security", active: false },
  { id: "courses", label: "Course Library", icon: "school", active: true },
  { id: "reports", label: "Risk Reports", icon: "analytics", active: false },
  { id: "settings", label: "Settings", icon: "settings", active: false },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AssessmentSideNav({ open, onClose }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full flex flex-col bg-slate-950/60 backdrop-blur-2xl border-r border-white/10 w-64 z-50 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-6 py-8 flex items-start justify-between">
          <div>
            <span className="text-xl font-black text-cyan-400 font-display-xl">
              ZAMARON
            </span>
            <div className="mt-2">
              <p className="text-xs font-label-sm text-cyan-400 uppercase tracking-widest">
                Zamaron Terminal
              </p>
              <p className="text-[10px] text-slate-500 font-label-sm">
                ELITE ACCESS
              </p>
            </div>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white p-1"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className={`flex items-center gap-3 px-6 py-4 transition-all font-display-xl font-medium ${
                item.active
                  ? "bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400"
                  : "text-slate-500 hover:bg-white/5 hover:text-cyan-200"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-500/50 shrink-0">
              <img
                className="w-full h-full object-cover"
                alt="User avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9FyqsBpV4sDOr5P9gyFu9MC1g4pj2Nottyuh135bYv0QWUg1HdEJD1l0MaYiqtLbw9bs3CO3WK-BLveAvuRDfAjJcQeXNVAZd_1zyQbxJfnEr0DKWXPYnc7s0RRHV1Ppcw2v6dHNmOmk-3dB0t8jo3M2CS88iMedJfJGoa1xQFLN1mPVuoOheDAkUDmAuFfX0fymt9d2b6hzwrslHobVVD7uHjMDMx4PBCQISr72Ohr9LgqS35FtoWTzrbrlydRVWAYexNwFLa3x_"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-200 truncate">
                ID: 8829-X
              </p>
              <p className="text-[10px] text-cyan-400 uppercase tracking-tighter">
                Verified Operative
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
