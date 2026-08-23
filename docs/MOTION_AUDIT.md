# Zamaron Motion Audit — thestart.com.au Reference Analysis

Date: 2026-08-23
Reference: https://thestart.com.au/ (visual/interaction reference only — no code/branding copied)
Goal: Reproduce TYPES OF INTERACTIONS at Zamaron premium level, preserving Web3/security identity.

## 1. Reference Website Interaction Language (Observed)

- **Scroll-driven depth:** Layers move at different speeds (image foreground fastest, ornamental 3D floats slowest). Content stays legible; background decorative elements provide parallax. Sections pin or gently scale as they enter.
- **Choreographed reveals:** Headlines/blocks do not just fade — they combine translateY (≈16-20px) + opacity + subtle scale (0.97→1) and occasional blur (6-10px→0) and clipping masks. Stagger is deliberate (80-120ms per item within a grid).
- **Image transitions:** Hero/product imagery starts slightly scaled (1.04–1.07) and masked, settling to 1.0 on reveal. Overlapped with grid or gradient overlays for depth.
- **Hover sophistication:** Cards lift (translateY -2 to -4px), show cursor-following glow, soft border/gleam shimmer. No bounce; easing is Expo-ish `cubic-bezier(0.16,1,0.3,1)`.
- **Continuous motion:** Marquee uses duplicated flex track (translateX 0→-50%) linear infinite with side mask so cards slip under veil; hover pauses.
- **3D/WebGL hints:** Floating 3D renders drift slowly (floatSlow 4s), orbs breathe. Used sparingly for delight, never competing with copy.
- **Page-load:** Veil fades, badge → headline → copy → CTA → stats cascade, not simultaneous.
- **Counters:** Large numbers count up when scrolled into view.

## 2. Zamaron Landing Inspection (Pre-implementation)

**Files inspected:** `src/pages/marketing/HomePage.tsx`, `src/components/ui/Reveal.tsx`, `AnimatedCounter.tsx`, `Marquee.tsx`, `GlowBackground.tsx`, `GlassCard.tsx`, `StatCard.tsx`, `src/index.css`.

Existing strengths: `Reveal` (fade+rise 18px), `AnimatedCounter` (cubicOut, IO-triggered), `Marquee` (duplicated, slow), `GlowBackground` (static orbs + blurred web3 image + grid), `GlassCard` (fresnel, hover lift). CSS already had glass tokens, `prefers-reduced-motion` kill-switch.

Gaps vs reference:
- `Reveal` only rise+opacity — no scale/blur/clip variants → flat choreography.
- Parallax absent — all layers static → no depth as user scrolls.
- Hover: GlassCard lift only — no cursor spotlight or gentle tilt, button shimmer missing.
- Blockchain viz static image — no lightweight living network to convey “Web3/security”.
- Marquee durations hard-coded in CSS, no mask performance hints, could jump if content width changes.
- Page-load okay (delays 0/90/180/260) but not differentiated by variant (all same rise) → less premium.

## 3. Decisions: Where Motion Is Appropriate (To Keep Zamaron Calm, Not Demo)

### Scroll-driven motion
- **Decorative only:** Hero image (`speed -0.04`), hero orb cluster (`-0.11, -0.065, -0.09`), grid (`+0.02`), section radial glows (`-0.05 to -0.06`). Clamp 24-44px. Text/copy never parallax.
- **Sections transform via Reveal:** Not via scroll listener — IntersectionObserver once. Scale/blur/clip give depth without continuous scroll jank.

### Section reveals (polished, not basic fade-ins)
- `Reveal` now supports `variant`: `fade | rise | scale | blur | clip | hero` (opacity + translate + scale + blur + clipPath). Durations 680-860ms, same Expo easing. `hero` = blur 8px + scale 0.985 + rise 18px.
- Stagger via `delay` prop on each grid child (e.g., stats 70ms apart, methodology 85ms, pillars 110ms).

### Image/content transitions
- Hero image wrapped in `Parallax` + `BlockchainViz` canvas overlay (new). Image itself stays at 20% opacity blur 3px with radial mask, scale 1.02 settled. Grid overlay shifts subtly (+0.02) for layered depth.
- `img-reveal` CSS utility available for future pages (scale 1.06→1).

### Hover states (important elements only)
- **Cards/stats/security elements:** `GlassCard` `spotlight` (cursor radial 560px at --mx/--my, opacity 0→1 on enter) + optional `tilt` (≤4.6° rotateX/Y + translateY -2px, rAF, disabled on coarse pointer/reduced motion). Applied to: methodology & pillar cards (`tilt` true), stats/statistics (`spotlight` true, tilt false to keep calm).
- **Buttons:** `btn-shimmer` diagonal gleam (translateX -108%→108% on hover) + `hover:-translate-y-px` + stronger shadow.
- **Marquee cards:** `hover:-translate-y-0.5` + border/cyan glow + icon scale.
- **StatCard icons:** `group-hover:scale-[1.04]` + border glow.

### Marquee
- Kept for `trustedNetworks` institutional logos only. Improved seamlessness: duplicated flex track (primary + aria-hidden clone) → true -50% loop, `will-change: transform`, `mask-image` 6%→92%, linear 72s slow, `hover:[animation-play-state:paused]`.

### Web3 / Security Visualization
- **Hero only:** New `BlockchainViz` canvas (28 nodes default, 18 on mobile/low, 44 high). Links draw when <190px, alpha 0.18. Packets travel along edges, nodes pulse (glow 18px, core 3.6-5.2px, primary nodes have cyan border). Runs throttled 44fps, ResizeObserver, DPR capped 1.75. Respects `prefers-reduced-motion` → static frame; on mobile/low it skips packet dots.
- Not added elsewhere to avoid “3D everywhere” distraction. Remaining glows are CSS blurs, no WebGL.

### Page-load experience
- Hero cascade: badge `blur` 0ms → headline `hero` 85ms → subtitle `rise` 180ms → CTA `rise` 260ms → stats `scale` 380/460/540/620ms. Progressive, not simultaneous, fast enough to feel interactive (≈680-860ms each).

### Animated statistics
- Already correct: `AnimatedCounter` cubicOut 1800ms, IO threshold 0.15, once, respects reduced motion. Used in `StatCard` (numericValue) and statistic grid (6 cards). Values preserved: 3850+, 8940, $64.2B, 98.4%, 128 Nodes, 12ms.

## 4. Technical Choices

- No GSAP/ScrollTrigger: native `IntersectionObserver` + single passive scroll listener per parallax instance + rAF gives same sophistication with smaller bundle, GPU-only props.
- No Three.js: Canvas 2D sufficient for elegant network; keeps main thread <5ms/frame.
- Reusable primitives: `usePrefersReducedMotion`, `useParallax`, `useInViewOnce`, `useSpotlight`, `Parallax`, `BlockchainViz`, `ScrollProgress`, `TiltCard`, upgraded `Reveal`/`GlassCard`. No duplicated animation logic; existing components reused/expanded.
- CSS: `transform` + `opacity` + `filter:blur` + `clip-path` only; `will-change` hints; global `prefers-reduced-motion` disables all transforms/animations.
- Performance: clamp parallax drift, throttle canvas, `pointer: coarse` disables tilt, mobile reduces node count, passive listeners.

## 5. Implementation Checklist vs Spec

- [x] Scroll-driven motion (subtle, readable)
- [x] Smooth section reveals (opacity/translate/scale/blur/clip, choreographed)
- [x] Image/content transitions (scale/clip/layered)
- [x] Hover states (spotlight/tilt/shimmer/grow)
- [x] Marquee seamless continuous
- [x] Web3 viz lightweight canvas in hero only
- [x] Page-load staggered
- [x] Animated counters on in-view
- [x] Premium/smooth/deliberate, no bounce/random/distracting, reduced-motion respected
- [x] Reusable hooks/components, no duplication, CSS transforms, no unnecessary libs

## 6. How to Verify

```bash
./node_modules/.bin/tsc -b
npm run build
```

Manual: hero layers drift at different speeds on scroll, section cards enter with scale/blur, hover shows spotlight following cursor + subtle tilt (desktop only), marquee scrolls infinitely without jump and pauses on hover, hero canvas shows faint cyan network with traveling dots, counters count when cards enter viewport, hero elements cascade on reload, no motion when OS “Reduce motion” enabled.
