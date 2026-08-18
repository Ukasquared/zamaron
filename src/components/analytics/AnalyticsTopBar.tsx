type Props = {
  onMenuClick: () => void;
};

export default function AnalyticsTopBar({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-4 sm:px-6 md:px-gutter h-14 md:h-16 bg-surface-container-low/50 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_0_15px_rgba(0,218,243,0.1)]">
      <div className="flex items-center gap-4 md:gap-8">
        <button
          className="md:hidden p-2 -ml-1 text-primary"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="text-lg md:text-title-md font-display-xl tracking-wider text-primary uppercase">
          ZAMARON
        </span>
        <nav className="hidden lg:flex items-center gap-6">
          <a
            className="text-on-surface-variant font-body-md hover:text-primary-fixed transition-colors duration-300"
            href="#"
          >
            Academy
          </a>
          <a
            className="text-primary font-bold border-b-2 border-primary-container pb-1"
            href="#"
          >
            Analytics
          </a>
          <a
            className="text-on-surface-variant font-body-md hover:text-primary-fixed transition-colors duration-300"
            href="#"
          >
            Admin
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex bg-surface-container-high px-4 py-1.5 rounded-full border border-outline-variant/30 items-center gap-2">
          <span className="material-symbols-outlined text-outline-variant text-sm">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-body-md text-on-surface w-40 lg:w-48 placeholder:text-outline-variant outline-none"
            placeholder="Scan assets..."
            type="text"
          />
        </div>
        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary">
          notifications
        </button>
        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary hidden sm:inline">
          trending_up
        </button>
        <div className="h-8 w-[1px] bg-outline-variant/30 mx-1 hidden sm:block" />
        <span className="text-label-sm font-label-sm text-primary uppercase cursor-pointer">
          Profile
        </span>
      </div>
    </header>
  );
}
