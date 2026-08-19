import { Icon } from '@/components/ui/Icon';
import type { TrustBadgeData } from '@/types';

export function TrustBadgeItem({ icon, label, iconColorClass }: TrustBadgeData) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} className={`${iconColorClass} text-[16px]`} />
      <span className="font-label-sm text-label-sm text-xs">{label}</span>
    </div>
  );
}

export default TrustBadgeItem;
