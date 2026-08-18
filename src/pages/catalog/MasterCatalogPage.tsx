import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">MASTER INDEX</Badge>
            <span className="text-xs font-mono text-slate-400">47 Screens Catalog</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            ZAMARON Complete Application Architecture
          </h1>
        </div>

        <Badge variant="success" size="md">Vite + React 18 + Tailwind v4</Badge>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#081024] p-4 rounded border border-outline/70">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search all 47 pages by keyword, HTML file, or path..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon="search"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedDomain === d
                  ? 'bg-primary text-[#00363d] font-bold'
                  : 'bg-surface-variant text-slate-300 hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPages.map((page) => (
          <Link
            key={page.sourceFile}
            to={page.route}
            className="block p-5 bg-[#0b1326] border border-outline/70 rounded-md hover:border-primary hover:shadow-[0_0_20px_rgba(0,218,243,0.2)] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" size="sm">
                  {page.domain}
                </Badge>
                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[140px]">
                  {page.sourceFile}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-primary transition-colors">
                {page.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{page.description}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-outline/40 flex items-center justify-between font-mono text-[11px] text-primary font-bold">
              <span>{page.route}</span>
              <Icon name="arrow_forward" size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
