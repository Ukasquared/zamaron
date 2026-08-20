# ZAMARON — Secure the Frontier

A comprehensive, dark-themed Web3 security platform that unifies **smart-contract auditing, threat
intelligence, governance, a learning academy, and operator administration** into a single
"operations hub" console.

> **Demo status.** This repository is a **frontend-only** product prototype. All screens are fully
> navigable and interactive, but the data behind them is **seeded demo data** persisted to
> `localStorage` — there is **no backend** yet. A complete, backend-ready API specification
> (including an OpenAPI document) lives in [`docs/`](./docs). See
> [Backend integration status](#backend-integration-status) below.

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Feature surface](#feature-surface)
- [Demo accounts & authentication](#demo-accounts--authentication)
- [Roles & permissions (RBAC)](#roles--permissions-rbac)
- [Route map](#route-map)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Data layer & persistence](#data-layer--persistence)
- [Testing](#testing)
- [Deployment](#deployment)
- [Backend integration status](#backend-integration-status)
- [Known limitations](#known-limitations)

---

## Overview

Zamaron presents itself as an institutional-grade smart-contract security product. The application
is organized around four personas, each with a dedicated console, plus shared "Threat Hub",
governance, and academy surfaces:

| Persona | Console | What they can do |
|---|---|---|
| **Client** | Client Portal | Request audits, track live engagement phases, review/triage findings, download final reports, manage a document vault, pay via escrow checkout |
| **Auditor** | Auditor Workspace | Claim engagements from a dispatch queue, use an AI forensic terminal and EVM bytecode disassembler, compete on a leaderboard |
| **Admin** | Admin Suite | Security logs & audit trail, security config, alert routing, course builder & content admin, token-risk calibration, user/protocol registry, API keys, payment gateways, billing, refunds |
| **Student** | Academy | Take security courses, complete lessons, sit graded assessments, earn certificates |

Marketing pages (home, solutions, pricing, support, catalog) are publicly accessible; everything
else is role-gated through a centralized RBAC system.

---

## Tech stack

| Layer | Choice |
|---|---|
| UI library | **React 18** (TypeScript, JSX) |
| Build tool | **Vite 5** |
| Routing | **react-router-dom v6** |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) + custom glassmorphism/"fresnel" design tokens |
| Icons | Material Symbols (via a custom `Icon` component) |
| Fonts | Space Grotesk (display), Manrope (body) |
| Utilities | `clsx` + `tailwind-merge` (via `lib/utils.ts`), custom markdown renderer |
| Data (mock) | In-memory seed data + `localStorage` persistence |
| Linting | ESLint 9 + typescript-eslint |
| Test harness | `tsx`-based scenario/contract runners (RBAC) |

There are **no runtime HTTP calls** — the mock "services" are synchronous and resolve against seed
data held in memory/`localStorage` (see [Data layer](#data-layer--persistence)).

---

## Feature surface

### Client Portal
- **Dashboard** — active engagements table, KPI cards, vulnerability triage feed.
- **Audit request wizard** — protocol metadata, repo + pinned commit hash, drag-and-drop file
  attachments, three service tiers.
- **Live audit tracker** — 4-phase pipeline (automated scan → AI summarize → manual verification →
  report anchoring) with per-phase inspectors and telemetry.
- **Dual-pane code review** — source alongside line-level vulnerability annotations.
- **Vulnerability triage** — severity classification, remediation guidance, notes, status updates.
- **Final report** — signed report with findings ledger, scorecard, SHA-256 anchor, print/PDF export.
- **Document vault** — categorized documents (reports/certificates/specs) with search + upload.
- **Checkout** — escrow settlement across USDC / ETH / wire rails, then launches the audit.

### Auditor Workspace
- **Dispatch queue** — filterable queue of engagements with claim/triage flow.
- **AI neural terminal** — conversational forensic assistant (mock responses).
- **Forensic suite** — hex bytecode disassembler + symbolic execution trace (real, pure client-side).
- **Auditor leaderboard** — XP, verified bugs, bounties.

### Threat Hub (shared)
- **Skynet dashboard** — global Z-score posture, pre-launch watchlist, live ecosystem monitoring.
- **Security leaderboard** — projects scored across six weighted dimensions with filtering/sorting.
- **Project profiles** — radar, tier badge, trust badges, monitors, audit history, token risk, incidents.
- **Incident monitor** — exploit/rugpull feed with severity filters and aggregates.
- **Whale alerts** — large-transfer surveillance feed.
- **Token risk analyzer** — address → risk indicator checks (honeypot, mint, blacklist, proxy, taxes).
- **Ecosystem health** — node latency/load telemetry.

### Governance & Profile
- **Proposals** — DAO proposal list with quorum bars and weighted voting.
- **Proposal detail** — vote FOR/AGAINST/ABSTAIN with voting power.
- **Profile** — credential vault, skill tree, activity ledger, mastery radar.

### Academy (LMS)
- **Course player** — markdown lessons, timestamps, curriculum sidebar, progress tracking.
- **Assessments** — graded quizzes with a 80% pass threshold.
- **Certificates** — issue-on-pass with verification hash and print/PDF export.

### Admin Suite
- **Security logs** — live audit trail + faceted "tactical" search, CSV export.
- **Security config** — FIDO2, IP whitelisting, circuit breaker, rate-limiting toggles.
- **Alert routing** — webhook/email/telegram/pager routes with severity thresholds.
- **Content administration** — course catalog (publish/archive/delete) + **Course Builder** (metadata,
  modules, lessons, markdown + video-timestamp editor).
- **Token risk editor** — manual overrides applied by the token analyzer.
- **Users & protocols** — operator registry (role/status/clearance) and watched-protocol registry.
- **Developers** — scoped API keys with rate limits, mint/revoke.
- **Billing** — transaction ledger, invoice view, statement CSV; **refunds** queue; **gateways** config.

---

## Demo accounts & authentication

Authentication is **mocked** for demonstration. On the login screen you select a **demo role**
(`CLIENT` / `AUDITOR` / `ADMIN`), and the email field auto-fills with that role's demo identity.

| Role | Email | Identity |
|---|---|---|
| CLIENT | `client@zamoron.io` | Jordan Vale |
| AUDITOR | `auditor@zamoron.io` (or `alex.chen@zamoron.io`) | Alex Chen |
| ADMIN | `admin@zamoron.io` | Kyrios Hale |
| STUDENT | `student@zamoron.io` | Riley Okonkwo |

> Any email + any password "succeeds": unknown emails are minted as a new **CLIENT** identity via
> the induction path. Passwords are **not** verified — this is a UI prototype, not an auth
> implementation. The login screen also shows **WebAuthn** and **Web3 wallet (SIWE)** tabs, which are
> currently illustrative panels.

Login also offers:
- **Operator induction** (`/auth/induction`) — register a name/email/password (mints a `CLIENT`).
- **Secure Gate** (`/auth/secure-gate`) — a 6-digit second-factor challenge. By design it **cannot**
  elevate role or clearance; any 6 digits complete the demo.

Session data is stored under `localStorage` key `zamaron_session` (see
[Data layer](#data-layer--persistence)).

---

## Roles & permissions (RBAC)

Route protection, navigation visibility, and service-layer authorization all resolve through a
single source of truth: [`src/auth/rbac.ts`](./src/auth/rbac.ts).

| Role | Permissions | Default landing |
|---|---|---|
| `CLIENT` | `client:read`, `client:write`, `academy:read`, `threat-hub:read`, `governance:read` | `/client/dashboard` |
| `AUDITOR` | `auditor:read`, `auditor:write`, `client:read`, `academy:read`, `threat-hub:read`, `governance:read` | `/auditor/queue` |
| `ADMIN` | all permissions (`*:read`, `*:write`) | `/admin/logs` |
| `STUDENT` | `academy:read`, `threat-hub:read`, `governance:read` | `/academy/learn/crypto-security-101` |

Access rules (abbreviated — full list in `rbac.ts`):

- `/client/*` → `CLIENT`, `ADMIN` (audit detail/review/triage/report + vault also allow `AUDITOR`)
- `/auditor/*`, `/leaderboard/auditors` → `AUDITOR`, `ADMIN`
- `/admin/*` → `ADMIN` only
- `/threat-hub`, `/governance`, `/academy`, `/profile`, `/leaderboard/security` → any authenticated role
- `/`, `/solutions/*`, `/pricing`, `/support`, `/catalog`, `/auth/*`, `/unauthorized` → public

**Security note:** the frontend enforces RBAC as UX, and service functions re-check permissions
(`src/services/authorization.ts`). A real backend must enforce these rules **server-side** — see the
[API specification](./docs/API-SPECIFICATION.md).

---

## Route map

```
/                                   Home (marketing)
/solutions/auditing                 Auditing methodology
/pricing                            Pricing matrix
/support                            Support + knowledge base + tickets
/catalog                            Master 47-screen index
/auth/login                         Terminal login
/auth/induction[(-signup)]          Operator induction
/auth/secure-gate                   2FA enclave
/unauthorized                       RBAC denial page

/client/dashboard                   Client console
/client/audits/new                  Audit request wizard
/client/audits/:id/status           Live audit tracker
/client/audits/:id/review           Dual-pane code review
/client/audits/:id/triage           Vulnerability triage
/client/audits/:id/report           Final report
/client/vault                       Document vault
/client/checkout                    Escrow checkout

/auditor/queue                      Auditor dispatch queue
/auditor/ai-terminal                AI forensic terminal
/auditor/forensics                  EVM bytecode disassembler
/leaderboard/auditors               Auditor leaderboard
/leaderboard/security               Security (ecosystem) leaderboard

/threat-hub/skynet                  Skynet dashboard
/threat-hub/ecosystem               Ecosystem health
/threat-hub/whales                  Whale alerts
/threat-hub/token-analyzer          Token risk analyzer
/threat-hub/leaderboard             Security leaderboard
/threat-hub/projects/:id            Project profile
/threat-hub/incidents               Incident monitor
/threat-hub/protocols/:id           → Token analyzer (alias)
/threat-hub/vaults                  → Document vault (alias)

/governance                         Proposals
/governance/proposals/:id           Proposal detail + voting
/profile/:id                        Operator profile

/academy/learn/:courseId            Course player
/academy/assessment/:id             Assessment quiz
/academy/certificate/:id            Certificate

/admin/logs                         Security logs
/admin/logs-tactical                Faceted log search
/admin/security-config              Security configuration
/admin/alerts                       Alert routing
/admin/content                      Content administration
/admin/course-builder[(-enhanced)]  Course builder (video-enhanced variant)
/admin/token-reports                Token risk overrides
/admin/users-protocols              Operator + protocol registry
/admin/developers-api               API keys
/admin/gateways                     Payment gateways
/admin/billing                      Billing history
/admin/invoices/:id                 Invoice
/admin/refunds                      Refund management
```

---

## Getting started

### Prerequisites

- **Node.js 18+** (20 LTS recommended)
- **npm** (or pnpm/yarn)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (binds 0.0.0.0)
npm run dev
```

Open the printed local URL (default `http://localhost:5173`). Pick a demo role on the login screen
and authenticate.

### Other scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (`--host 0.0.0.0`) |
| `npm run build` | Type-check (`tsc -b`) + production build (`vite build`) |
| `npm run preview` | Serve the production build (`--host 0.0.0.0`) |
| `npm run lint` | ESLint over the project |
| `npm run test:rbac` | Run the RBAC + service-authorization scenario suite |

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # static analysis
npm run test:rbac  # role/permission contract checks
```

---

## Project structure

```
zamaron/
├── docs/                       # API specification + OpenAPI (see below)
│   ├── API-SPECIFICATION.md
│   └── openapi.yaml
├── src/
│   ├── App.tsx                 # Route table (BrowserRouter)
│   ├── main.tsx                # Entry point
│   ├── index.css               # Tailwind + design tokens
│   ├── auth/                   # RBAC, route guards, nav, scenario tests
│   │   ├── rbac.ts             # Roles, permissions, ROUTE_ACCESS_RULES
│   │   ├── navigation.ts       # Role-aware sidebar sections
│   │   ├── ProtectedRoute.tsx  # Auth + role gate
│   │   ├── GuestRoute.tsx      # Login/induction guard
│   │   └── rbac.scenarios.ts   # Acceptance scenario runner
│   ├── components/             # UI, organized by domain
│   │   ├── ui/                 # Primitive components (Button, Card, Input…)
│   │   ├── shared/             # Cross-cutting (RadarChart, LiveLogStream…)
│   │   ├── layouts/            # Marketing/Auth/Dashboard shells
│   │   └── <domain>/           # admin, client, auditor, academy, security…
│   ├── context/
│   │   └── AuthContext.tsx     # Session provider + useAuth()
│   ├── data/                   # Seed data (courses, questions, security, content)
│   ├── hooks/                  # useLeaderboard, useIncidents, useTokenScan…
│   ├── lib/                    # evm disassembler, markdown, download, store
│   ├── mock/
│   │   └── data.ts             # Demo users, audits, findings, logs, proposals
│   ├── pages/                  # One folder per route domain
│   ├── services/               # Mock "backend" (see Data layer)
│   └── types/                  # Domain models (entities, ops, lms, security)
├── index.html
├── vite.config.(js|ts)         # Alias `@` → `src`, host 0.0.0.0
├── vercel.json                 # SPA rewrite → /index.html
├── tsconfig.json
└── package.json
```

**Path alias:** `@/*` maps to `src/*` (configured in `vite.config.ts` and `tsconfig.json`).

---

## Data layer & persistence

There is no backend. Each module under `src/services/` simulates one by reading **seed data** and
persisting mutations to `localStorage` (via `src/lib/persistentStore.ts`). The service functions
enforce permissions using `requirePermission(...)` so the boundary mirrors what a real API would do.

| Service | Backs | Persistence keys |
|---|---|---|
| `authService.ts` | login/register/session | `zamaron_session` |
| `auditService.ts` | audits + findings + checkout draft | `zamaron_audits_v1`, `zamaron_findings_v1`, session `zamaron_audit_draft` |
| `courseService.ts` | LMS courses (builder + catalog) | `zamaron_courses_v1` |
| `academyService.ts` | progress, assessments, certificates | `zamaron_academy_progress_v1`, `…_attempts_v1`, `…_certs_v1`, `…_questions_v1` |
| `adminService.ts` | logs, billing, operators, protocols, keys, alerts, gateways, refunds, token overrides, security config | `zamaron_logs_v1`, `zamaron_billing_v1`, `zamaron_operators_v1`, `zamaron_protocols_v1`, `zamaron_apikeys_v1`, `zamaron_alerts_v1`, `zamaron_gateways_v1`, `zamaron_refunds_v1`, `zamaron_token_reports_v1`, `zamaron_sec_config_v1` |
| `governanceService.ts` | proposals + votes | `zamaron_proposals_v1` |
| `vaultService.ts` | documents | `zamaron_vault_v1` |
| `supportService.ts` | knowledge base + tickets | `zamaron_tickets_v1` |
| `tokenScanService.ts` | token risk scan (fake) | — |
| `securityScoreService.ts` | scoring engine (pure) | — |
| `projectService.ts` / `incidentService.ts` | scored projects, incidents | — (reads `data/securityData.ts`) |

Reset all demo data by clearing the site's `localStorage` in the browser.

> **Important demo caveats.** The token analyzer derives "risk" deterministically from the address
> (no real bytecode analysis), and the security scores/incidents/whale alerts are fabricated
> illustrative data. The UI displays a **"DEMO DATA"** notice on those surfaces. These modules are
> explicitly marked for replacement by real backend/on-chain data.

---

## Testing

The repository ships an RBAC/authorization contract suite (no framework — plain TypeScript runners).

```bash
npm run test:rbac
```

This executes:

- `src/auth/rbac.scenarios.ts` — end-to-end acceptance scenarios (unauthenticated denial, per-role
  route access, direct-URL bypass protection, post-login routing).
- `src/services/authService.scenarios.ts` — service-layer scenarios.
- `src/services/authorization.contract.ts` — service-authorization checks (e.g. a `CLIENT` can read
  their own audits but not the auditor queue or security logs; `STUDENT` can read published courses
  but not manage them).

Each scenario prints pass/fail to the console; a non-zero exit code indicates a failure.

---

## Deployment

The app is a static SPA. `vercel.json` rewrites all routes to `/index.html`, so client-side routing
works on any static host.

```bash
npm run build          # outputs dist/
npm run preview        # local preview of dist/
```

Deploy the `dist/` folder (or the repo root on Vercel/Netlify with an SPA rewrite) to serve the app.

---

## Backend integration status

**No backend endpoints exist.** The mock services are the "backend" today. Two artifacts define the
target contract for a backend team:

- **[`docs/API-SPECIFICATION.md`](./docs/API-SPECIFICATION.md)** — a complete endpoint catalog
  grouped by feature (Authentication, Users, Audits, Billing, Vault, Governance, Academy, Admin,
  Security, Support), with per-endpoint method, purpose, auth, roles, request/response schemas,
  status codes, validation, and pagination. It also maps every mock/hard-coded data source to the
  endpoint that should replace it and enumerates inconsistencies/gaps between the frontend and a
  future backend.
- **[`docs/openapi.yaml`](./docs/openapi.yaml)** — the same contract as an OpenAPI 3.1 document.

Every endpoint in those documents is explicitly marked
**`REQUIRED BACKEND ENDPOINT — NOT CURRENTLY IMPLEMENTED`** — nothing is fabricated documentation
for a live API.

---

## Known limitations

- **No real authentication** — roles come from demo email mapping; passwords aren't verified;
  WebAuthn/wallet tabs are visual only.
- **No backend / network layer** — all data is seed + `localStorage`; refreshes can lose nothing but
  are per-browser and per-device.
- **Fake analytics** — security scores, token scans, whale alerts, and incidents are simulated and
  must not be used for real security or investment decisions.
- **File uploads are name-only** — the wizard and vault capture filenames, not bytes.
- **Exports are client-side** — PDFs use `window.print()`; CSVs are generated in the browser.
- **Orphaned components** — several legacy component folders (`analytics`, `risk-report`,
  `scam-detector`, `scanner`, `assessment`, `certificate`, `content`, `courses`, `sections`, and
  parts of `security`/`admin`/`ecosystem`) are not wired into any route in `App.tsx`; they remain in
  the tree for reference only.
- **Stringly-typed money** — billing amounts are display strings; the API spec recommends integer
  minor units.

---

## License

No license file is currently included in this repository. All rights are reserved unless a license
is added by the project owner.