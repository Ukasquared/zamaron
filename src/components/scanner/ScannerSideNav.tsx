const navItems = [
  { id: "dash", label: "Dashboard", icon: "dashboard", active: false },
  { id: "scanners", label: "Scanners", icon: "security", active: true, fill: true },
  { id: "courses", label: "Course Library", icon: "school", active: false },
  { id: "network", label: "Network", icon: "hub", active: false },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ScannerSideNav({ open, onClose }: Props) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`flex flex-col h-screen w-64 fixed left-0 top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-outline-variant/30 py-6 pt-20 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="px-6 mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                <span className="material-symbols-outlined text-primary">
                  shield_person
                </span>
              </div>
              <div>
                <p className="text-title-md font-title-md text-primary">
                  Master Auditor
                </p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">
                  Level 42 • Platinum
                </p>
              </div>
            </div>
            <button className="w-full mt-4 bg-gradient-to-br from-primary-container to-secondary-container text-on-primary-fixed font-bold py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(0,218,243,0.3)] hover:scale-95 transition-all">
              Upgrade to Elite
            </button>
          </div>
          <button
            className="lg:hidden text-on-surface-variant p-1"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className={`p-3 flex items-center gap-3 transition-all duration-200 ${
                item.active
                  ? "bg-secondary-container/20 text-secondary border-l-4 border-secondary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 hover:translate-x-1"
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
              <span className="text-body-md font-body-md">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant/10 px-2">
          <a
            className="text-on-surface-variant hover:text-on-surface p-3 flex items-center gap-3 transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-body-md font-body-md">Settings</span>
          </a>
          <a
            className="text-on-surface-variant hover:text-on-surface p-3 flex items-center gap-3 transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">contact_support</span>
            <span className="text-body-md font-body-md">Support</span>
          </a>
        </div>
      </aside>
    </>
  );
}
