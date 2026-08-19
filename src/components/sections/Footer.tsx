import { FOOTER_LINKS } from '@/data/content';

interface FooterProps {
  /** Compact variant used on in-app pages: no logo lockup, no solid background */
  compact?: boolean;
}

export function Footer({ compact = false }: FooterProps) {
  return (
    <footer
      className={`w-full flex flex-col items-center gap-6 py-12 border-t border-white/5 ${
        compact ? 'mt-8' : 'bg-slate-950 mt-auto relative z-20'
      }`}
    >
      {!compact && (
        <div className="font-bold text-slate-200 text-lg tracking-wider font-['Space_Grotesk']">
          ZAMARON
        </div>
      )}
      <div className="flex gap-6 text-sm text-slate-400">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-cyan-400 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="text-xs text-slate-500">
        &copy; {new Date().getFullYear()} ZAMARON Protocol. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
