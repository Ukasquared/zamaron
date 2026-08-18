type Props = {
  onMenuClick: () => void;
};

const links = ["Academy", "Ecosystem", "Governance", "Vaults"];

export default function AnalyticsTopNav({ onMenuClick }: Props) {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-8 h-16 md:h-20 bg-slate-950/40 backdrop-blur-xl text-cyan-400 border-b border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      <div className="flex items-center gap-4 md:gap-12 md:ml-64">
        <button
          className="md:hidden p-2 -ml-1 text-cyan-400 hover:bg-white/5 rounded-lg"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="text-xl md:text-2xl font-bold tracking-tighter text-cyan-400 uppercase font-display-xl">
          Zamaron
        </div>
        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <a
              key={link}
              className="text-slate-400 hover:text-white transition-colors pb-1"
              href="#"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="material-symbols-outlined text-slate-400 hover:text-cyan-400 transition-colors text-xl">
            notifications
          </button>
          <button className="material-symbols-outlined text-slate-400 hover:text-cyan-400 transition-colors text-xl hidden sm:block">
            account_balance_wallet
          </button>
        </div>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-cyan-400/30 p-0.5">
          <img
            alt="User profile"
            className="w-full h-full rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5DN_nmOPpdeM_RGEZ9yPcx1aOw9wqpuQnJMkravraJmBbeoJk2X0KPbFWyL50nH04YnM3vqUC1XKbrY8rV6hYKZUl5ASYkMD6K6xd9JKUAE3QHNVl2uupKFMx7x3IzWDVVc2q95ijKx-e4aOtyDM1K4Nei9rQpW1gz3TEyHAWj_4hi1A4EWGciqz11vNyDlSl50tklFOIQY-HdLa5tcSl9hZWIgZmUtfRze9WhWYxbe5eGiyqvTx-mJcmyh2ouxH20puUC02IaiUC"
          />
        </div>
      </div>
    </header>
  );
}
