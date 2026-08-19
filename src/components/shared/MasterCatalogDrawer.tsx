import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { ALL_PAGE_CATALOG } from '@/config/pageCatalog';

export const MasterCatalogDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const navigate = useNavigate();

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

  const handleNavigate = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ZAMARON Master Architecture Matrix"
      subtitle={`Catalog of all ${ALL_PAGE_CATALOG.length} verified templates and routes`}
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Search & Domain Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by page name, HTML filename, or route..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon="search"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap cursor-pointer transition-colors ${
                  selectedDomain === d
                    ? 'bg-primary text-[#00363d] font-bold'
                    : 'bg-surface-variant text-slate-300 hover:bg-surface-container-highest'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Showing {filteredPages.length} of {ALL_PAGE_CATALOG.length} pages</span>
          <span className="text-primary font-bold">Vite + React 18 + Tailwind v4</span>
        </div>

        {/* Page List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[55vh] overflow-y-auto cyber-scrollbar pr-1">
          {filteredPages.map((page) => (
            <div
              key={page.sourceFile}
              onClick={() => handleNavigate(page.route)}
              className="p-3 bg-[#0c1322] border border-outline/70 rounded hover:border-primary/60 hover:bg-[#111a30] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-display font-semibold text-sm text-white group-hover:text-primary transition-colors">
                    {page.title}
                  </span>
                  <Badge variant="primary" size="sm">
                    {page.domain}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 font-sans line-clamp-2">{page.description}</p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-outline/40 text-[10px] font-mono text-slate-500">
                <span className="truncate max-w-[180px] text-slate-400">{page.sourceFile}</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                  {page.route} <Icon name="arrow_forward" size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
