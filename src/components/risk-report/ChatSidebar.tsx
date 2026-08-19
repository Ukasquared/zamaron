import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { CHAT_MESSAGES } from '../../data/riskReportContent';
import type { ChatMessageData } from '../../types';

export default function ChatSidebar() {
  const [messages, setMessages] = useState<ChatMessageData[]>(CHAT_MESSAGES);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { sender: 'user', senderLabel: 'You', paragraphs: [[{ text }]] }]);
  };

  return (
    <div className="lg:col-span-4 h-[800px] lg:h-auto">
      <div className="bg-surface-container/20 backdrop-blur-[40px] border border-outline-variant/30 rounded-xl h-full flex flex-col overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="p-6 border-b border-outline-variant/30 bg-surface-container-high/40 flex items-center gap-4 z-10">
          <div className="w-12 h-12 rounded-full border-2 border-primary/50 flex items-center justify-center relative bg-surface-dim overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <div className="w-full h-full bg-gradient-to-br from-primary-container/20 to-secondary-container/40 flex items-center justify-center">
              <Icon name="smart_toy" className="text-primary text-2xl" />
            </div>
          </div>
          <div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface text-lg">Zamaron Neural AI</h3>
            <p className="font-label-sm text-label-sm text-primary tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00f0ff]" />
              ONLINE MENTOR
            </p>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 z-10">
          {messages.map((message, i) => (
            <ChatMessage key={i} {...message} />
          ))}
        </div>

        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
