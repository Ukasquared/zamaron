import React, { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { downloadTextFile } from '@/lib/download';
import { addDocument, listDocuments } from '@/services/vaultService';
import type { VaultDocument } from '@/types/ops';

export const DocumentVaultPage: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'REPORTS' | 'CERTIFICATES' | 'SPECS'>('ALL');
  const [tick, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const documents = useMemo(() => {
    try {
      return listDocuments(user);
    } catch {
      return [] as VaultDocument[];
    }
  }, [user, tick]);

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = activeCategory === 'ALL' || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) || doc.hash.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const upload = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setError(null);
    try {
      Array.from(fileList).forEach((file) => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        const type: VaultDocument['type'] = ext === 'zip' ? 'ZIP' : ext === 'pdf' ? 'PDF' : 'TXT';
        addDocument(
          {
            title: file.name,
            category: 'SPECS',
            type,
            fileSize: `${Math.max(1, Math.round(file.size / 1024))} KB`,
            body: `Uploaded artifact ${file.name} (${file.type || 'unknown'})`,
          },
          user
        );
      });
      setMessage('Document metadata stored in the encrypted vault.');
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload denied.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRYPTOGRAPHIC REPOSITORY</Badge>
            <span className="text-xs font-mono text-slate-400">AES-256 GCM Encrypted</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Secure Document Vault</h1>
        </div>
        <label className="inline-flex">
          <input type="file" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
          <Button size="md" icon="cloud_upload" onClick={(e) => (e.currentTarget.previousSibling as HTMLInputElement | null)?.click()}>
            Upload Verified Spec
          </Button>
        </label>
      </div>

      {(error || message) && (
        <div
          className={`text-xs font-mono rounded px-3 py-2 border ${
            error ? 'text-error bg-error/10 border-error/40' : 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#081024] p-4 rounded border border-outline/70">
        <div className="w-full sm:w-72">
          <Input placeholder="Search documents by name or hash..." value={search} onChange={(e) => setSearch(e.target.value)} icon="search" />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {(['ALL', 'REPORTS', 'CERTIFICATES', 'SPECS'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                activeCategory === cat ? 'bg-primary text-[#00363d] font-bold' : 'bg-surface-variant text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

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
              <p className="text-[10px] font-mono text-slate-500">{doc.hash}</p>
            </div>
            <div className="pt-3 border-t border-outline/50 flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span>Updated: {doc.updatedAt}</span>
              <Button
                variant="terminal"
                size="sm"
                icon="download"
                onClick={() => downloadTextFile(`${doc.id}.${doc.type.toLowerCase()}`, `${doc.title}\n${doc.hash}\n\n${doc.body}`)}
              >
                Download {doc.type}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
