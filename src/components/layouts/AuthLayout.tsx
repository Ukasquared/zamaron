import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { MasterCatalogDrawer } from '@/components/shared/MasterCatalogDrawer';

export const AuthLayout: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#060e20] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-primary/30 selection:text-primary"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 218, 243, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(221, 183, 255, 0.05) 0%, transparent 40%)`,
      }}
    >
      {/* Animated Subtle Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-grid-cyber opacity-40" />

      {/* Top Navbar */}
      <header className="relative z-10 p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded bg-[#0b1326] border border-primary/40 flex items-center justify-center text-primary group-hover:border-primary shadow-[0_0_12px_rgba(0,218,243,0.3)] transition-all">
            <Icon name="shield" size={22} />
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-wider text-white">
              ZAMARON
            </span>
            <span className="text-[9px] font-mono block text-primary/80 tracking-widest leading-none">
              TERMINAL ACCESS
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
          >
            <Icon name="arrow_back" size={16} /> Back to Portal
          </Link>
        </div>
      </header>

      {/* Main Auth Content Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-xs font-mono text-slate-500 border-t border-outline/30 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>FIDO2 / WebAuthn Hardware Security Compliant</span>
        </div>
        <p>© 2026 ZAMARON Protocol • Institutional Cryptographic Protection</p>
      </footer>

      {/* Master 47 Screens Catalog Drawer */}
      <MasterCatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </div>
  );
};
