import type { AssessmentQuestion, ManagedCourse } from '@/types/lms';

export const SEED_COURSES: ManagedCourse[] = [
  {
    id: 'crs-101',
    slug: 'crypto-security-101',
    title: 'Crypto Security 101: Identifying Rug Pulls & Malicious Bytecode',
    description:
      'Master the essential patterns of on-chain scams, hidden mint functions, liquidity drain mechanisms, and bytecode analysis.',
    category: 'SMART_CONTRACT',
    difficulty: 'BEGINNER',
    instructor: 'Alex Chen, Zamaron Academy',
    thumbnail: 'security',
    xpReward: 500,
    status: 'PUBLISHED',
    createdAt: '2026-07-01T00:00:00.000Z',
    updatedAt: '2026-08-16T00:00:00.000Z',
    publishedAt: '2026-07-04T00:00:00.000Z',
    modules: [
      {
        id: 'mod-101-1',
        title: 'Module 1: Introduction to Smart Contract Scams',
        subtitle: 'Threat landscape and attacker economics',
        order: 1,
        lessons: [
          {
            id: 'les-101-1',
            title: 'Why DeFi Attacks Scale',
            durationMinutes: 12,
            instructor: 'Alex Chen',
            takeaways: 'Understand attacker incentives, common entry points, and why public bytecode is both a feature and a weapon.',
            content:
              '# Why DeFi Attacks Scale\n\nPublic, composable smart contracts let anyone inspect logic — and anyone to fork a profitable exploit.\n\n**Key idea:** attackers do not need zero-days if they can reuse known patterns (hidden mint, honeypot transfer tax, fake lock).\n\n- Permissionless deployment\n- Instant liquidity\n- Social engineering around "verified" tokens\n\n> Warning: A verified source does not prove the deployed bytecode matches the marketing story.',
            videoUrl: 'https://example.com/academy/crs-101/why-defi-attacks-scale',
            timestamps: [
              { id: 'ts-101-1a', time: '00:45', label: 'Attacker economics' },
              { id: 'ts-101-1b', time: '06:10', label: 'Public bytecode paradox' },
            ],
          },
          {
            id: 'les-101-2',
            title: 'Anatomy of a Launch Scam',
            durationMinutes: 12,
            instructor: 'Alex Chen',
            takeaways: 'Map the typical 24-hour lifecycle of a malicious token launch.',
            content:
              '# Anatomy of a Launch Scam\n\n1. Deploy token with privileged owner mint.\n2. Seed a thin liquidity pool.\n3. Amplify social proof.\n4. Drain LP or disable sells.\n\nLook for `owner()`, `setTax`, `excludeFromFee`, and unlock timestamps that are not actually enforced.',
            timestamps: [],
          },
        ],
      },
      {
        id: 'mod-101-2',
        title: 'Module 2: Identifying Rug Pulls & Liquidity Drain',
        subtitle: 'Liquidity locks, tax overrides, stealth mint',
        order: 2,
        lessons: [
          {
            id: 'les-101-3',
            title: 'Identifying Rug Pulls & Liquidity Drain',
            durationMinutes: 38,
            instructor: 'Alex Chen',
            takeaways:
              'Learn how malicious token creators embed conditional transfer tax overrides, stealth owner mint privileges, and fake liquidity lockup contracts.',
            content:
              '# Identifying Rug Pulls & Liquidity Drain\n\nIn this module, we examine how malicious token creators embed **conditional transfer tax overrides**, stealth owner mint privileges, and fake liquidity lockup contracts.\n\n## Checks before you connect a wallet\n\n1. Confirm LP lock address is a known locker, not an EOA.\n2. Inspect `transfer` / `_transfer` for hidden tax branches.\n3. Search for `mint`, `setMaxTx`, `blacklist`, and `enableTrading`.\n4. Compare holder concentration of the top 10 wallets.\n\n```solidity\nfunction _transfer(address from, address to, uint256 amount) internal {\n    if (!isExcluded[from]) {\n        amount = amount - (amount * hiddenTax) / 100;\n    }\n    super._transfer(from, to, amount);\n}\n```\n\n> Warning: Never treat a screenshot of a lock NFT as proof. Resolve the locker contract on-chain.',
            videoUrl: 'https://example.com/academy/crs-101/rug-pulls',
            timestamps: [
              { id: 'ts-101-3a', time: '02:15', label: 'Fake lock contracts' },
              { id: 'ts-101-3b', time: '14:40', label: 'Hidden transfer tax' },
              { id: 'ts-101-3c', time: '27:05', label: 'Stealth mint privileges' },
            ],
          },
        ],
      },
      {
        id: 'mod-101-3',
        title: 'Module 3: Bytecode Disassembly & Hidden Mint Logic',
        subtitle: 'Read what Solidity hides',
        order: 3,
        lessons: [
          {
            id: 'les-101-4',
            title: 'Reading Privileged Opcodes',
            durationMinutes: 45,
            instructor: 'Alex Chen',
            takeaways: 'Use disassembly to find mint selectors and owner-only branches that source may obfuscate.',
            content:
              '# Bytecode Disassembly & Hidden Mint Logic\n\nVerified source can still hide intent with inheritance, assembly, and delegatecall proxies.\n\n**Practice:** locate the 4-byte selector for `mint(address,uint256)` (`0x40c10f19`) and confirm who can call it.\n\n- PUSH4 + EQ + JUMPI is the usual dispatcher pattern\n- SLOAD of owner slot before JUMPI is a privilege check\n- Unexpected SELFDESTRUCT or DELEGATECALL is a red flag',
            timestamps: [{ id: 'ts-101-4a', time: '08:00', label: 'Selector dispatcher' }],
          },
        ],
      },
      {
        id: 'mod-101-4',
        title: 'Module 4: Reentrancy & Cross-Contract Calls',
        subtitle: 'Checks-effects-interactions',
        order: 4,
        lessons: [
          {
            id: 'les-101-5',
            title: 'Classic and Cross-Function Reentrancy',
            durationMinutes: 50,
            instructor: 'Alex Chen',
            takeaways: 'Identify CEI violations and apply nonReentrant guards without wasting gas.',
            content:
              '# Reentrancy & Cross-Contract Calls\n\nThe classic bug: update state **after** an external `call`.\n\n```solidity\nfunction withdraw(uint256 amount) public {\n    require(balances[msg.sender] >= amount);\n    (bool sent, ) = msg.sender.call{value: amount}("");\n    require(sent);\n    balances[msg.sender] -= amount; // too late\n}\n```\n\nRemediation: deduct first, then interact, and add `nonReentrant`.',
            timestamps: [],
          },
        ],
      },
    ],
  },
  {
    id: 'crs-201',
    slug: 'advanced-evm-forensics',
    title: 'Advanced EVM Forensic Analysis & Reentrancy Exploitation',
    description:
      'Deep dive into assembly, opcode execution steps, memory layout manipulation, and cross-function reentrancy vectors.',
    category: 'FORENSICS',
    difficulty: 'ADVANCED',
    instructor: 'Dr. Elena Rostova',
    thumbnail: 'memory',
    xpReward: 1200,
    status: 'PUBLISHED',
    createdAt: '2026-07-12T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z',
    publishedAt: '2026-07-20T00:00:00.000Z',
    modules: [
      {
        id: 'mod-201-1',
        title: 'Module 1: Memory, Calldata, Storage',
        subtitle: 'Layout and aliasing',
        order: 1,
        lessons: [
          {
            id: 'les-201-1',
            title: 'EVM Memory Model',
            durationMinutes: 40,
            instructor: 'Dr. Elena Rostova',
            takeaways: 'Know free-memory pointer conventions and how calldata is sliced.',
            content:
              '# EVM Memory Model\n\nMemory is a byte array. Slot `0x40` stores the free memory pointer, usually initialized to `0x80`.\n\n- `MSTORE` writes 32 bytes\n- `CALLDATALOAD` reads a word from transaction data\n- Storage is a 2^256 sparse map — packing matters for collisions',
            timestamps: [],
          },
        ],
      },
      {
        id: 'mod-201-2',
        title: 'Module 2: Cross-Function Reentrancy',
        subtitle: 'Read-only and cross-contract variants',
        order: 2,
        lessons: [
          {
            id: 'les-201-2',
            title: 'Read-Only Reentrancy',
            durationMinutes: 35,
            instructor: 'Dr. Elena Rostova',
            takeaways: 'Views can be unsafe if they read mid-update vault state.',
            content:
              '# Read-Only Reentrancy\n\nA vault that updates balances after an external call can be observed by another protocol via a `view` function during the callback.\n\nMitigation: use a reentrancy lock that also reverts on view entry, or snapshot values before interaction.',
            timestamps: [],
          },
        ],
      },
    ],
  },
  {
    id: 'crs-301',
    slug: 'formal-verification-certora',
    title: 'DeFi Protocol Architecture & Formal Verification with Certora',
    description:
      'Write mathematical specifications to prove smart contract correctness and eliminate zero-day vulnerabilities.',
    category: 'DEFI_SECURITY',
    difficulty: 'ELITE',
    instructor: 'Marcus Kane',
    thumbnail: 'terminal',
    xpReward: 2000,
    status: 'PUBLISHED',
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-12T00:00:00.000Z',
    publishedAt: '2026-08-12T00:00:00.000Z',
    modules: [
      {
        id: 'mod-301-1',
        title: 'Module 1: Specs and Invariants',
        subtitle: 'From English to CVL',
        order: 1,
        lessons: [
          {
            id: 'les-301-1',
            title: 'Writing Your First Invariant',
            durationMinutes: 42,
            instructor: 'Marcus Kane',
            takeaways: 'Express solvency and access-control as machine-checkable rules.',
            content:
              '# Writing Your First Invariant\n\nAn invariant is a property that must hold after every public state transition.\n\nExample: `sum(balances) == totalSupply`.\n\nCVL lets you quantify over users and require the rule after arbitrary method sequences.',
            timestamps: [],
          },
        ],
      },
    ],
  },
];

export const SEED_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q-101-1',
    courseId: 'crs-101',
    prompt: 'Analyze the following smart contract snippet for reentrancy vulnerabilities:',
    codeSnippet: `function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient");
    (bool sent, ) = msg.sender.call{value: amount}("");
    require(sent, "Failed");
    balances[msg.sender] -= amount;
}`,
    options: [
      { id: 'a', text: 'The contract is safe because it verifies the balance before making the transfer with require.' },
      { id: 'b', text: 'The contract is vulnerable to reentrancy because the state is deducted after the external call.' },
      { id: 'c', text: 'The contract will fail to compile due to a missing visibility specifier.' },
      { id: 'd', text: 'The contract is immune because call() forwards a 2300 gas stipend cap.' },
    ],
    correctOptionId: 'b',
    explanation: 'This is a classic CEI violation. The external call happens before the balance update, enabling recursive withdraws.',
  },
  {
    id: 'q-101-2',
    courseId: 'crs-101',
    prompt: 'Which on-chain check best proves a liquidity lock is real?',
    options: [
      { id: 'a', text: 'A screenshot of a lock NFT posted by the team.' },
      { id: 'b', text: 'Resolving the locker contract, owner of the LP token, and unlock timestamp on-chain.' },
      { id: 'c', text: 'The token contract being verified on a block explorer.' },
      { id: 'd', text: 'A high 24-hour trading volume.' },
    ],
    correctOptionId: 'b',
    explanation: 'Only the locker contract, LP ownership, and unlock parameters on-chain are authoritative.',
  },
  {
    id: 'q-101-3',
    courseId: 'crs-101',
    prompt: 'A token’s `_transfer` excludes the owner from tax. Why is this dangerous?',
    options: [
      { id: 'a', text: 'It always makes buys revert.' },
      { id: 'b', text: 'The owner can sell without tax while retail cannot, enabling stealth extraction.' },
      { id: 'c', text: 'It prevents the contract from compiling with optimizer on.' },
      { id: 'd', text: 'It automatically renounces ownership.' },
    ],
    correctOptionId: 'b',
    explanation: 'Owner tax exclusion is a common honeypot / extraction primitive.',
  },
  {
    id: 'q-101-4',
    courseId: 'crs-101',
    prompt: 'Which 4-byte selector should you hunt for when looking for a hidden mint?',
    options: [
      { id: 'a', text: '0xa9059cbb (transfer)' },
      { id: 'b', text: '0x70a08231 (balanceOf)' },
      { id: 'c', text: '0x40c10f19 (mint(address,uint256))' },
      { id: 'd', text: '0x18160ddd (totalSupply)' },
    ],
    correctOptionId: 'c',
    explanation: 'mint(address,uint256) is 0x40c10f19. Presence plus an owner check is a privilege to review.',
  },
  {
    id: 'q-101-5',
    courseId: 'crs-101',
    prompt: 'What is the correct Checks-Effects-Interactions order for a withdraw?',
    options: [
      { id: 'a', text: 'Interact, then check, then update state.' },
      { id: 'b', text: 'Check preconditions, update state, then interact with the external contract.' },
      { id: 'c', text: 'Update state, interact, then check the return value only.' },
      { id: 'd', text: 'Interact twice to confirm the transfer.' },
    ],
    correctOptionId: 'b',
    explanation: 'CEI plus a reentrancy guard is the standard remediation.',
  },
  {
    id: 'q-201-1',
    courseId: 'crs-201',
    prompt: 'What does the word at memory 0x40 conventionally store?',
    options: [
      { id: 'a', text: 'The owner address' },
      { id: 'b', text: 'The free memory pointer' },
      { id: 'c', text: 'The current msg.value' },
      { id: 'd', text: 'The chain id' },
    ],
    correctOptionId: 'b',
    explanation: 'Solidity keeps the free memory pointer at 0x40, typically starting at 0x80.',
  },
  {
    id: 'q-201-2',
    courseId: 'crs-201',
    prompt: 'Read-only reentrancy is dangerous because:',
    options: [
      { id: 'a', text: 'It always drains ETH directly from the vault.' },
      { id: 'b', text: 'Another protocol can read inconsistent mid-update state via a view.' },
      { id: 'c', text: 'It disables JUMPDEST validation.' },
      { id: 'd', text: 'It only affects constructors.' },
    ],
    correctOptionId: 'b',
    explanation: 'The callback observes stale or mid-update vault math used by oracles and AMMs.',
  },
  {
    id: 'q-201-3',
    courseId: 'crs-201',
    prompt: 'Which opcode pair typically implements a function-selector dispatcher?',
    options: [
      { id: 'a', text: 'CREATE + SELFDESTRUCT' },
      { id: 'b', text: 'PUSH4 + EQ + JUMPI' },
      { id: 'c', text: 'SSTORE + LOG0' },
      { id: 'd', text: 'MSIZE + GAS' },
    ],
    correctOptionId: 'b',
    explanation: 'The compiler compares calldata selectors with PUSH4/EQ and jumps to the matching body.',
  },
  {
    id: 'q-301-1',
    courseId: 'crs-301',
    prompt: 'A useful solvency invariant for an ERC-20 vault is:',
    options: [
      { id: 'a', text: 'Every user can mint freely' },
      { id: 'b', text: 'sum of balances equals totalSupply after every public method' },
      { id: 'c', text: 'block.timestamp is always even' },
      { id: 'd', text: 'msg.sender equals tx.origin' },
    ],
    correctOptionId: 'b',
    explanation: 'Conservation of supply is the canonical token invariant.',
  },
  {
    id: 'q-301-2',
    courseId: 'crs-301',
    prompt: 'Formal verification complements audits because it:',
    options: [
      { id: 'a', text: 'Replaces the need for any human review' },
      { id: 'b', text: 'Mathematically checks specified properties across arbitrary sequences of calls' },
      { id: 'c', text: 'Automatically writes the contract for you' },
      { id: 'd', text: 'Only works on unverified bytecode' },
    ],
    correctOptionId: 'b',
    explanation: 'Specs are exhaustive for stated properties; they do not invent unspecified requirements.',
  },
];
