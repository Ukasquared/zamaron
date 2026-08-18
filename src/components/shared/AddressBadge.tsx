import React, { useState } from 'react';
import { cn, formatAddress, copyToClipboard } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export interface AddressBadgeProps {
  address: string;
  start?: number;
  end?: number;
  showCopy?: boolean;
  showLink?: boolean;
  explorerUrl?: string;
  className?: string;
  copyText?: string;
}

export const AddressBadge: React.FC<AddressBadgeProps> = ({
  address,
  start = 6,
  end = 4,
  showCopy = true,
  showLink = false,
  explorerUrl,
  className,
  copyText,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(copyText || address);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b1326] border border-outline/70 font-mono text-xs text-slate-300 transition-colors',
        'hover:border-primary/50 group',
        className
      )}
    >
      <span className="text-primary/70 group-hover:text-primary">#</span>
      <span className="tracking-tight">{formatAddress(address, start, end)}</span>

      {showCopy && (
        <button
          onClick={handleCopy}
          title={copied ? 'Copied to clipboard' : 'Copy address'}
          className="text-slate-400 hover:text-white transition-colors p-0.5 rounded cursor-pointer"
        >
          <Icon name={copied ? 'check' : 'content_copy'} size={14} className={copied ? 'text-emerald-400' : ''} />
        </button>
      )}

      {showLink && explorerUrl && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-slate-400 hover:text-primary transition-colors p-0.5"
        >
          <Icon name="open_in_new" size={14} />
        </a>
      )}
    </span>
  );
};
