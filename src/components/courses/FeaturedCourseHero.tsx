import { Icon } from '@/components/ui/Icon';
import { FEATURED_COURSE } from '../../data/coursesContent';

export default function FeaturedCourseHero() {
  const { badge, title, description, ctaLabel, progress, icon } = FEATURED_COURSE;

  return (
    <section className="dashboard-glass-panel rounded-xl overflow-hidden relative border-l-4 border-l-secondary">
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at center, var(--color-secondary-fixed-dim) 0%, transparent 70%)',
        }}
      />
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center relative z-10">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary text-secondary bg-secondary/10 font-label-sm text-label-sm">
            <Icon name="local_fire_department" className="text-[14px]" />
            {badge}
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">{title}</h2>
          <p className="text-on-surface-variant max-w-xl">{description}</p>
          <div className="flex items-center gap-6 pt-4">
            <button className="px-6 py-3 rounded-lg border border-primary-fixed text-primary-fixed bg-primary-fixed/10 hover:bg-primary-fixed/20 font-label-sm text-label-sm transition-all shadow-[0_0_15px_rgba(125,244,255,0.2)] flex items-center gap-2">
              <Icon name="play_arrow" fill />
              {ctaLabel}
            </button>
            <div className="flex-1 max-w-[200px]">
              <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-label-sm">
                <span>Progress</span>
                <span className="text-secondary">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full shadow-[0_0_8px_rgba(236,178,255,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-48 h-48 md:w-64 md:h-64 relative flex-shrink-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-secondary/20 blur-[50px] rounded-full" />
          <span
            className="material-symbols-outlined fill text-[120px] md:text-[160px] text-secondary opacity-80"
            style={{ filter: 'drop-shadow(0 0 20px rgba(236,178,255,0.6))' }}
            aria-hidden="true"
          >
            {icon}
          </span>
        </div>
      </div>
    </section>
  );
}
