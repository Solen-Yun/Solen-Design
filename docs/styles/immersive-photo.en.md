# Immersive Photo — Style Reference

> The photograph is the interface: it doesn't decorate the content — it is the content.

**Theme:** dark

Immersive photo reduces every interface element to the minimum, letting full-bleed photographs own the viewport with text floating above readability scrims. Its technical discipline matters more than its visuals — every image needs an aspect-ratio (against CLS), AVIF or WebP with srcset, an LQIP placeholder that fades in on the hero, and a slow Ken Burns drift using only transform (8 seconds minimum, honoring prefers-reduced-motion). The accent is a single color, and it must be sampled from the photo's warm light (say amber gold) — never a brand color forced against the image.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0c0d10` | `--color-ink` | Scrims, footer and the gaps between photos. Near-black but not pure, so it never blends into the photo's shadows. |
| Paper | `#f4f1ea` | `--color-paper` | Light blocks and captions. Warm white, giving breathing room outside the photo. |
| Amber | `#e8b04b` | `--color-amber` | The only accent, sampled from the photo's warm light. Key CTA and small tags only. |
| Deep Grey | `#1a1c22` | `--color-deep-grey` | Secondary block and card ground, one tier brighter than ink, for layering. |
| Mist | `#b8bcc4` | `--color-mist` | Captions, metadata and secondary text. Never competes with amber on screen. |

## Typography

### Inter — the only font on the site. Titles over photos run 44 to 64px at 500; captions are 11px uppercase at 0.16em.

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 11, 12, 14, 18, 28, 44, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 500 | 64px | 1.05 | -0.02em | `--text-display` |
| heading-lg | — | 500 | 44px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 18px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 11px | 1.4 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 999px |
| media | 0 |

- **Page max-width:** 1440px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Photo Stage

**Role:** the hero and full-bleed image blocks

100vh tall, object-fit: cover, with aspect-ratio (16:9 hero, 4:5 cards), and a scrim from black 70% at the bottom fading to transparent above. The image carries a 20s Ken Burns drift (scale 1.00 to 1.06, transform only, ease-out), static under prefers-reduced-motion. Before load, an LQIP blurred placeholder shows and fades in within 400ms.

- **Sizes:** 16:9 hero, 4:5 card

### Caption Block

**Role:** captions and metadata

Pinned to the image's bottom or lower-left, 24px from the edge. An 11px uppercase 0.16em amber series label on top, an 18 to 28px white title in the middle, and 12px mist metadata below (place, time, gear). Text must sit on the scrim's darker side, holding at least 4.5:1 contrast.

### Amber CTA

**Role:** the key action button

Amber fill, ink text, 999px full radius, no stroke, 14px/600, padding 12px 28px, shadow 0 8px 24px amber 30%. On hover the fill brightens 8% and the shadow spreads to 32px; on press it scales 0.98. Only one allowed per page.

### Photo Grid

**Role:** galleries and work lists

Two to three columns, 16px gaps, every card fixed at 4:5, 16px radius, overflow hidden. Images scale to 1.05 on hover over 1200ms ease-out while the card shadow deepens. No borders inside cards — the photos separate themselves.

- **States:** hover: image scale 1.05, shadow deepens

### Minimal Nav

**Role:** the top navigation

Absolutely positioned over the hero, 72px tall, transparent, no border. The wordmark and links are white, 11px uppercase at 0.16em; links turn amber on hover. After scrolling it switches to ink 90% with 12px blur.

## Do's and Don'ts

### Do

- Give every image an aspect-ratio
- Use AVIF or WebP with srcset
- Provide an LQIP placeholder that fades in
- Keep Ken Burns to transform, 8 seconds and up
- Place text on the scrim's dark side
- Honor prefers-reduced-motion

### Don't

- Don't use the photo as a background and pile cards over it
- Don't press text onto an image without a scrim
- Don't ship unoptimized full-size JPGs
- Don't use images without aspect-ratio
- Don't introduce a second accent
- Don't drift faster than 8 seconds

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Photo | `full-bleed image` | Hero and galleries |
| 1 | Ink | `#0c0d10` | Scrims and footer |
| 2 | Deep Grey | `#1a1c22` | Secondary blocks |

## Elevation

- **Photo card:** `0 24px 60px rgba(0,0,0,0.35)`
- **Photo hover:** `0 32px 80px rgba(0,0,0,0.45)`
- **CTA:** `0 8px 24px rgba(232,176,75,0.30)`

## Imagery

Full-bleed photography throughout, and every photo must have a clear light direction with a dark region where text can live. A single photographer's series may form the site's continuity. No illustration, icon walls, gradient backgrounds or non-photographic imagery.

## Layout

Capped at 1440px; the hero is 100vh full-bleed, galleries run three columns at 16px gaps. Transitions between sections happen through full-bleed photos rather than whitespace, or a 128px band of ink breathes between them. Text blocks stay under 40em wide.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f4f1ea`
- scrim: `rgba(0,0,0,0.70)`
- background: `#0c0d10`
- accent: `#e8b04b`
- muted: `#b8bcc4`
- card: `#1a1c22`

EXAMPLE COMPONENT PROMPTS:

1. Build an immersive-photo card: container aspect-ratio 4/5, overflow hidden, 16px radius. The image object-fit: cover filling the container, scaling to 1.05 on hover over 1200ms ease-out. Layer a linear-gradient(to top, rgba(0,0,0,0.7), transparent) scrim from the bottom. In the lower-left, an 11px uppercase 0.16em #e8b04b series label, an 18px white title and 12px #b8bcc4 metadata. Page base #0c0d10.
2. Build a photo stage: 100vh tall, object-fit: cover, bottom-to-top scrim from black 70% to transparent, a 20s Ken Burns drift (scale 1.00→1.06, transform only, ease-out) that goes static under prefers-reduced-motion, with an LQIP placeholder fading in within 400ms.
