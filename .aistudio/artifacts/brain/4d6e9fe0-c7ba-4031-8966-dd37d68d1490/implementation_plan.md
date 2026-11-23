# Pamidor-Grade Interactions & Scroll Motion Implementation Plan

This plan upgrades **Janindu Dilshan De Alwis’s** portfolio with the complete interaction and scroll-choreography suite from `pamidordesign.co`—including the fullscreen letter-reveal preloader, Lenis inertia smooth scrolling, scroll-linked typography and layout reveals, diagonal mask-wipe hero trail, and footer `clip-path` expansion.

---

### User Review & Critical Decisions

> [!IMPORTANT] All interactive direction decisions from the clarification step are locked in and reflected across every section below.

- **Confirmed Decision 1 — Full Pamidor Preloader Curtain**: Launch with a fullscreen letter-reveal curtain displaying **JANINDU** + an animated cycling project preview chip + **ALWIS**, exiting cleanly into the 3D perspective hero entrance.
- **Confirmed Decision 2 — Lenis Inertia Smooth Scroll**: Wire Lenis smooth-scroll physics across the document with scroll-container isolation on the fullscreen navigation drawer so wheel/trackpad momentum drives all scroll-linked animations smoothly.
- **Confirmed Decision 3 — Full Scroll & Pointer Interaction Suite**: Enable all four confirmed interaction layers—sticky statement character wave and skillset scroll stagger, footer `clip-path` inset scroll reveal, diagonal mask-wipe hero mouse trail, and staggered tomato-red (`#D12424`) hover character waves across titles and buttons.
- **Confirmed Decision 4 — Kinetic Letter Treatment**: Keep the signature expanding **DOOR** animation inside the dark `OPEN THE DOOR` contact card while giving **Janindu De Alwis** a crisp 3D perspective reveal in the hero.

---

### 1. Overview & Core Concept

- **What It Does**: Replaces static section transitions with a cohesive, 60fps compositor-driven interaction engine modeled directly after `pamidordesign.co`, synchronizing pointer input, Lenis scroll momentum, and viewport geometry.
- **Target Audience / Persona**: Engineering recruiters, technical leads, and internship coordinators evaluating Janindu’s frontend, mobile, AI, and IoT engineering craft.
- **Key Value**: Demonstrates production-grade UI engineering precision—respecting `prefers-reduced-motion`, GPU-composited transforms, and accessible keyboard/touch fallbacks—while showcasing Janindu’s real CV projects.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Arrival Curtain → 3D Hero Entrance**: On initial visit, masked letter blocks rise into place (`JANINDU` · cycling project thumbnail chip · `ALWIS`), hold briefly while cycling through Janindu’s four builds, then slide upward out of clip masks—triggering the 3D `rotateX(44deg)` hero text settle and architectural portrait panel tilt.
  2. **Pointer Exploration in Hero**: Moving a mouse across the hero architectural card spawns up to four concurrent trail cards that reveal and vanish via diagonal `linear-gradient` CSS mask wipes (`mask-position` animation).
  3. **Scroll-Linked Bio & Dual Marquee**: Entering the statement section pins the editorial bio over `135vh` of scroll travel, illuminating every character from muted ink (`rgba(10,10,10,0.2)`) through a `#D12424` flash to solid `#0A0A0A` ink, followed by dual counter-scrolling technology marquees.
  4. **Selected Projects Accordion & Scroll Focus**: Hovering, focusing, or scrolling through **BoardLK**, **Agent MedLink**, **Live Crowds**, and **Smart Helmet** smoothly expands the active project row, lights its title in `#D12424`, reveals `ROLE / TIMELINE / YEAR / TEAM`, and previews its cover media before opening the full case study.
  5. **Skillset Scroll Stagger & Floating Hover Preview**: Scrolling into the dark `#0D0D0B` skillset section staggers rows `01`–`04` into alignment; hovering any row dims sibling rows and tracks a floating visual preview beside the pointer on desktop.
  6. **Footer Clip-Path Reveal**: As the user reaches the bottom of the contact section, the dark `#0D0D0B` footer smoothly unclips from a framed inset (`inset(5% 7% 0% 7%)`) to full viewport width using cubic ease-out scroll progress.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Swiss editorial contrast with kinetic typography and tactile dark/light polarity.
  - *Color Palette*: Warm stone canvas (`#EFEEEB`), primary ink (`#0A0A0A`), muted gray (`#6B6862`), hairline rules (`#CCC9C4`), tomato-red interactive accent (`#D12424`), and deep obsidian night surfaces (`#0D0D0B` with `#BFBAB2` / `#9E9991` / `#918E89`).
  - *Typography*: **Funnel Display** (display & prose), **Archivo** (discipline frames & uppercase micro-labels), and **Space Grotesk** (indices, tabular metrics, & stack marks), scaled proportionally via `--px`.

- **Interactive Feedback & Motion**:
  - Custom pointer follower that contracts on `pointerdown` (`data-cursor="down"`), expands on interactive targets, and inverts automatically over `[data-cursor-invert="true"]` dark surfaces.
  - `IntersectionObserver` scroll-reveal (`waiting` → `shown`) and 900ms cubic ease-out numeric count-ups on hero/case-study metrics.
  - Full `prefers-reduced-motion` bypass ensuring instant content availability.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Smooth Scroll Engine**
  - *Chosen Approach*: Integrate `lenis` in a dedicated root scroll controller that drives a single shared `requestAnimationFrame` loop and broadcasts scroll updates, while marking scrollable overlays with `data-lenis-prevent`.
  - *Why*: Eliminates wheel-tick jitter during the sticky `135vh` character-wave scroll, skillset stagger, and footer `clip-path` inset interpolation.
  - *Alternatives Considered*: Native CSS `scroll-behavior: smooth` alone lacks momentum damping during continuous scroll-progress scrub animations.

- **Decision 2 — Compositor-Only Scroll & Mask Animations**
  - *Chosen Approach*: Animate `transform`, `opacity`, `clip-path`, and CSS `mask-position` (via Web Animations API) rather than layout properties (`height`, `top`, `margin`).
  - *Why*: Preserves 60fps performance across high-DPI displays and avoids layout thrashing during rapid scroll or mouse-trail spawning.

- **Decision 3 — Preloader Replay Policy**
  - *Chosen Approach*: Play the full letter-reveal curtain once per initial page load (with a fast `Esc` or click skip affordance and instant bypass under `prefers-reduced-motion`).
  - *Why*: Delivers the exact signature `pamidordesign.co` opening choreography without trapping keyboard or returning users.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Root Application Shell                           │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌───────────────┐  │
│  │  Lenis Scroll Engine │  │  Preloader Curtain   │  │ Custom Cursor │  │
│  │  (rAF + Scroll Sync) │──│  (loading → ready)   │  │ (invert/down) │  │
│  └──────────┬───────────┘  └──────────┬───────────┘  └───────────────┘  │
└─────────────┼─────────────────────────┼─────────────────────────────────┘
              ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         Viewport Choreography                           │
│                                                                         │
│  Hero 3D Entrance ──► Diagonal Mask-Wipe Mouse Trail (4-slot pool)      │
│         │                                                               │
│         ▼                                                               │
│  Sticky Statement Wave (135vh travel → char-by-char #D12424 flash)      │
│         │                                                               │
│         ▼                                                               │
│  Selected Projects (scroll-focus + hover wave + accordion metadata)     │
│         │                                                               │
│         ▼                                                               │
│  Credentials & Lab (IntersectionObserver reveal + staggered columns)    │
│         │                                                               │
│         ▼                                                               │
│  Skillset (scroll-staggered rows + floating pointer preview card)       │
│         │                                                               │
│         ▼                                                               │
│  Contact Card (expanding DOOR kinetic type) ──► Footer (clip-path open) │
└─────────────────────────────────────────────────────────────────────────┘
```

- **State & Motion Mapping**:
  - `introState` (`'in' | 'out' | 'done'`): Controls `data-loading="true"` on `<html>`; clearing it triggers all Hero 3D CSS transitions simultaneously.
  - `scrollProgress` hooks: Read element `getBoundingClientRect()` inside throttled `requestAnimationFrame` callbacks synchronized with Lenis scroll events for the Statement character wave, Skillset row stagger, and Footer `clip-path` inset.
  - `trailPool`: Fixed 4-item recycled DOM pool using `Element.animate()` on `maskPosition` and `opacity` so rapid cursor sweeps never bloat the DOM.
  - `skillsetHover` & `pointerCoords`: Tracks active row index and interpolated `(x, y)` coordinates for the desktop floating preview card.
