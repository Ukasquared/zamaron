import { Icon } from '@/components/ui/Icon';
import type { CourseData, CourseAccent } from '../../types';

const ACCENT_STYLES: Record<
  CourseAccent,
  { badgeBorder: string; badgeText: string; badgeExtra: string; cardHover: string; titleHover: string; button: string }
> = {
  neutral: {
    badgeBorder: 'border-outline/30',
    badgeText: 'text-on-surface',
    badgeExtra: '',
    cardHover: 'hover:border-primary-fixed/50',
    titleHover: 'group-hover:text-primary-fixed',
    button:
      'border-primary-fixed/30 text-primary-fixed hover:bg-primary-fixed/10 dashboard-neon-border',
  },
  primary: {
    badgeBorder: 'border-primary-fixed/30',
    badgeText: 'text-primary-fixed',
    badgeExtra: '',
    cardHover: 'hover:border-primary-fixed/50',
    titleHover: 'group-hover:text-primary-fixed',
    button:
      'border-primary-fixed/30 text-primary-fixed hover:bg-primary-fixed/10 dashboard-neon-border',
  },
  secondary: {
    badgeBorder: 'border-secondary/50',
    badgeText: 'text-secondary',
    badgeExtra: 'shadow-[0_0_10px_rgba(236,178,255,0.2)]',
    cardHover: 'hover:border-secondary/50',
    titleHover: 'group-hover:text-secondary',
    button:
      'border-secondary/30 text-secondary hover:bg-secondary/10 shadow-[0_0_10px_rgba(236,178,255,0.1)] hover:shadow-[0_0_15px_rgba(236,178,255,0.3)]',
  },
};

export default function CourseCard({ title, description, hours, level, accent, imageUrl, imageAlt }: CourseData) {
  const styles = ACCENT_STYLES[accent];

  return (
    <article
      className={`dashboard-glass-panel rounded-xl overflow-hidden group flex flex-col transition-colors duration-300 ${styles.cardHover}`}
    >
      <div className="h-48 relative overflow-hidden bg-surface-container-lowest">
        <div
          role="img"
          aria-label={imageAlt}
          className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-4 left-4">
          <span
            className={`px-2 py-1 rounded bg-surface/80 border ${styles.badgeBorder} ${styles.badgeText} ${styles.badgeExtra} font-label-sm text-[10px] backdrop-blur-md uppercase tracking-wider`}
          >
            {level}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col dashboard-glass-card-inner">
        <h4 className={`font-headline-lg text-xl text-on-surface mb-2 transition-colors ${styles.titleHover}`}>
          {title}
        </h4>
        <p className="text-sm text-on-surface-variant mb-6 flex-1">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-xs text-outline font-label-sm">
            <Icon name="schedule" className="text-[16px]" />
            {hours}
          </div>
          <button
            className={`px-4 py-2 rounded border font-label-sm text-label-sm transition-colors ${styles.button}`}
          >
            Enroll
          </button>
        </div>
      </div>
    </article>
  );
}
