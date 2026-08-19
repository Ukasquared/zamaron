import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import TrustBadgeItem from './TrustBadgeItem';
import { TRUST_BADGES, HERO_IMAGE } from '@/data/content';

export function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[716px] mb-section-gap relative">
      {/* Holographic background elements */}
      <div className="absolute top-1/4 left-10 text-primary-fixed-dim opacity-30 holo-float text-4xl">
        <Icon name="currency_bitcoin" filled />
      </div>
      <div className="absolute bottom-1/4 right-20 text-secondary-container opacity-40 holo-float font-data-lg text-data-lg tracking-widest">
        0x7F4...A19
      </div>

      <div className="lg:col-span-6 space-y-8 z-20">
        <h1 className="font-display-xl text-display-xl text-primary text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary-container leading-tight">
          Learn Crypto. Detect Scams. Stay Protected.
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
          Navigate the digital frontier with institutional-grade intelligence. Our neural
          networks analyze, verify, and secure your transactions before you execute.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button variant="primary" size="lg" glass>
            Get Started
            <Icon name="arrow_forward" className="text-[18px]" />
          </Button>
          <Button variant="secondary" size="lg" glass>
            Run Scam Check
            <Icon name="security" className="text-[18px]" />
          </Button>
        </div>

        {/* Trust bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row gap-6 sm:items-center text-on-surface-variant">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim">
            Trusted by 50,000+ Users
          </span>
          <div className="flex gap-6">
            {TRUST_BADGES.map((badge) => (
              <TrustBadgeItem key={badge.label} {...badge} />
            ))}
          </div>
        </div>
      </div>

      {/* Hero imagery */}
      <div className="lg:col-span-6 relative h-[500px] flex justify-center items-center">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-80"
          role="img"
          aria-label={HERO_IMAGE.alt}
          style={{ backgroundImage: `url('${HERO_IMAGE.url}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
    </section>
  );
}

export default HeroSection;
