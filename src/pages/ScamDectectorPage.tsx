import SideNav from "../components/scam-detector/SideNav";
import TopNav from "../components/scam-detector/TopNav";
import HeroSearch from "../components/scam-detector/HeroSearch";
import ThreatFeed from "../components/scam-detector/ThreatFeed";
import NetworkHealth from "../components/scam-detector/NetworkHealth";
import MyHistory from "../components/scam-detector/MyHistory";

export default function ScamDetectorPage() {
  return (
    <>
      {/* Cosmic Background Layers */}
      <div className="fixed inset-0 z-[-2] bg-surface-dim" />
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-high/40 via-surface-dim to-background opacity-80 pointer-events-none" />
      <div className="fixed inset-0 z-[-1] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

      <SideNav />
      <TopNav />

      <main className="pt-24 md:pt-8 px-6 md:pl-72 max-w-[1280px] mx-auto min-h-screen pb-section-gap flex flex-col gap-section-gap">
        <HeroSearch />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-8">
          <ThreatFeed />
          <div className="lg:col-span-4 flex flex-col gap-6">
            <NetworkHealth />
            <MyHistory />
          </div>
        </div>
      </main>
    </>
  );
}