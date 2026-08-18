import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const ForensicsPage: React.FC = () => {
  const [bytecode, setBytecode] = useState(
    '608060405234801561001057600080fd5b50600436106100365760003560e01c80632e1a7d4d1461003b5780633ccfd60b1461005757'
  );

  const disassembledOpcodes = [
    { pc: '0000', opcode: 'PUSH1 0x80', comment: 'Initialize free memory pointer' },
    { pc: '0002', opcode: 'PUSH1 0x40', comment: '' },
    { pc: '0004', opcode: 'MSTORE', comment: 'Memory[0x40] = 0x80' },
    { pc: '0005', opcode: 'CALLVALUE', comment: 'Check msg.value for non-payable constructor' },
    { pc: '0006', opcode: 'DUP1', comment: '' },
    { pc: '0007', opcode: 'ISZERO', comment: '' },
    { pc: '0008', opcode: 'PUSH2 0x0010', comment: 'Jump if msg.value == 0' },
    { pc: '000B', opcode: 'JUMPI', comment: '' },
    { pc: '000C', opcode: 'PUSH1 0x00', comment: 'Revert on payable call' },
    { pc: '000E', opcode: 'REVERT', comment: '' },
    { pc: '0010', opcode: 'JUMPDEST', comment: 'Function Selector Dispatcher' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">EVM FORENSIC SUITE</Badge>
            <span className="text-xs font-mono text-slate-400">Bytecode Disassembler & Flow Tracer</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Opcode Execution Analysis
          </h1>
        </div>

        <Button size="md" icon="play_circle">
          Execute Symbolic Trace
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Bytecode Input */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="glass" className="p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span>Raw Compiled Bytecode (Hex):</span>
              <span className="text-primary font-bold">{bytecode.length / 2} Bytes</span>
            </div>
            <textarea
              rows={8}
              value={bytecode}
              onChange={(e) => setBytecode(e.target.value)}
              className="w-full bg-[#060e20] border border-outline rounded p-3 text-xs font-mono text-slate-200 focus:border-primary focus:outline-none"
            />
            <Button variant="outline" size="sm" icon="sync" className="w-full">
              Disassemble Opcodes
            </Button>
          </Card>
        </div>

        {/* Disassembled Opcodes Table */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="terminal" className="p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-outline/50 pb-2">
              <span className="text-primary font-bold">DISASSEMBLED OPCODES</span>
              <span className="text-slate-500">11 Instructions</span>
            </div>

            <div className="overflow-x-auto cyber-scrollbar max-h-96">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-outline/60 text-slate-500 text-[10px]">
                    <th className="pb-2 pr-3">PC</th>
                    <th className="pb-2 px-3">Opcode</th>
                    <th className="pb-2 pl-3">Stack / Heuristic Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/30">
                  {disassembledOpcodes.map((op) => (
                    <tr key={op.pc} className="hover:bg-white/5">
                      <td className="py-2 pr-3 text-slate-500">{op.pc}</td>
                      <td className="py-2 px-3 text-primary font-bold">{op.opcode}</td>
                      <td className="py-2 pl-3 text-slate-300">{op.comment || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
