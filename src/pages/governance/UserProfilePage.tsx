import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { RadarChart } from '@/components/shared/RadarChart';
import { AddressBadge } from '@/components/shared/AddressBadge';
import { mockCurrentUser } from '@/mock/data';

export const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CREDENTIALS' | 'SKILL_TREE' | 'ACTIVITY'>('CREDENTIALS');

  const radarData = [
    { axis: 'EVM Forensics', value: 95 },
    { axis: 'DeFi Security', value: 90 },
    { axis: 'Formal Verification', value: 85 },
    { axis: 'Zero-Knowledge', value: 75 },
    { axis: 'Reentrancy Defense', value: 98 },
    { axis: 'Cross-Chain Bridges', value: 82 },
  ];

  const skillTreeNodes = [
    { id: '1', name: 'Solidity Syntax', level: 'MAX', status: 'UNLOCKED', xp: '2,500 XP' },
    { id: '2', name: 'EVM Bytecode Disassembly', level: 'LVL 5', status: 'UNLOCKED', xp: '4,800 XP' },
    { id: '3', name: 'Reentrancy & Flashloans', level: 'LVL 5', status: 'UNLOCKED', xp: '5,000 XP' },
    { id: '4', name: 'Certora Formal Proofs', level: 'LVL 4', status: 'UNLOCKED', xp: '3,200 XP' },
    { id: '5', name: 'ZK-SNARK Circuit Verification', level: 'LVL 2', status: 'IN_PROGRESS', xp: '1,200 XP' },
    { id: '6', name: 'Post-Quantum Lattice Enclaves', level: 'LOCKED', status: 'LOCKED', xp: 'Requires Lv.5 ZK' },
  ];

  const activities = [
    { action: 'Signed Audit Report ZM-8492-NX', target: 'Nexus DeFi Core', time: '2 hours ago', xp: '+450 XP' },
    { action: 'Verified SWC-107 Reentrancy Patch', target: 'VaultManager.sol', time: '5 hours ago', xp: '+250 XP' },
    { action: 'Cast Weighted DAO Vote (FOR)', target: 'ZAM-842 Upgrade', time: '1 day ago', xp: '+100 XP' },
    { action: 'Completed EVM Opcode Mastery Assessment', target: 'Zamaron Academy', time: '3 days ago', xp: '+1,200 XP' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-surface-container/70 border border-outline/70 p-6 sm:p-8 rounded-md backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary via-cyan-300 to-secondary p-0.5 shadow-[0_0_25px_rgba(0,218,243,0.5)]">
              <div className="w-full h-full rounded-full bg-[#060e20] flex items-center justify-center font-display font-black text-3xl text-primary">
                AC
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-400 text-[#00363d] rounded-full p-1 border-2 border-[#060e20]" title="Node Online">
              <Icon name="check" size={14} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                {mockCurrentUser.name}
              </h1>
              <Badge variant="primary" size="sm">
                PLATINUM OPERATOR
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span>{mockCurrentUser.email}</span>
              <span>•</span>
              <AddressBadge address={mockCurrentUser.walletAddress} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-center shrink-0">
          <div className="px-5 py-3 bg-[#060e20] border border-outline rounded shadow-inner">
            <div className="text-[10px] text-slate-400">EXPERIENCE</div>
            <div className="text-2xl font-black text-primary font-display mt-0.5">{mockCurrentUser.xp?.toLocaleString()} XP</div>
          </div>
          <div className="px-5 py-3 bg-[#060e20] border border-outline rounded shadow-inner">
            <div className="text-[10px] text-slate-400">CREDENTIALS</div>
            <div className="text-2xl font-black text-emerald-400 font-display mt-0.5">{mockCurrentUser.certificationsCount}</div>
          </div>
        </div>
      </div>

      {/* Navigation Segment Tabs */}
      <div className="flex items-center gap-2 border-b border-outline/60 pb-3 font-mono text-xs">
        {[
          { id: 'CREDENTIALS', label: 'Certification Vault', icon: 'workspace_premium' },
          { id: 'SKILL_TREE', label: 'Protocol Progression Tree', icon: 'account_tree' },
          { id: 'ACTIVITY', label: 'Recent Activity Ledger', icon: 'history' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-primary text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-surface-variant'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Certification Vault & Radar */}
      {activeTab === 'CREDENTIALS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Radar Chart (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <Card variant="fresnel" className="p-6 text-center space-y-4">
              <CardHeader className="justify-center mb-2">
                <CardTitle>Mastery Distribution Radar</CardTitle>
              </CardHeader>
              <RadarChart data={radarData} size={300} />
            </Card>
          </div>

          {/* Credentials Vault List (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <Card variant="glass" className="p-6 space-y-4">
              <CardHeader className="mb-2">
                <CardTitle>Cryptographic Credential Badges</CardTitle>
              </CardHeader>

              <div className="space-y-3">
                {[
                  {
                    title: 'Protocol Master (ZCLA)',
                    desc: 'Highest institutional verification honor awarded for over 100+ critical bug mitigations.',
                    date: 'August 2026',
                    id: 'CERT-9981',
                    tier: 'PLATINUM',
                  },
                  {
                    title: 'Senate Security Member',
                    desc: 'Elected voting member on the Nexus DAO Quantum Hardening Committee.',
                    date: 'July 2026',
                    id: 'CERT-8842',
                    tier: 'GOLD',
                  },
                  {
                    title: 'Lead Auditor Specification',
                    desc: 'Certified in Certora formal verification mathematical specification.',
                    date: 'May 2026',
                    id: 'CERT-7719',
                    tier: 'SILVER',
                  },
                ].map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 bg-[#060e20] border border-outline/70 rounded flex flex-col justify-between space-y-2 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-white">{cert.title}</span>
                      <Badge variant={cert.tier === 'PLATINUM' ? 'primary' : 'secondary'} size="sm">
                        {cert.tier}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">{cert.desc}</p>
                    <div className="pt-2 border-t border-outline/40 flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span>ID: {cert.id}</span>
                      <span className="text-emerald-400 font-bold">VERIFIED ANCHOR</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Skill Tree Progression Map */}
      {activeTab === 'SKILL_TREE' && (
        <Card variant="glass" className="p-6 space-y-6">
          <CardHeader className="mb-2">
            <CardTitle>Protocol Progression Map</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillTreeNodes.map((node) => (
              <div
                key={node.id}
                className={`p-5 rounded border transition-all ${
                  node.status === 'UNLOCKED'
                    ? 'bg-[#060e20] border-primary/40 shadow-[0_0_15px_rgba(0,218,243,0.15)]'
                    : node.status === 'IN_PROGRESS'
                    ? 'bg-[#060e20] border-amber-400/40'
                    : 'bg-[#040813] border-outline/40 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={node.status === 'UNLOCKED' ? 'success' : node.status === 'IN_PROGRESS' ? 'warning' : 'outline'}
                    size="sm"
                  >
                    {node.status}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-primary">{node.level}</span>
                </div>
                <h4 className="font-display font-bold text-base text-white">{node.name}</h4>
                <div className="text-xs font-mono text-slate-400 mt-2">{node.xp}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: Recent Activity Ledger */}
      {activeTab === 'ACTIVITY' && (
        <Card variant="glass" className="p-6 space-y-4">
          <CardHeader className="mb-2">
            <CardTitle>Recent Activity & On-Chain Proofs</CardTitle>
          </CardHeader>

          <div className="divide-y divide-outline/40 font-mono text-xs">
            {activities.map((act, i) => (
              <div key={i} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">{act.action}</div>
                  <div className="text-[10px] text-slate-400">{act.target} • {act.time}</div>
                </div>
                <span className="text-emerald-400 font-bold text-sm font-display">{act.xp}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
