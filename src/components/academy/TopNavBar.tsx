const topLinks = [
  { label: "Dashboard", href: "#", active: false },
  { label: "Courses", href: "#", active: true },
  { label: "Portfolio", href: "#", active: false },
  { label: "Network", href: "#", active: false },
];

export default function TopNavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      <div className="flex justify-between items-center px-8 h-16 w-full max-w-[1280px] mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-display-xl tracking-tight">
            CryptoShield Academy
          </span>
          <div className="hidden md:flex items-center gap-6">
            {topLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-display-xl tracking-tight transition-all duration-300 ${
                  link.active
                    ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:bg-white/5 transition-all duration-300 active:scale-95 cursor-pointer rounded-full">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-slate-400 hover:bg-white/5 transition-all duration-300 active:scale-95 cursor-pointer rounded-full">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-cyan-400/50">
            <img
              alt="User profile avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCENxYh1FnAJim3UyalqJE004NeD3dSx2XOF2QFnvEvAlwFrCVzzYvIW2xTm7aVybJ6SdVrnIECcqv9vG_yk9TgVtB4m9yxr-wah4Mpd6NvuhQEbp97GFuceVuzIdtY-OHCAcppQl08kHvGgC6U4e3IAW1bNt7vYRWBnR7KYHbc_2yeeZv5wTo2JZuS1b3Mup_EAVDkCNW88rWmWIze30m-cSIrzmRgrcKzgI6JxALbQi9-u1bz2tZSY3unIrNWSKL0UYGyCw8bmMeW"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
