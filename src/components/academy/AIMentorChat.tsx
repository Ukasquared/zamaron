import type { ChatMessage } from "../../types/academy";

const messages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      'Hello! I\'m monitoring your progress. At this stage of the video, we\'re discussing LP (Liquidity Provider) Tokens.',
    timestamp: "14:32:01",
    highlight: "LP (Liquidity Provider) Tokens",
  },
  {
    id: "2",
    role: "assistant",
    content:
      'Think of LP tokens as a "receipt" for the liquidity you put in. If the developer keeps these receipts, they can withdraw the entire pool at any time. This is the core mechanism of a rug pull.',
  },
  {
    id: "3",
    role: "user",
    content: "Can you explain how to check if LP tokens are burned?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      'Great question! You\'ll need to check the transaction history for the "Burn" address (usually 0x000...dead). If the LP tokens were sent there, they are gone forever, making the pool permanent.',
  },
];

function renderContent(msg: ChatMessage) {
  if (!msg.highlight) return msg.content;

  const parts = msg.content.split(msg.highlight);
  return (
    <>
      {parts[0]}
      <span className="text-primary-fixed-dim font-bold">{msg.highlight}</span>
      {parts[1]}
    </>
  );
}

export default function AIMentorChat() {
  return (
    <div className="sticky top-24 h-[calc(100vh-140px)] flex flex-col glass-panel rounded-3xl border-white/5 shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-2 border-primary-fixed-dim p-1">
              <img
                alt="AI Mentor Avatar"
                className="w-full h-full rounded-full bg-slate-800"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWiPfFkIvRhK5M9ypHpHNAZKfifL_rFQyxtn1iZ33toVW80csEGf0PQDCwpYklxC6As9U8ET7iajZM4BogmmdYrSn5KvSSijyzPFEtIy9upIU0r7bHdL-qa0min2yf-hI5oQbcn0kfXPgllDekbS6gFvOVx3Qt7x32RSnSCZrmXvJ0NUv4bictQv4GSYPRDtGXbqZsT4i9twX84YDsGB9fdO55VZmQBg1To2-uTc9SrklTFLcD_yU6wr32OBd9Xn_o1hOzM5BoNNm5"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <h3 className="text-white font-headline-lg text-body-md font-bold">
              Neural AI Mentor
            </h3>
            <p className="text-primary-fixed-dim text-[10px] font-label-sm uppercase tracking-widest">
              Active Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <div className="p-4 rounded-2xl rounded-tr-none bg-secondary-container/10 border border-secondary-container/20 text-sm text-secondary font-body-md leading-relaxed max-w-[80%]">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="space-y-2">
              {msg.timestamp && (
                <div className="flex items-center gap-2 text-[10px] font-label-sm text-slate-500 uppercase tracking-tighter">
                  <span>System Timestamp</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                  <span>{msg.timestamp}</span>
                </div>
              )}
              <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-sm text-on-surface-variant font-body-md leading-relaxed">
                {renderContent(msg)}
              </div>
            </div>
          )
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-white/10 bg-background/50">
        <div className="relative group">
          <input
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 px-5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim/30 transition-all"
            placeholder="Ask about liquidity locks..."
            type="text"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-primary-fixed-dim text-on-primary-fixed rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg neon-glow-primary">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-3 text-center font-label-sm">
          AI MENTOR POWERED BY NEURAL-GEN v4.2
        </p>
      </div>
    </div>
  );
}
