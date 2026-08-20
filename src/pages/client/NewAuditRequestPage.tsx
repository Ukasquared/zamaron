import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { setPendingCheckout } from '@/services/auditService';

export const NewAuditRequestPage: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [commitHash, setCommitHash] = useState('');
  const [protocolType, setProtocolType] = useState('DEX');
  const [selectedTier, setSelectedTier] = useState<'STANDARD' | 'PROFESSIONAL' | 'ENTERPRISE'>('PROFESSIONAL');
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const tier = params.get('tier');
    if (tier === 'STANDARD' || tier === 'PROFESSIONAL' || tier === 'ENTERPRISE') {
      setSelectedTier(tier);
    }
  }, [params]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileNames = Array.from(e.dataTransfer.files).map((f) => f.name);
      setFiles((prev) => [...prev, ...fileNames]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPendingCheckout({
      projectName,
      protocolType,
      targetRepo: repoUrl,
      commitHash,
      tier: selectedTier,
      attachments: files,
    });
    navigate('/client/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="primary">SUBMISSION WIZARD</Badge>
          <span className="text-xs font-mono text-slate-400">Step 1 of 2: Scoping & Code Verification</span>
        </div>
        <h1 className="font-display font-black text-3xl text-white">
          Request Institutional Security Audit
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          Provide your smart contract repository details or upload compiled bytecode packages for immediate cryptographic triage.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Information */}
        <Card variant="glass" className="p-6 space-y-4">
          <CardHeader className="mb-2">
            <CardTitle>1. Protocol Metadata</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Protocol / Project Name"
              placeholder="e.g. Nexus DeFi Liquidity Rail"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            <Select
              label="Protocol Category"
              value={protocolType}
              onChange={(e) => setProtocolType(e.target.value)}
            >
              <option value="DEX">DEX / Automated Market Maker (AMM)</option>
              <option value="LENDING">Lending & Borrowing Protocol</option>
              <option value="STAKING">Liquid Staking / Restaking Vault</option>
              <option value="BRIDGE">Cross-Chain Bridge / Relay</option>
              <option value="NFT">NFT & Gaming Smart Contracts</option>
              <option value="GOVERNANCE">DAO & Governance Token Suite</option>
            </Select>
          </div>
        </Card>

        {/* Repository & Source Code */}
        <Card variant="glass" className="p-6 space-y-4">
          <CardHeader className="mb-2">
            <CardTitle>2. Repository & Smart Contract Scope</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Target Git Repository URL"
              placeholder="https://github.com/org/contracts"
              icon="link"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              required
            />
            <Input
              label="Exact Target Commit Hash (SHA)"
              placeholder="e.g. 8f0a1c9e2b4"
              icon="fingerprint"
              value={commitHash}
              onChange={(e) => setCommitHash(e.target.value)}
              required
            />
          </div>

          {/* Drag and Drop Zone */}
          <div className="pt-2">
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5">
              Upload Solidity / Vyper / Bytecode Archives (Optional)
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-md p-6 text-center transition-all ${
                dragOver
                  ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,218,243,0.3)]'
                  : 'border-outline/70 bg-[#060e20] hover:border-primary/50'
              }`}
            >
              <Icon name="cloud_upload" size={36} className="text-primary mx-auto mb-2" />
              <p className="text-xs font-mono text-slate-300">
                Drag and drop your <span className="text-primary font-bold">.zip</span> or <span className="text-primary font-bold">.sol</span> files here
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Maximum file size: 50MB</p>
              <input
                type="file"
                multiple
                className="mt-3 text-[11px] font-mono text-slate-400"
                onChange={(e) => {
                  const names = Array.from(e.target.files ?? []).map((file) => file.name);
                  setFiles((prev) => [...prev, ...names]);
                }}
              />
            </div>

            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {files.map((file, i) => (
                  <Badge key={i} variant="primary" size="sm">
                    {file}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Tier Selector */}
        <Card variant="fresnel" className="p-6 space-y-4">
          <CardHeader className="mb-2">
            <CardTitle>3. Select Verification Tier</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'STANDARD', name: 'Standard Tier', price: '$12,500', time: '5-Day Turnaround' },
              { id: 'PROFESSIONAL', name: 'Professional Tier', price: '$25,000', time: '3-Day Priority' },
              { id: 'ENTERPRISE', name: 'Enterprise Matrix', price: '$50,000+', time: '24/7 Red Team' },
            ].map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTier(t.id as any)}
                className={`p-4 rounded border transition-all cursor-pointer ${
                  selectedTier === t.id
                    ? 'bg-primary/15 border-primary shadow-[0_0_15px_rgba(0,218,243,0.3)]'
                    : 'bg-[#060e20] border-outline/70 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-white font-display">{t.name}</span>
                  {selectedTier === t.id && (
                    <Icon name="check_circle" size={18} className="text-primary" />
                  )}
                </div>
                <div className="text-lg font-mono font-bold text-primary">{t.price}</div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">{t.time}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-outline/50">
          <span className="text-xs font-mono text-slate-400">
            Escrow-backed cryptographic settlement
          </span>
          <Button type="submit" size="lg" iconRight="arrow_forward">
            Proceed to Secure Settlement
          </Button>
        </div>
      </form>
    </div>
  );
};
