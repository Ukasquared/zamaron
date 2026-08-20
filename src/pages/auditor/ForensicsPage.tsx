import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { disassembleBytecode, symbolicTrace, type DisassembledOp, type TraceStep } from '@/lib/evm';

const SAMPLE =
  '608060405234801561001057600080fd5b50600436106100365760003560e01c80632e1a7d4d1461003b5780633ccfd60b1461005757';

export const ForensicsPage: React.FC = () => {
  const [bytecode, setBytecode] = useState(SAMPLE);
  const [ops, setOps] = useState<DisassembledOp[]>([]);
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'ops' | 'trace'>('ops');

  const runDisassemble = () => {
    setError(null);
    try {
      setOps(disassembleBytecode(bytecode));
      setMode('ops');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Disassembly failed.');
      setOps([]);
    }
  };

  const runTrace = () => {
    setError(null);
    try {
      setTrace(symbolicTrace(bytecode));
      setOps(disassembleBytecode(bytecode));
      setMode('trace');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Trace failed.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">EVM FORENSIC SUITE</Badge>
            <span className="text-xs font-mono text-slate-400">Bytecode Disassembler & Flow Tracer</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Opcode Execution Analysis</h1>
        </div>
        <Button size="md" icon="play_circle" onClick={runTrace}>
          Execute Symbolic Trace
        </Button>
      </div>

      {error && <div className="text-xs font-mono text-error bg-error/10 border border-error/40 rounded px-3 py-2">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-4">
          <Card variant="glass" className="p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span>Raw Compiled Bytecode (Hex):</span>
              <span className="text-primary font-bold">{Math.floor(bytecode.replace(/[^0-9a-fA-F]/g, '').length / 2)} Bytes</span>
            </div>
            <textarea
              rows={8}
              value={bytecode}
              onChange={(e) => setBytecode(e.target.value)}
              className="w-full bg-[#060e20] border border-outline rounded p-3 text-xs font-mono text-slate-200 focus:border-primary focus:outline-none"
            />
            <Button variant="outline" size="sm" icon="sync" className="w-full" onClick={runDisassemble}>
              Disassemble Opcodes
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <Card variant="terminal" className="p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-outline/50 pb-2">
              <span className="text-primary font-bold">{mode === 'trace' ? 'SYMBOLIC TRACE' : 'DISASSEMBLED OPCODES'}</span>
              <span className="text-slate-500">{mode === 'trace' ? `${trace.length} steps` : `${ops.length} instructions`}</span>
            </div>
            <div className="overflow-x-auto cyber-scrollbar max-h-96">
              {mode === 'trace' ? (
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-outline/60 text-slate-500 text-[10px]">
                      <th className="pb-2 pr-3">PC</th>
                      <th className="pb-2 px-3">Opcode</th>
                      <th className="pb-2 pl-3">Stack (top 6)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/30">
                    {trace.map((step) => (
                      <tr key={`${step.pc}-${step.opcode}`} className="hover:bg-white/5">
                        <td className="py-2 pr-3 text-slate-500">{step.pc}</td>
                        <td className="py-2 px-3 text-primary font-bold">{step.opcode}</td>
                        <td className="py-2 pl-3 text-slate-300 break-all">{step.stack}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-outline/60 text-slate-500 text-[10px]">
                      <th className="pb-2 pr-3">PC</th>
                      <th className="pb-2 px-3">Opcode</th>
                      <th className="pb-2 pl-3">Stack / Heuristic Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/30">
                    {ops.map((op) => (
                      <tr key={op.pc} className="hover:bg-white/5">
                        <td className="py-2 pr-3 text-slate-500">{op.pc}</td>
                        <td className="py-2 px-3 text-primary font-bold">{op.opcode}</td>
                        <td className="py-2 pl-3 text-slate-300">{op.comment || '—'}</td>
                      </tr>
                    ))}
                    {ops.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-6 text-center text-slate-500">
                          Disassemble bytecode to populate this table.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
