import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface BlockData {
  index: number;
  blockNumber: number;
  timestamp: string;
  previousHash: string;
  hash: string;
  transactionsCount: number;
  transactionsPreview: string[];
  nonce: number;
  status: 'GENESIS' | 'FINALIZED' | 'VALIDATING';
  gasUsed: string;
}

const INITIAL_BLOCKS: BlockData[] = [
  {
    index: 0,
    blockNumber: 21894010,
    timestamp: '36s ago',
    previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    hash: '0x8f4c2e1a9b7c41d8e0f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
    transactionsCount: 142,
    transactionsPreview: ['Deploy Zamaron Registry', 'Mint Lead Auditor NFT', 'Init Liquidity Pool'],
    nonce: 41829,
    status: 'GENESIS',
    gasUsed: '48.2%',
  },
  {
    index: 1,
    blockNumber: 21894011,
    timestamp: '24s ago',
    previousHash: '0x8f4c2e1a9b7c41d8e0f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
    hash: '0x3a1b7e9f0d55a2c4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2',
    transactionsCount: 318,
    transactionsPreview: ['Sign Audit ZM-8492-NX', 'Verify Reentrancy Fix', 'Deposit 45.0 ETH'],
    nonce: 89312,
    status: 'FINALIZED',
    gasUsed: '62.4%',
  },
  {
    index: 2,
    blockNumber: 21894012,
    timestamp: '12s ago',
    previousHash: '0x3a1b7e9f0d55a2c4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2',
    hash: '0x6d8e2c4a1f9b33e5a7c9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3',
    transactionsCount: 462,
    transactionsPreview: ['Execute Flash Loan Guard', 'Triage Bug SWC-107', 'Transfer 25k USDC'],
    nonce: 62145,
    status: 'FINALIZED',
    gasUsed: '88.1%',
  },
  {
    index: 3,
    blockNumber: 21894013,
    timestamp: 'Just now',
    previousHash: '0x6d8e2c4a1f9b33e5a7c9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3',
    hash: '0x19f4a8b23ce718d0f2a4b6c8d0e2f4a6b8c0d2e4f6a8c0d2e4f6a8b0c2d4e6f8',
    transactionsCount: 285,
    transactionsPreview: ['Mempool Threat Neutralized', 'Seal Document Vault', 'Verify zk-STARK Proof'],
    nonce: 10452,
    status: 'VALIDATING',
    gasUsed: '54.0%',
  },
];

export const BlockchainDiagram: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>(INITIAL_BLOCKS);
  const [hoveredBlockIndex, setHoveredBlockIndex] = useState<number | null>(null);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Shorten hash for clean conceptual presentation
  const truncateHash = (hash: string, start = 6, end = 4) => {
    if (!hash || hash.length <= start + end) return hash;
    return `${hash.slice(0, start)}...${hash.slice(-end)}`;
  };

  const handleSimulateNewBlock = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const latest = blocks[blocks.length - 1];
    const newBlockNumber = latest.blockNumber + 1;
    const randomHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newBlock: BlockData = {
      index: blocks.length,
      blockNumber: newBlockNumber,
      timestamp: 'Just now',
      previousHash: latest.hash,
      hash: randomHash,
      transactionsCount: Math.floor(Math.random() * 300) + 150,
      transactionsPreview: ['Anchor Audit Proof', 'State Transition Commit', 'Execute Threat Intercept'],
      nonce: Math.floor(Math.random() * 90000) + 10000,
      status: 'VALIDATING',
      gasUsed: `${(Math.random() * 40 + 50).toFixed(1)}%`,
    };

    setTimeout(() => {
      // Shift blocks so we maintain 4 visible blocks for clean UI
      const updated = [...blocks.slice(1), newBlock].map((b, idx) => ({
        ...b,
        index: idx,
        timestamp: idx === 3 ? 'Just now' : `${(3 - idx) * 12}s ago`,
        status: (idx === 3 ? 'VALIDATING' : idx === 0 ? 'GENESIS' : 'FINALIZED') as BlockData['status'],
      }));
      setBlocks(updated);
      setSelectedBlockIndex(3);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>CRYPTOGRAPHIC DATA ENGINE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            How the Blockchain Connects & Verifies Data
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every block groups verified transactions, seals them with a cryptographic hash, and links back to the previous block. This unbroken mathematical chain creates tamper-proof security.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            icon="add_circle"
            loading={isSimulating}
            onClick={handleSimulateNewBlock}
            className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
          >
            Simulate Next Block
          </Button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/10 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Consensus: 100% Synced</span>
          </div>
        </div>
      </div>

      {/* Interactive Blockchain Visual Chain */}
      <div className="relative">
        {/* Ambient background glow behind diagram */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-cyan-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />

        {/* Desktop Connected Diagram Grid (4 Blocks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 items-stretch relative">
          {blocks.map((block, idx) => {
            const isHovered = hoveredBlockIndex === idx;
            const isParentHovered = hoveredBlockIndex === idx - 1;
            const isChildHovered = hoveredBlockIndex === idx + 1;
            const isSelected = selectedBlockIndex === idx;
            const isHighlighted = isHovered || isSelected;

            return (
              <div key={block.blockNumber} className="flex flex-col relative group">
                {/* Connecting Arrow for Desktop (between blocks) */}
                {idx < blocks.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 items-center pointer-events-none">
                    <div className="relative flex items-center justify-center">
                      {/* Flowing animated pulse line */}
                      <div className="w-6 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white animate-pulse" />
                      </div>
                      <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-cyan-300 -ml-1" />
                    </div>
                  </div>
                )}

                {/* Mobile Connecting Arrow (between stacked blocks) */}
                {idx < blocks.length - 1 && (
                  <div className="lg:hidden flex items-center justify-center my-2 text-cyan-400">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-purple-400" />
                      <Icon name="arrow_downward" size={16} className="text-cyan-400 animate-bounce" />
                    </div>
                  </div>
                )}

                {/* Block Card */}
                <GlassCard
                  variant={isHighlighted ? 'fresnel' : 'elevated'}
                  blur="xl"
                  hoverEffect
                  onMouseEnter={() => setHoveredBlockIndex(idx)}
                  onMouseLeave={() => setHoveredBlockIndex(null)}
                  onClick={() => setSelectedBlockIndex(selectedBlockIndex === idx ? null : idx)}
                  className={`p-5 flex-1 flex flex-col justify-between cursor-pointer border transition-all duration-300 relative ${
                    isHighlighted
                      ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,218,243,0.35)] -translate-y-1.5'
                      : isParentHovered
                      ? 'border-purple-400/60 shadow-[0_0_20px_rgba(221,183,255,0.2)]'
                      : isChildHovered
                      ? 'border-cyan-400/60 shadow-[0_0_20px_rgba(0,218,243,0.2)]'
                      : 'border-white/10 hover:border-cyan-400/40'
                  }`}
                >
                  {/* Top Block Banner */}
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-[#060e20] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                          <Icon name="deployed_code" size={16} />
                        </div>
                        <div>
                          <div className="font-display font-black text-sm text-white flex items-center gap-1.5">
                            Block #{block.blockNumber.toLocaleString()}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            Index: {block.index}
                          </div>
                        </div>
                      </div>

                      <Badge
                        variant={
                          block.status === 'GENESIS'
                            ? 'secondary'
                            : block.status === 'VALIDATING'
                            ? 'primary'
                            : 'success'
                        }
                        size="sm"
                        dot
                        pulse={block.status === 'VALIDATING'}
                      >
                        {block.status}
                      </Badge>
                    </div>

                    {/* Cryptographic Link Fields */}
                    <div className="space-y-2.5 font-mono text-[11px]">
                      {/* Previous Hash */}
                      <div
                        className={`p-2 rounded transition-colors ${
                          isHighlighted || isChildHovered
                            ? 'bg-cyan-500/15 border border-cyan-500/40'
                            : 'bg-black/30 border border-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                          <span className="flex items-center gap-1">
                            <Icon name="link" size={10} className="text-cyan-400" />
                            Previous Hash
                          </span>
                          {idx > 0 && (
                            <span className="text-cyan-300 text-[9px] font-bold">← Links to #{block.blockNumber - 1}</span>
                          )}
                        </div>
                        <div
                          className={`font-mono text-xs truncate ${
                            idx === 0
                              ? 'text-slate-500'
                              : isHighlighted || isChildHovered
                              ? 'text-cyan-300 font-bold'
                              : 'text-slate-300'
                          }`}
                          title={block.previousHash}
                        >
                          {truncateHash(block.previousHash, 8, 6)}
                        </div>
                      </div>

                      {/* Current Block Hash */}
                      <div
                        className={`p-2 rounded transition-colors ${
                          isHighlighted || isParentHovered
                            ? 'bg-purple-500/15 border border-purple-500/40'
                            : 'bg-black/30 border border-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
                          <span className="flex items-center gap-1">
                            <Icon name="tag" size={10} className="text-purple-400" />
                            Block Hash
                          </span>
                          <span className="text-emerald-400 text-[9px]">SHA-256</span>
                        </div>
                        <div
                          className={`font-mono text-xs truncate ${
                            isHighlighted || isParentHovered
                              ? 'text-purple-200 font-bold'
                              : 'text-slate-300'
                          }`}
                          title={block.hash}
                        >
                          {truncateHash(block.hash, 8, 6)}
                        </div>
                      </div>

                      {/* Timestamp & Nonce row */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-1.5 rounded bg-black/20 border border-white/5">
                          <div className="text-[9px] text-slate-500 uppercase">Timestamp</div>
                          <div className="text-slate-200 font-semibold flex items-center gap-1">
                            <Icon name="schedule" size={11} className="text-cyan-400" />
                            {block.timestamp}
                          </div>
                        </div>
                        <div className="p-1.5 rounded bg-black/20 border border-white/5">
                          <div className="text-[9px] text-slate-500 uppercase">Gas Used</div>
                          <div className="text-slate-200 font-semibold">{block.gasUsed}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transactions Payload Section */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Icon name="receipt_long" size={12} className="text-cyan-400" />
                        Transactions
                      </span>
                      <span className="font-mono font-bold text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-[10px] border border-cyan-500/20">
                        {block.transactionsCount} Txns
                      </span>
                    </div>

                    <div className="space-y-1">
                      {block.transactionsPreview.map((tx, txIdx) => (
                        <div
                          key={txIdx}
                          className="px-2 py-1 rounded bg-black/30 border border-white/5 text-[10px] font-mono text-slate-300 flex items-center justify-between group-hover:border-white/10"
                        >
                          <span className="truncate max-w-[150px]">{tx}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cryptographic Link Indicator Pill */}
                  <div className="mt-3 pt-2 text-center text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Cryptographically Anchored</span>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Core Pillars of Block Architecture (Educational Legend) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard variant="subtle" className="p-4 space-y-2 border-white/5">
          <div className="flex items-center gap-2 text-cyan-400">
            <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30">
              <Icon name="receipt_long" size={18} />
            </div>
            <h4 className="font-display font-bold text-sm text-white">1. Transactions</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            State transitions, smart contract interactions, and transfers bundled and cryptographically verified by consensus nodes.
          </p>
        </GlassCard>

        <GlassCard variant="subtle" className="p-4 space-y-2 border-white/5">
          <div className="flex items-center gap-2 text-purple-400">
            <div className="p-1.5 rounded bg-purple-500/10 border border-purple-500/30">
              <Icon name="tag" size={18} />
            </div>
            <h4 className="font-display font-bold text-sm text-white">2. Cryptographic Hash</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A unique 256-bit mathematical digest generated from the block’s transaction Merkle tree, timestamp, and nonce.
          </p>
        </GlassCard>

        <GlassCard variant="subtle" className="p-4 space-y-2 border-white/5">
          <div className="flex items-center gap-2 text-cyan-300">
            <div className="p-1.5 rounded bg-cyan-400/10 border border-cyan-400/30">
              <Icon name="link" size={18} />
            </div>
            <h4 className="font-display font-bold text-sm text-white">3. Previous Hash</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The cryptographic pointer linking this block to its parent. Changing any past block invalidates all downstream hashes.
          </p>
        </GlassCard>

        <GlassCard variant="subtle" className="p-4 space-y-2 border-white/5">
          <div className="flex items-center gap-2 text-emerald-400">
            <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              <Icon name="schedule" size={18} />
            </div>
            <h4 className="font-display font-bold text-sm text-white">4. Timestamp & State</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Immutable time recording that establishes the exact canonical sequence and finality of all decentralized events.
          </p>
        </GlassCard>
      </div>
    </section>
  );
};

export default BlockchainDiagram;
