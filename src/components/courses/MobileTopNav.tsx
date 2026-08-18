import Icon from '../Icon';
import { CURRENT_USER } from '../../data/coursesContent';

export default function MobileTopNav() {
  return (
    <nav className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      <div className="text-2xl font-bold tracking-tighter text-cyan-400 uppercase font-['Space_Grotesk'] tracking-tight">
        Zamaron
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-white transition-colors">
          <Icon name="notifications" />
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Icon name="account_balance_wallet" />
        </button>
        <img
          src={CURRENT_USER.avatarUrl}
          alt={`${CURRENT_USER.name}'s profile`}
          className="w-8 h-8 rounded-full border border-cyan-400"
        />
      </div>
    </nav>
  );
}
