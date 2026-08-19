import type { SidebarNavItemData, StatusMetricData, ThreatItemData, ChatMessageData } from '../types';

export const SIDEBAR_NAV_ITEMS: SidebarNavItemData[] = [
  { icon: 'dashboard', label: 'Dashboard', href: '#' },
  { icon: 'security', label: 'Scam Detector', href: '#' },
  { icon: 'school', label: 'Course Library', href: '#' },
  { icon: 'analytics', label: 'Risk Reports', href: '#', active: true },
  { icon: 'settings', label: 'Settings', href: '#' },
];

export const TARGET_ENTITY = {
  addressShort: '0x7F4...A92B',
  name: 'Omicron Protocol',
  ticker: '$OMI',
};

export const NEURAL_RISK_SCORE = {
  score: 94,
  max: 100,
  summary: 'Critical vulnerabilities detected in contract execution path.',
};

export const STATUS_METRICS: StatusMetricData[] = [
  {
    icon: 'water_drop',
    statusIcon: 'lock_open',
    label: 'Liquidity Status',
    value: 'Unlocked',
    description: '100% of pool is movable',
  },
  {
    icon: 'code',
    statusIcon: 'gpp_bad',
    label: 'Contract Audit',
    value: 'Failed',
    description: 'Honeypot characteristics found',
  },
  {
    icon: 'pie_chart',
    statusIcon: 'group',
    label: 'Ownership',
    value: '85.4%',
    description: 'Held by top 5 wallets',
  },
];

export const THREAT_COUNTS = { critical: 3, warning: 2 };

export const THREAT_ITEMS: ThreatItemData[] = [
  {
    severity: 'critical',
    title: 'Hidden Mint Function',
    description:
      'The contract contains an obfuscated `_internalMint` function callable exclusively by the deployer address, bypassing the standard hard cap.',
    code: [
      'function 0x8a2b(address target, uint256 amt) internal {',
      '  require(msg.sender == _owner);',
      '  _balances[target] += amt;',
      '}',
    ],
  },
  {
    severity: 'critical',
    title: 'Trading Pause Capability',
    description:
      'A modifier exists that allows the owner to suspend transfer functions indefinitely, effectively trapping buyer liquidity (Honeypot signature).',
  },
  {
    severity: 'warning',
    title: 'Tax Modification',
    description:
      'Buy/Sell taxes are currently set to 5%, but the contract allows the owner to set them up to 99% without a timelock.',
  },
];

export const CHAT_MESSAGES: ChatMessageData[] = [
  {
    sender: 'ai',
    senderLabel: 'Zamaron AI',
    paragraphs: [
      [
        { text: "I've analyzed the $OMI contract. The " },
        { text: 'Hidden Mint Function', bold: true },
        { text: ' is a severe red flag. The deployer can print infinite tokens and dump them on the liquidity pool.' },
      ],
    ],
  },
  {
    sender: 'user',
    senderLabel: 'You',
    paragraphs: [[{ text: 'What about the liquidity? It says unlocked.' }]],
  },
  {
    sender: 'ai',
    senderLabel: 'Zamaron AI',
    paragraphs: [
      [
        {
          text: "Exactly. Since it's unlocked, the creator can withdraw all paired ETH at any moment. Combined with the 85% ownership concentration, this setup is highly indicative of an imminent \"Rug Pull\".",
        },
      ],
      [{ text: 'My recommendation: ' }, { text: 'Do not engage.', bold: true }],
    ],
  },
];
