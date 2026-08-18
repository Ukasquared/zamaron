const links = [
  { label: "Academy", href: "#", active: false },
  { label: "Scanners", href: "#", active: true },
  { label: "Admin", href: "#", active: false },
];

type Props = {
  onMenuClick: () => void;
};

export default function ScannerTopNav({ onMenuClick }: Props) {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full px-4 sm:px-6 md:px-gutter h-14 md:h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_0_15px_rgba(0,218,243,0.1)]">
      <div className="flex items-center gap-4 md:gap-8">
        <button
          className="lg:hidden p-2 -ml-1 text-primary"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="text-lg md:text-title-md font-display-xl tracking-wider text-primary uppercase">
          ZAMARON
        </span>
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-primary font-bold border-b-2 border-primary-container pb-1"
                  : "text-on-surface-variant font-body-md hover:text-primary-fixed transition-colors duration-300"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:text-primary-fixed transition-colors duration-300">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 hover:text-primary-fixed transition-colors duration-300 hidden sm:block">
          <span className="material-symbols-outlined">trending_up</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-sm">person</span>
        </div>
      </div>
    </nav>
  );
}
