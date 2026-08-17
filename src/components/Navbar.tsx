import { NAV_LINKS } from '../data/content';
import Button from './Button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 max-w-[1280px] left-1/2 -translate-x-1/2 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      <div className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-['Space_Grotesk']">
        ZAMARON
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-label-sm text-label-sm text-slate-400 hover:text-white transition-colors hover:bg-white/5 duration-300 px-3 py-2 rounded"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="primary" size="sm">
          Launch App
        </Button>
      </div>
    </nav>
  );
}
