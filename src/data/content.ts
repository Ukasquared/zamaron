import type { NavLink, TrustBadgeData, FeatureData } from '../types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Detector', href: '#' },
  { label: 'Academy', href: '#' },
  { label: 'Analyzer', href: '#' },
  { label: 'Support', href: '#' },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Security Audit', href: '#' },
  { label: 'Privacy Matrix', href: '#' },
  { label: 'Terms of Intel', href: '#' },
  { label: 'Neural API', href: '#' },
];

export const TRUST_BADGES: TrustBadgeData[] = [
  { icon: 'school', label: 'Learn Safely', iconColorClass: 'text-secondary-fixed-dim' },
  { icon: 'verified', label: 'Verify Projects', iconColorClass: 'text-primary-fixed-dim' },
  { icon: 'notifications_active', label: 'Stay Alert', iconColorClass: 'text-error' },
];

export const FEATURES: FeatureData[] = [
  {
    icon: 'school',
    eyebrow: 'Academy',
    eyebrowColorClass: 'text-primary-fixed-dim',
    title: 'Crypto Courses',
    titleColorClass: 'text-primary',
    description:
      'Master the fundamentals of blockchain technology, wallet security, and smart contract interaction through interactive holographic modules.',
    iconBgClass: 'bg-primary-fixed-dim/10',
    iconBorderClass: 'border-primary-fixed-dim/30',
    glowClass: 'hover:neon-glow-primary',
  },
  {
    icon: 'policy',
    eyebrow: 'Terminal',
    eyebrowColorClass: 'text-secondary-container',
    title: 'AI Scam Detector',
    titleColorClass: 'text-secondary-fixed',
    description:
      'Real-time neural analysis of contract code, liquidity patterns, and developer history to identify malicious intent before you connect your wallet.',
    iconBgClass: 'bg-secondary-container/10',
    iconBorderClass: 'border-secondary-container/30',
    glowClass: 'hover:neon-glow-secondary',
    offset: true,
  },
  {
    icon: 'query_stats',
    eyebrow: 'Analytics',
    eyebrowColorClass: 'text-primary-fixed-dim',
    title: 'Token Risk Analyzer',
    titleColorClass: 'text-primary',
    description:
      'Deep-dive metrics into tokenomics, holder distribution, and on-chain velocity. Visualize risk with our proprietary multi-layered data arrays.',
    iconBgClass: 'bg-primary-fixed-dim/10',
    iconBorderClass: 'border-primary-fixed-dim/30',
    glowClass: 'hover:neon-glow-primary',
  },
];

export const HERO_IMAGE = {
  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDitylg1uGy_bSeLcWm1htpDRpnL5_8b3gXGT38uZMwQw6m0Ua4-D9vixt2zX0ITJ4uefTW71Lnq-u4O1Hb3SuWzJp6A118JD2NGv_AgJIo5DSlYOCmV71dBwVxtu_i-NsyDB8h3dH6kus17vXUCtNk_R3HXKk8-PXT5Joeh4NgVSmydOCvF-GgXcDa0PQfxvZS4ARHd4KE1rInh0j20X2-ZHLb297gsMNsacZuuW8EM1m1U3uvdCsfnokW9VkviysqlAf8cTlDANY',
  alt: 'A highly detailed digital illustration of an iridescent, glowing purple AI brain structure hovering above a futuristic, frosted-glass holographic laptop on a sleek desk, lit by electric blue and violet light in a dark command-center setting.',
};
