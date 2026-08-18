import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export const DocumentVaultPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'REPORTS' | 'CERTIFICATES' | 'SPECS'>('ALL');

  const documents = [
    {
      id: 'DOC-8924',
      title: 'Nexus DeFi Core v3 - Signed Audit Report',
      category: 'REPORTS',
      fileSize: '4.8 MB',
      updatedAt: '2026-08-18',
      hash: '0xe7a8...0384',
      type: 'PDF',
    },
    {
      id: 'DOC-8923',
      title: 'Certora Formal Verification Mathematical Proofs',
      category: 'SPECS',
      fileSize: '12.4 MB',
      updatedAt: '2026-08-17',
      hash: '0x3b91...489c',
      type: 'ZIP',
    },
    {
      id: 'DOC-8920',
      title: 'On-Chain Deployment Compliance Certificate',
      category: 'CERTIFICATES',
      fileSize: '1.2 MB',
      updatedAt: '2026-08-15',
      hash: '0x992c...aa11',
      type: 'PDF',
    },
    {
      id: 'DOC-8890',
      title: 'Aegis Staking Vaults - Interim Scoping Brief',
      category: 'REPORTS',
      fileSize: '2.1 MB',
      updatedAt: '2026-08-14',
      hash: '0x11ab...ff43',
      type: 'PDF',
    },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = activeCategory === 'ALL' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRYPTOGRAPHIC REPOSITORY</Badge>
            <span className="text-xs font-mono text-slate-400">AES-256 GCM Encrypted</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Secure Document Vault
          </h1>
        </div>

        <Button size="md" icon="cloud_upload">
          Upload Verified Spec
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#081024] p-4 rounded border border-outline/70">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search documents by name or hash..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon="search"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {(['ALL', 'REPORTS', 'CERTIFICATES', 'SPECS'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-[#00363d] font-bold'
                  : 'bg-surface-variant text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} variant="glass" hoverEffect className="p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" size="sm">
                  {doc.category}
                </Badge>
                <span className="text-xs font-mono text-slate-400">{doc.fileSize}</span>
              </div>
              <h3 className="font-display font-bold text-base text-white">{doc.title}</h3>
            </div>

            <div className="pt-3 border-t border-outline/50 flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span>Updated: {doc.updatedAt}</span>
              <Button variant="terminal" size="sm" icon="download">
                Download {doc.type}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
