import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { GlowBackground } from '@/components/ui/GlowBackground';
import { ALL_PAGE_CATALOG } from '@/components/shared/MasterCatalogDrawer';

export const MasterCatalogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('ALL');

  const domains = [
    'ALL',
    'Marketing',
    'Auth',
    'Client Portal',
    'Auditor Workspace',
    'Intelligence & Threat Hub',
    'Governance',
    'Academy',
    'Admin Operations',
  ];

  const filteredPages = ALL_PAGE_CATALOG.filter((p) => {
    const matchesDomain = selectedDomain === 'ALL' || p.domain === selectedDomain;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sourceFile.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.route.toLowerCase().includes(search.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-12 py-10">
      <GlowBackground variant="subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Banner */}
          <GlassCard
            variant="elevated"
            blur="xl"
            className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-white/10"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="primary" dot pulse>
                  MASTER MATRIX
                </Badge>
                <span className="text-xs font-mono text-cyan-300 font-bold">47 Screens Catalog</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                ZAMARON Complete Application Architecture
              </h1>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Explore every surface across Public Marketing, Authentication, Client Portals, Auditor Terminals, Threat Hub, DAO Governance, Academy LMS, and Admin Operations.
              </p>
            </div>

            <Badge variant="success" size="md" dot>
              47 / 47 Screens Online
            </Badge>
          </GlassCard>

          {/* Filter and Search Bar */}
          <GlassCard variant="default" blur="lg" className="p-4 sm:p-5 flex flex-col lg:flex-row gap-4 justify-between items-center border-white/10">
            <div className="w-full lg:w-88">
              <Input
                placeholder="Search by title, source file, route path..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon="search"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto cyber-scrollbar w-full lg:w-auto pb-1 lg:pb-0">
              {domains.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                    selectedDomain === d
                      ? 'bg-cyan-400 text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Grid of Pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPages.map((page) => (
              <Link
                key={page.sourceFile}
                to={page.route}
                className="group flex flex-col justify-between"
              >
                <GlassCard
                  variant="default"
                  hoverEffect
                  blur="lg"
                  className="p-5 h-full flex flex-col justify-between border-white/10 group-hover:border-cyan-400/50"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" size="sm">
                        {page.domain}
                      </Badge>
                      <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px] px-1.5 py-0.5 rounded bg-black/30 border border-white/5">
                        {page.sourceFile}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-200 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{page.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-cyan-400 font-bold">
                    <span className="truncate max-w-[200px]">{page.route}</span>
                    <Icon name="arrow_forward" size={16} className="group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </GlowBackground>
    </div>
  );
};
