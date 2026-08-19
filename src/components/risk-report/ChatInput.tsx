import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';

interface ChatInputProps {
  onSend?: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-outline-variant/30 bg-surface-container/50 z-10">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask the Neural Mentor about $OMI..."
          className="w-full bg-surface-dim border border-outline-variant/50 rounded-full py-3 pl-6 pr-12 text-body-md text-on-surface placeholder-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
        >
          <Icon name="send" />
        </button>
      </div>
    </form>
  );
}
