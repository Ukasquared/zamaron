import { Icon } from '@/components/ui/Icon';

interface RiskBadgeProps {
  label: string;
}

export default function RiskBadge({ label }: RiskBadgeProps) {
  return (
    <div className="bg-error-container/20 backdrop-blur-md border border-error/50 px-8 py-3 rounded-sm glow-box-error flex items-center gap-3 relative overflow-hidden group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-error/10 to-transparent h-[200%] w-full -translate-y-full group-hover:animate-scan" />
      <Icon name="warning" className="text-error glow-text-error" />
      <span className="font-headline-lg text-headline-lg text-error glow-text-error tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}
