import Icon from '../Icon';
import type { StatusMetricData } from '../../types';

export default function StatusMetricCard({ icon, statusIcon, label, value, description }: StatusMetricData) {
  return (
    <div className="bg-surface-container/40 backdrop-blur-[20px] border border-outline-variant/50 rounded-xl p-card-padding flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-widest">{label}</h3>
        <Icon name={icon} className="text-outline-variant" />
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full bg-error-container/30 border border-error/50 flex items-center justify-center glow-box-error">
          <Icon name={statusIcon} className="text-error" />
        </div>
        <div>
          <div className="font-data-lg text-data-lg text-error">{value}</div>
          <div className="font-body-md text-body-md text-outline text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
}
