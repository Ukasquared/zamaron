import FeatureCard from './FeatureCard';
import { FEATURES } from '../data/content';

export default function FeaturesSection() {
  return (
    <section className="mb-section-gap relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
