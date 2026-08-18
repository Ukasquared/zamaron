const navItems = [
  { id: "dash", label: "Dashboard", icon: "dashboard", active: false },
  { id: "courses", label: "Course Library", icon: "school", active: false },
  { id: "scanners", label: "Scanners", icon: "security", active: true },
  { id: "network", label: "Network", icon: "hub", active: false },
  { id: "admin", label: "Security Admin", icon: "admin_panel_settings", active: false },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AnalyticsSideNav({ open, onClose }: Props) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`h-screen w-64 fixed left-0 top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-outline-variant/30 shadow-2xl flex flex-col py-6 md:py-8 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-6 mb-8 md:mb-12 flex items-center justify-between">
          <h1 className="font-display-xl text-primary text-xl md:text-headline-lg">
            ZAMARON
          </h1>
          <button
            className="md:hidden text-on-surface-variant p-1"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="px-4 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container shadow-[0_0_10px_rgba(0,229,255,0.3)] shrink-0">
            <img
              alt="Alex Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUsX04adukl9swlfqeyNPZMe-_jP3jPGLOrTLnLWOidUGErM258gej31R2CZXfiEVqOswvcw9MvIZ1ocUaBxMrNh7eb-IfcqGy7n2JySCbKFL54FZZMHaBKAp2AoDuiraFKArWYs-4_aDL4DaNTzoN5larFrzBPFgO4-A6B_fS-lryuepk74VgicFtylnTgQsih1mpt35h64FtArpKxg9icDVIwOSvX1dOkch18RkV4yILaUAEzvxCa3Dkb5ktmwlApr5RFBbe44nr"
            />
          </div>
          <div>
            <p className="text-title-md font-title-md text-on-surface">
              Master Auditor
            </p>
            <p className="text-label-sm font-label-sm text-on-surface-variant">
              Level 42 • Platinum
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-2 px-2">
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
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-body-md">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="px-4 mt-auto space-y-4">
          <button className="w-full cyan-purple-gradient text-background font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:opacity-90 transition-all active:scale-95">
            Upgrade to Elite
          </button>
          <div className="border-t border-outline-variant/30 pt-4">
            <a
              className="text-on-surface-variant hover:text-on-surface p-3 flex items-center gap-3"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-body-md">Settings</span>
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface p-3 flex items-center gap-3"
              href="#"
            >
              <span className="material-symbols-outlined">contact_support</span>
              <span className="font-body-md">Support</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
