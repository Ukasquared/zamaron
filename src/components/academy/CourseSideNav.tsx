import type { NavItem, CourseModule } from "../../types/academy";

const course: CourseModule = {
  id: "crypto-security-101",
  title: "Crypto Security 101",
  subtitle: "Module 2: Key Management",
  icon: "security",
};

const navItems: NavItem[] = [
  { id: "intro", label: "Introduction", icon: "info", href: "#" },
  {
    id: "private-key",
    label: "Private Key Safety",
    icon: "vpn_key",
    href: "#",
    active: true,
  },
  { id: "cold-storage", label: "Cold Storage", icon: "ac_unit", href: "#" },
  {
    id: "smart-contract",
    label: "Smart Contract Risks",
    icon: "gavel",
    href: "#",
  },
  {
    id: "assessment",
    label: "Final Assessment",
    icon: "verified",
    href: "#",
  },
];

export default function CourseSideNav() {
  return (
    <aside className="h-screen w-72 sticky top-16 left-0 bg-slate-900/60 backdrop-blur-2xl border-r border-white/10 shadow-2xl flex flex-col pt-8 pb-8 z-40">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center neon-glow-primary">
            <span className="material-symbols-outlined text-white">
              {course.icon}
            </span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg font-display-xl">
              {course.title}
            </h3>
            <p className="text-slate-400 text-xs font-display-xl">
              {course.subtitle}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-white/5">
        <div className="py-2">
          {navItems.map((item) => (
            <div key={item.id} className="px-3 py-1">
              <a
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 font-display-xl text-sm ${
                  item.active
                    ? "bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </div>
          ))}
        </div>
      </nav>

      <div className="px-6 mt-auto pt-8 border-t border-white/5">
        <button className="w-full py-3 bg-white/5 border border-cyan-400/30 rounded-xl text-cyan-400 font-display-xl text-sm hover:bg-cyan-400/10 transition-all duration-300 mb-6 active:scale-95">
          Ask AI Mentor
        </button>
        <div className="space-y-1">
          <a
            className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors font-display-xl text-xs"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">
              description
            </span>
            <span>Resources</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors font-display-xl text-xs"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">help</span>
            <span>Support</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
