import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen flex flex-col relative matrix-bg">
      <Navbar />
      <main className="flex-grow pt-32 pb-section-gap relative max-w-[1280px] mx-auto w-full px-gutter z-10">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
