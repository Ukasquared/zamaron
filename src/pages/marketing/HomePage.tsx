import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { StatCard } from "@/components/shared/StatCard";
import { Marquee, MarqueeItem } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import MoltenMetal from "@/components/ui/MoltenMetal";
import GradientWaves from "@/components/ui/GradientWaves";
import TextType from "@/components/ui/TextType";
import {VerticalMarquee} from "@/components/ui/VerticalMarquee";

// import LayoutAnchor from '@/components/ui/AnchorLayout';

/**
 * HomePage — Zamaron marketing landing with premium motion language
 */
export const HomePage: React.FC = () => {
  const trustedNetworks: MarqueeItem[] = [
    { name: "Ethereum", symbol: "ETH", badge: "L1 Mainnet" },
    { name: "Arbitrum", symbol: "ARB", badge: "Nitro Rollup" },
    { name: "Solana", symbol: "SOL", badge: "SVM High-Speed" },
    { name: "Polygon zkEVM", symbol: "POL", badge: "Zero-Knowledge" },
    { name: "Optimism", symbol: "OP", badge: "OP Stack" },
    { name: "Avalanche", symbol: "AVAX", badge: "Subnets" },
    { name: "Base", symbol: "BASE", badge: "L2 Secured" },
    { name: "Chainlink", symbol: "LINK", badge: "Decentralized Oracle" },
    { name: "OpenZeppelin", symbol: "OZ", badge: "Contract Standards" },
    { name: "Certora Prover", symbol: "CERT", badge: "Formal Proofs" },
    { name: "Fireblocks", symbol: "FIRE", badge: "MPC Custody" },
    { name: "Ledger Vault", symbol: "LEDG", badge: "Hardware Security" },
  ];

  const pillars = [
    {
      title: "Formal Verification",
      icon: "verified_user",
      desc: "Mathematically prove the correctness of smart contract state machines and eliminate zero-day vulnerabilities through automated theorem provers.",
      tag: "MATHEMATICAL PROOF",
      accent: "cyan",
    },
    {
      title: "Neural AI Forensics",
      icon: "smart_toy",
      desc: "Machine-speed opcode disassembly, semantic invariant checks, and cross-contract reentrancy heuristics scanning deep bytecode execution flows.",
      tag: "AI HEURISTICS",
      accent: "purple",
    },
    {
      title: "Formal Verification",
      icon: "verified_user",
      desc: "Mathematically prove the correctness of smart contract state machines and eliminate zero-day vulnerabilities through automated theorem provers.",
      tag: "MATHEMATICAL PROOF",
      accent: "cyan",
    },
    {
      title: "Neural AI Forensics",
      icon: "smart_toy",
      desc: "Machine-speed opcode disassembly, semantic invariant checks, and cross-contract reentrancy heuristics scanning deep bytecode execution flows.",
      tag: "AI HEURISTICS",
      accent: "purple",
    },
  ];

  const pillarsTwo = [
     {
      title: "Institutional Audits",
      icon: "gavel",
      desc: "Comprehensive manual code inspection by top-tier cryptographic security researchers with verified bug discovery records and white-hat credentials.",
      tag: "HUMAN EXPERTISE",
      accent: "emerald",
    },
    {
      title: "Skynet Threat Radar",
      icon: "radar",
      desc: "24/7 continuous on-chain surveillance, mempool attack prediction, automated liquidation protection, and real-time anomalous volume detection.",
      tag: "REAL-TIME SURVEILLANCE",
      accent: "amber",
    },
    {
      title: "Institutional Audits",
      icon: "gavel",
      desc: "Comprehensive manual code inspection by top-tier cryptographic security researchers with verified bug discovery records and white-hat credentials.",
      tag: "HUMAN EXPERTISE",
      accent: "emerald",
    },
    {
      title: "Skynet Threat Radar",
      icon: "radar",
      desc: "24/7 continuous on-chain surveillance, mempool attack prediction, automated liquidation protection, and real-time anomalous volume detection.",
      tag: "REAL-TIME SURVEILLANCE",
      accent: "amber",
    },
  ]

  // Key numerical stats configurable for backend connection
  const keyStatistics = [
    {
      label: "Smart Contracts Audited",
      value: 3850,
      prefix: "",
      suffix: "+",
      decimals: 0,
      description: "Zero post-audit exploits",
      icon: "verified",
    },
    {
      label: "Critical Threats Mitigated",
      value: 8940,
      prefix: "",
      suffix: "",
      decimals: 0,
      description: "100% resolution rate",
      icon: "shield_with_heart",
    },
    {
      label: "Total Value Protected",
      value: 64.2,
      prefix: "$",
      suffix: "B",
      decimals: 1,
      description: "Across 12 Layer 1 & 2 chains",
      icon: "account_balance",
    },
    {
      label: "Global Security Posture",
      value: 98.4,
      prefix: "",
      suffix: "%",
      decimals: 1,
      description: "Institutional Tier-1 standard",
      icon: "speed",
    },
    {
      label: "Global Sensor Nodes",
      value: 128,
      prefix: "",
      suffix: " Nodes",
      decimals: 0,
      description: "99.99% network uptime",
      icon: "sensors",
    },
    {
      label: "Detection Response Time",
      value: 12,
      prefix: "",
      suffix: "ms",
      decimals: 0,
      description: "Mempool-level interception",
      icon: "timer",
    },
  ];

  return (
    <div className="">
      <ScrollProgress />

      {/* Hero Section — page-load choreography + parallax depth + blockchain viz */}
      <GlowBackground variant="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GradientWaves
            horizonColor="#5227FF"
            waveColor="#FF9FFC"
            crestColor="#FFFFFF"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1}
            opacity={1}
            mouseInteraction
            parallaxStrength={0.5}
            grain
            grainIntensity={0.05}
          />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
            <MoltenMetal
                color1="#5227FF"
                color2="#FF9FFC"
                color3="#FFFFFF"
                speed={0.35}
                scale={5.4}
                detail={3}
                glow={2.1}
                coreSize={0.1}
                swirl={1}
                fold={-0.2}
                blackPoint={0.05}
                brightness={1.3}
                colorMode="molten"
                grain
                grainIntensity={0.05}
                mouseInteraction
                mouseStrength={0.3}
                opacity={1}
              />
        </div>

        <div className="relative z-20 py-20 sm:py-24">
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Top Pill Badge — first beat of load, blur+fade */}
            <Reveal variant="blur" delay={0} duration={680}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-cyan-400/25 text-cyan-200 font-mono text-[11px] sm:text-xs font-semibold tracking-[0.14em] shadow-[0_0_24px_rgba(0,218,243,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md will-change-transform">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400" />
                </span>
                <span>CRYSTALLINE NEXUS • INSTITUTIONAL SECURITY PROTOCOL</span>
              </div>
            </Reveal>

            {/* Main Hero Headline — hero-variant (scale+blur+rise) */}
            <Reveal variant="hero" delay={85}>
              <h1 className="font-display font-extrabold text-[2.5rem] sm:text-6xl lg:text-[4.25rem] text-white tracking-[-0.03em] leading-[1.05] max-w-4xl mx-auto text-balance">
                Securing the Future of{" "}
                <span className="text-gradient-cyan">
                  Decentralized Finance
                </span>
              </h1>
            </Reveal>

            {/* Subtitle — rises with slight blur, second beat */}
            <Reveal variant="rise" delay={180}>
              <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-sans text-pretty">
                Uncompromising smart contract auditing, automated EVM bytecode
                forensics, and 24/7 real-time threat surveillance. Protecting
                over{" "}
                <span className="text-cyan-300 font-bold font-mono">
                  $64 Billion
                </span>{" "}
                in on-chain assets.
              </p>
            </Reveal>

            {/* CTA Buttons — rise + subtle lift/shimmer on hover */}
            <Reveal variant="rise" delay={260}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link to="/client/audits/new" className="will-change-transform">
                  <Button
                    size="lg"
                    icon="shield"
                    className="shadow-[0_0_30px_rgba(0,218,243,0.4),0_12px_30px_-12px_rgba(0,218,243,0.5)] hover:shadow-[0_0_40px_rgba(0,218,243,0.55),0_16px_40px_-12px_rgba(0,218,243,0.6)]"
                  >
                    Request Security Audit
                  </Button>
                </Link>
                <Link to="/threat-hub/skynet" className="will-change-transform">
                  <Button variant="outline" size="lg" icon="radar">
                    Launch Skynet Radar
                  </Button>
                </Link>
              </div>
            </Reveal>

            {/* Live Top Metrics Grid — staggered scale reveals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 text-left">
              <Reveal variant="scale" delay={380}>
                <StatCard
                  label="Total Value Protected"
                  value="$64.2B"
                  numericValue={64.2}
                  prefix="$"
                  suffix="B"
                  decimals={1}
                  delta="+14.2%"
                  icon="security"
                  variant="fresnel"
                  animate
                />
              </Reveal>
              <Reveal variant="scale" delay={460}>
                <StatCard
                  label="Protocols Verified"
                  value="1,420"
                  numericValue={1420}
                  suffix="+"
                  decimals={0}
                  delta="+38 this mo"
                  icon="fact_check"
                  variant="glass"
                  animate
                />
              </Reveal>
              <Reveal variant="scale" delay={540}>
                <StatCard
                  label="Threats Mitigated"
                  value="8,940"
                  numericValue={8940}
                  decimals={0}
                  delta="100% resolved"
                  icon="gpp_bad"
                  iconColor="text-red-400"
                  variant="glass"
                  animate
                />
              </Reveal>
              <Reveal variant="scale" delay={620}>
                <StatCard
                  label="Global Z-Score"
                  value="98.4"
                  numericValue={98.4}
                  suffix=" / 100"
                  decimals={1}
                  delta="Optimal Health"
                  icon="radar"
                  iconColor="text-emerald-400"
                  variant="glass"
                  animate
                />
              </Reveal>
            </div>
          </div>
        </div>
      </GlowBackground>

      {/* Trusted Ecosystem Technologies & Networks — seamless infinite marquee */}
      <section
        className="relative bg-white text-slate-800 overflow-hidden"
        aria-label="Trusted ecosystem networks"
      >
        <div className="border-y border-slate-200 shadow-[0_18px_50px_-28px_rgba(2,6,23,0.28)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-2">
            <Reveal variant="rise" threshold={0.1}>
              <div className="flex items-center justify-center gap-4 pb-6">
                <span className="hidden sm:block h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-slate-300" />
                <p className="text-[10px] sm:text-xs font-mono font-semibold text-slate-500 uppercase tracking-[0.18em] sm:tracking-[0.22em] text-center">
                  Institutional Verification Across Leading Blockchain
                  Ecosystems
                </p>
                <span className="hidden sm:block h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-slate-300" />
              </div>
            </Reveal>
            {/* Marquee uses duplicated flex track (no jump) + mask edges */}
            <Reveal variant="fade" delay={120}>
              <Marquee items={trustedNetworks} speed="slow" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Animated Numerical Statistics Grid (Count-Up Section) — staggered scale + spotlight */}
      <div className="mt-10 sm:mt-16 lg:mt-20 mb-8 sm:mb-12">
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 ">
          {/* Decorative radial — drifts with parallax */}
          <Parallax
            speed={-0.05}
            clamp={24}
            className="absolute inset-x-0 -top-16 bottom-0 -z-10 pointer-events-none"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_0%,rgba(0,218,243,0.05),transparent_70%)]"
              aria-hidden="true"
            />
          </Parallax>

          <Reveal variant="blur" threshold={0.14}>
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 text-center">
              <div className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                <TextType
                  text={[
                    "Continuous formal verification",
                    "Rapid incident response",
                    "Automated threat interception",
                  ]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor
                  cursorCharacter="_"
                  deletingSpeed={50}
                  variableSpeed={{ min: 60, max: 120 }}
                  cursorBlinkDuration={0.5}
                />
              </div>
              <SectionHeading
                badge=""
                badgeVariant="secondary"
                title=""
                description="Battle-Tested Security by the Numbers."
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {keyStatistics.map((stat, idx) => (
              <Reveal
                key={stat.label}
                variant="scale"
                delay={(idx % 6) * 70}
                threshold={0.12}
              >
                <GlassCard
                  variant="default"
                  hoverEffect
                  spotlight
                  blur="lg"
                  className="p-5 flex flex-col justify-between text-center space-y-3 group h-full"
                >
                  <div className="mx-auto p-2.5 rounded-xl bg-[#060e20] border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,218,243,0.3)] group-hover:scale-[1.04] transition-all duration-300 will-change-transform">
                    <Icon name={stat.icon} size={22} />
                  </div>

                  <div>
                    <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </div>
                    <div className="text-xs font-mono font-semibold text-slate-300 mt-1.5">
                      {stat.label}
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 pt-2.5 border-t border-white/10">
                    {stat.description}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* Core Technology Pillars — fresnel + spotlight + delicate scale on icon */}
      <div className="mt-10 sm:mt-16 lg:mt-20">
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Parallax
            speed={-0.05}
            clamp={24}
            className="absolute inset-x-0 top-0 bottom-0 -z-10 pointer-events-none"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(50%_45%_at_15%_85%,rgba(0,230,118,0.05),transparent_70%)]"
              aria-hidden="true"
            />
          </Parallax>

          <Reveal variant="blur" threshold={0.16}>
            <SectionHeading
              badge="DEFENSE-IN-DEPTH"
              badgeVariant="secondary"
              title="Institutional-Grade Security Suite"
              description="Built from the ground up to protect high-stakes decentralized finance protocols, bridges, and liquid staking derivatives."
            />
          </Reveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

  {/* LEFT */}
  <VerticalMarquee
    direction="up"
    duration={15}
    className="h-[500px]"
  >
    {pillars.map((p) => (
      <GlassCard
        key={p.title}
        variant="fresnel"
        hoverEffect
        spotlight
        tilt
        blur="xl"
        className="border-white/10 p-7"
      >
        <div className="flex items-center justify-between">
          <div className="rounded-xl border border-cyan-500/30 bg-[#060e20] p-3 text-cyan-400">
            <Icon name={p.icon} size={28} />
          </div>

          <Badge variant="outline" size="sm">
            {p.tag}
          </Badge>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white">
          {p.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {p.desc}
        </p>
      </GlassCard>
    ))}
  </VerticalMarquee>

  {/* RIGHT */}
  <VerticalMarquee
    direction="down"
    duration={18}
    className="h-[500px]"
  >
    {pillarsTwo.map((p) => (
      <GlassCard
        key={p.title}
        variant="fresnel"
        hoverEffect
        spotlight
        tilt
        blur="xl"
        className="border-white/10 p-7"
      >
        <div className="flex items-center justify-between">
          <div className="rounded-xl border border-cyan-500/30 bg-[#060e20] p-3 text-cyan-400">
            <Icon name={p.icon} size={28} />
          </div>

          <Badge variant="outline" size="sm">
            {p.tag}
          </Badge>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white">
          {p.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {p.desc}
        </p>
      </GlassCard>
    ))}
  </VerticalMarquee>

</div>
          </section>
        </div>
    </div>
  );
};
