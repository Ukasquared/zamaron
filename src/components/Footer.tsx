import { FOOTER_LINKS } from '../data/content';

interface FooterProps {
  /** Compact variant used on in-app pages: no logo lockup, no solid background */
  compact?: boolean;
}

export default function Footer({ compact = false }: FooterProps) {
  return (
    <footer
      className={`w-full flex flex-col items-center gap-6 py-12 border-t border-white/5 ${
        compact ? 'mt-8' : 'bg-slate-950 mt-auto relative z-20'
      }`}
    >
      {!compact && <div className="font-bold text-slate-200 font-['Space_Grotesk'] text-xl">ZAMARON</div>}

      <div className="flex flex-wrap justify-center gap-8">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-['Space_Grotesk'] text-xs uppercase tracking-widest text-slate-600 hover:text-cyan-400 transition-colors hover:opacity-80"
          >
            {link.label}
          </a>
        ))}
      </div>

      <p className="font-['Space_Grotesk'] text-xs uppercase tracking-widest text-slate-600">
        © {new Date().getFullYear()} ZAMARON PROTOCOL. SECURE THE FRONTIER.
      </p>
    </footer>
  );
}
