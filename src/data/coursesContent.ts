import type { DashboardNavItemData, FilterTagData, CourseData } from '../types';

export const DASHBOARD_NAV_ITEMS: DashboardNavItemData[] = [
  { icon: 'dashboard', label: 'Dashboard', href: '#' },
  { icon: 'school', label: 'All Courses', href: '#', active: true },
  { icon: 'verified', label: 'Certifications', href: '#' },
  { icon: 'groups', label: 'Mentors', href: '#' },
  { icon: 'settings', label: 'Settings', href: '#' },
];

export const SECONDARY_NAV_ITEMS: DashboardNavItemData[] = [
  { icon: 'help', label: 'Support', href: '#' },
  { icon: 'logout', label: 'Sign Out', href: '#' },
];

export const FILTER_TAGS: FilterTagData[] = [
  { label: 'All', active: true },
  { label: 'Beginner' },
  { label: 'Advanced' },
  { label: 'Auditing' },
];

export const FEATURED_COURSE = {
  badge: 'In Progress',
  title: 'Mastering DeFi Security: The Audit Blueprint',
  description:
    'Dive deep into smart contract vulnerabilities. Learn to identify and exploit reentrancy, flash loan attacks, and precision issues before they go live.',
  ctaLabel: 'Resume Lesson',
  progress: 64,
  icon: 'lock_person',
};

export const COURSES: CourseData[] = [
  {
    title: 'Identifying Rug Pulls',
    description:
      'Learn to spot malicious token contracts, hidden mint functions, and liquidity locks before investing.',
    hours: '2.5 Hours',
    level: 'Beginner',
    accent: 'neutral',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5pHoWDoP0zLrvVcU6iLL2zp6odTioSUgneyRnxvJ_56jDUhH68Q6b1N74ZaRDb7PYIxzia6IBaZ7Fk_KEB78efp-zAUb88aQbn0sSmUzH6GL80uysC4w7FWm_ExJUilGljRjBsGSAMW2laXWnKPT6eatgxHJ7J94GJ7oyLUZz5evtSCkM-ODrKd0cP8rBWo_1pBLwhA03LSWu3cKFilhC3_ca8Mnd_q2B1_UOM7g53oOZwinvoGXlT30g_fyAzzzPisBn1UJWSz7K',
    imageAlt:
      'Abstract digital visualization of a blockchain rug pull, with glowing neon cyan and magenta lines fracturing and dissipating over a dark, cyber-luxe background.',
  },
  {
    title: 'Smart Contract Fundamentals',
    description: 'Master Solidity basics, understand state variables, and build your first secure ERC-20 token.',
    hours: '5.0 Hours',
    level: 'Intermediate',
    accent: 'primary',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADaNMrNOzMd6eFUQzpmijzSr_uVIneb8C0XbinZo1Xd0dsOiTqb1CYXdO1jgKsDa_s9wx0U6e3SliHtN11cppJy0GJl7GyJgbDgg59suHN7sfiRwfGF1lTMzHOBKZiyZQ_5dan-XRAeYag778ERq8nh4J2oNVyD4yQEDQs2Kp-Tezs5W91VrUFZwQbDxUl4D3c5lfQ0bgcjDJiC-j0sbM2RjQyhQpW5RTnweBPKREOJvxR-NvYjIUpx9uEG-nKm59gG_GU9zNeWseA',
    imageAlt:
      'Futuristic representation of smart contracts with glowing digital code elements in deep blues and cyan floating over an abstract glassmorphic background.',
  },
  {
    title: 'Honeypot Detection',
    description:
      'Advanced techniques to analyze bytecodes and transaction traces to avoid un-sellable token traps.',
    hours: '4.2 Hours',
    level: 'Pro',
    accent: 'secondary',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5-Y_wJfwy_qfG3-j0lcPP4aOLlqvNut2SBNOUWA0yeXg7QDj5m_QXt7fffsQgESyWkdx_nQvXpKYpcDgJmBAtAICNRscREJA9A62rUAxa8r9S57PUdQymtXpHg2o2SHePA_QrIW5mwXjBb4cHJRFGUqLfG4XILGX_T9lfpbc8hQbYJxtdgT9VMSngeGDcQBdT5jX4QbUeYKMPg83yhrxFtdfD6_5w6Bldcc-kdWEDAbbQnFQjFfJmPeDSyj2kghYUweuMuXybAzLA',
    imageAlt:
      'Conceptual illustration of a honeypot trap in a cyber environment, with a glowing data node surrounded by deep violet and magenta warning tones.',
  },
];

export const CURRENT_USER = {
  name: 'Alex',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD54sfDMWdY58VaEpZXVGs5km_VSKdJ4La0dR2WPnWWCgZ631FEdPLHpiNe_WsrC17YR75HUwR9fYyDYrz3hVh9Q4gVUk1Y_RpyVStz3PkHX4GBofs5XyQvk-9mtplgZ42Dn_7NWQAMeKtrr7ZgRU7o2xI6RRhyRaBYbKPtjOXFzvZ_pX1w3APr4rtshmQapl4Zi0EJVB2zmynhNwEOrMSFDSzd-HggdJeIjaFfvQcniA3uyp5IoO8qpNb2WPd4h14jin92xGvoAyom',
};
