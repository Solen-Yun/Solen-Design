# Dark Mode — Style Reference

> One blue on a deep slate ground; layers are explained by inner glow, not by drop shadows.

**Theme:** dark

Dark mode is not white inverted — it is a rebuilt luminance order. The deepest layer is #0f172a (never pure black; pure black kills the shadows), and each level above it brightens by only 4% to 6%, three tiers at most. Borders are 1px white at 6% to 10%, and it is the border that separates regions, not the shadow. Every glow points inward: a button carries an inset white highlight along its top edge, mimicking light rising from the screen itself — that is the honest physics of a dark interface. The accent is a single blue; everything else (green, amber, red) exists only as state.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Slate | `#0f172a` | `--color-deep-slate` | Page base, the deepest layer on the site. It replaces pure black so shadows have somewhere to land. |
| Slate 800 | `#1e293b` | `--color-slate-800` | Cards and panels. 4% brighter than the base; the primary carrying layer. |
| Slate 700 | `#334155` | `--color-slate-700` | Overlays and hover states. The third tier — no more are added above it. |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | Primary actions, links and selected states. On a dark base it needs one step of extra brightness to stay readable. |
| State Green | `#22c55e` | `--color-state-green` | Success and online, as a 15% ground with solid text. |
| State Amber | `#f59e0b` | `--color-state-amber` | Warnings and pending, appearing only on icons and badges. |
| State Red | `#ef4444` | `--color-state-red` | Errors and deletion; its presence always means a cost. |

## Typography

### Inter — the only font on the site. On a dark base the body needs a looser line height (1.6) and a slightly lower maximum weight to avoid halos.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 30, 40, 60
- **Line height:** 1.1 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 60px | 1.1 | -0.02em | `--text-display` |
| heading-lg | — | 700 | 40px | 1.15 | -0.015em | `--text-heading-lg` |
| heading | — | 600 | 30px | 1.2 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| badges | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Primary Button

**Role:** primary action button

Primary blue fill, white text, 8px radius, no border. 14px type, weight 500, padding 8px 16px. The core detail is the top-edge inner highlight: inset 0 1px 0 white 15%, simulating the screen's own light. On hover the fill brightens toward blue 500 and gains a 0 0 10px blue 30% outer glow; on press the scale drops to 0.98 and the inset becomes 0 2px 4px black 30%. Transition 200ms ease-out.

- **Sizes:** padding 8px 16px; label 14px
- **States:** hover: brighter fill + outer glow; active: inset shadow, scale 0.98

### Surface Card

**Role:** content cards and list containers

Slate 800 at 50% fill, 1px slate 700 border, 12px radius, 24px padding, no shadow — in the dark, shadows are nearly invisible, so the border does the layering. On hover the fill turns fully opaque, the border lightens to slate 500, the card lifts 2px and gains 0 8px 30px black 50%. Transition 300ms ease-out.

- **States:** hover: fill opaque, border lighter, lift 2px

### Dark Input

**Role:** forms and search

Slate 800 fill, 1px slate 700 border, 8px radius, padding 8px 12px, 14px type. Placeholder in slate 400. On focus the border turns primary blue with a 2px blue 30% outer ring; the focus-ring offset uses the deep slate base color so no white edge appears.

### Status Chip

**Role:** status and category markers

Fully rounded, 12px type, weight 500, padding 2px 10px. Success uses a green 15% ground with green 400 text, warning amber 15% with amber 400, error red 15% with red 400. A small dot is mandatory — hue alone may not carry the state.

## Do's and Don'ts

### Do

- Use deep slate #0f172a instead of pure black as the base
- Keep luminance to three tiers, each 4% to 6% apart
- Layer with 1px white borders at 6% to 10%
- Give buttons a top-edge inner highlight
- Keep body line height at 1.6 and weights at 700 or below
- Set the focus-ring offset to the base color, not white

### Don't

- Don't use pure black #000000 as the base
- Don't rely on drop shadows for layering; they are invisible in the dark
- Don't use state colors as decoration
- Don't go below 4.5:1 body contrast
- Don't use pure white text; 90% to 95% is right
- Don't place bright color blocks on a dark base

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Slate | `#0f172a` | Page base |
| 1 | Slate 800 | `#1e293b` | Cards and panels |
| 2 | Slate 700 | `#334155` | Overlays and hover |

## Elevation

- **Card:** `none — 1px border carries it`
- **Card hover:** `0 8px 30px rgba(0,0,0,0.50)`
- **Inset glow:** `inset 0 1px 0 rgba(255,255,255,0.15)`

## Imagery

Product UI screenshots and dark-scene photography. A very dark radial gradient glow is allowed behind the hero. Every asset must lean dark itself, leaving the bright areas to the interface. No white-background images, no colorful illustrations, no large solid color blocks.

## Layout

Capped at 1200px, 12 columns, container padding 24px, section gap 96px. Regions are separated by 1px white 6% dividers instead of shadows. A sidebar and a main region may coexist, but their luminance must differ by at least one tier.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e2e8f0`
- background: `#0f172a`
- card: `#1e293b`
- accent: `#3b82f6`
- muted: `#94a3b8`
- border: `rgba(255,255,255,0.08)`

EXAMPLE COMPONENT PROMPTS:

1. Build a dark card: background #1e293b (optionally at 50% opacity), 1px rgba(255,255,255,0.08) border, 12px radius, 24px padding, no shadow. Heading 20px/600 #e2e8f0, body 14px #94a3b8. On hover the background turns fully opaque, the border rises to rgba(255,255,255,0.16), the card translates -2px, and a 0 8px 30px rgba(0,0,0,0.5) shadow appears. Page base #0f172a.
2. Build a status row: three fully-rounded chips, 12px/500 text, padding 2px 10px — success on a green 15% ground with green 400 text, warning on amber 15% with amber 400, error on red 15% with red 400. Each chip leads with a 6px dot in the same hue and keeps 8px between dot and text.
