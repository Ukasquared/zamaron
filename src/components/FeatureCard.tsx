import Icon from './Icon';
import type { FeatureData } from '../types';

export default function FeatureCard({
  icon,
  eyebrow,
  eyebrowColorClass,
  title,
  titleColorClass,
  description,
  iconBgClass,
  iconBorderClass,
  glowClass,
  offset = false,
}: FeatureData) {
  return (
    <div
      className={[
        'glass-panel rounded-xl p-card-padding flex flex-col gap-4 group transition-all duration-500 relative overflow-hidden',
        glowClass,
        offset ? 'md:-translate-y-8 border-secondary-container/30' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {offset && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-container/20 blur-3xl rounded-full" />
      )}
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center border ${iconBgClass} ${iconBorderClass}`}
      >
        <Icon name={icon} className={`${eyebrowColorClass} text-2xl`} />
      </div>
      <div className="bg-surface-container/50 px-3 py-1 rounded-full border border-white/5 w-fit">
        <span className={`font-label-sm text-label-sm ${eyebrowColorClass}`}>{eyebrow}</span>
      </div>
      <h3 className={`font-headline-lg text-[24px] font-semibold ${titleColorClass}`}>{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{description}</p>
    </div>
  );
}
