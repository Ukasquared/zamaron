import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

export const AiTerminalPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'SYSTEM',
      text: 'Neural Forensics Engine initialized. Model: Zamaron-DeepBytecode-v4. Ready for contract disassembly.',
    },
    {
      sender: 'USER',
      text: 'Analyze VaultManager.sol line 28 for reentrancy vectors and propose a gas-optimized nonReentrant modifier pattern.',
    },
    {
      sender: 'AI',
      text: `Analyzing contracts/VaultManager.sol:

1. Critical Flaw Detected (SWC-107):
   In function withdrawFunds(uint256 amount):
   - External raw call at line 28: (bool success, ) = msg.sender.call{value: amount}("");
   - State mutation at line 31: balances[msg.sender] -= amount;

2. Recommendation:
   Move state deduction prior to the external call and apply OpenZeppelin's ReentrancyGuard modifier. Gas savings: ~2,400 units per withdrawal.`,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'USER', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'AI',
          text: `Neural Agent response for: "${userMsg.text}". Memory analysis confirms no secondary cross-function reentrancy loops detected in the inheritance tree.`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-4 rounded-md">
        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="primary" dot pulse>
            NEURAL ASSISTANT TERMINAL
          </Badge>
          <span className="text-slate-400">Session ID: ZT-8924-X</span>
        </div>
        <Badge variant="success">INSPECTION ACTIVE</Badge>
      </div>

      <Card variant="terminal" className="p-4 flex flex-col h-[650px] justify-between">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto cyber-scrollbar space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded text-xs font-mono leading-relaxed ${
                m.sender === 'USER'
                  ? 'bg-[#111a30] border border-outline/60 text-slate-200 ml-8'
                  : m.sender === 'AI'
                  ? 'bg-[#060e20] border border-primary/40 text-primary mr-8 shadow-[0_0_15px_rgba(0,218,243,0.1)]'
                  : 'bg-surface-variant text-slate-400 text-center text-[11px]'
              }`}
            >
              <div className="font-bold text-[10px] uppercase text-slate-400 mb-1 flex items-center gap-1.5">
                <Icon name={m.sender === 'AI' ? 'smart_toy' : 'person'} size={14} />
                {m.sender === 'AI' ? 'ZAMARON NEURAL AGENT' : m.sender}
              </div>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleSend} className="pt-3 border-t border-outline/60 flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask neural agent to verify opcodes, write Certora rules, or check flashloan risks..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#060e20] border border-primary/40 rounded px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button type="submit" size="md" icon="send">
            Analyze
          </Button>
        </form>
      </Card>
    </div>
  );
};
