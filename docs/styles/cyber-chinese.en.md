# Cyber Chinese — Style Reference

> Vermilion and gold pressed over neon cyan and violet: lanterns hanging on a cyber street.

**Theme:** dark

Cyber Chinese is the collision of two languages: vermilion (#d4553a) and gold (#c9a227) from tradition, neon blue (#00d4ff) and neon violet (#a020f0) from cyber, on a near-black ground (#0a0a0a). Shapes are always square-cornered with zero radius, keeping the look sharp; neon glow may never be omitted, but it must coexist with vermilion and gold foil rather than replace them. Interaction feedback carries an eastern-cyber trait — on hover a short scan band or cloud-motif streamer sweeps past, never spring bounce, playful jitter or large scaling; control transitions stay within 400ms.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Vermilion | `#d4553a` | `--color-vermilion` | Primary: seals, primary buttons and key emphasis. The weight of the traditional side. |
| Gold | `#c9a227` | `--color-gold` | Second primary: gold foil, strokes and precious marks. |
| Near Black | `#0a0a0a` | `--color-near-black` | Page base. Deep enough for neon and vermilion to glow together. |
| Neon Cyan | `#00d4ff` | `--color-neon-cyan` | The cyber side's primary: scan bands, data and links. |
| Neon Violet | `#a020f0` | `--color-neon-violet` | The second neon, for layered glows and cloud-motif streamers. |
| Pale Violet | `#9f9aff` | `--color-pale-violet` | Highlights and text reflections; the brightest stop. |

## Typography

### Noto Serif SC — headings in a heavy serif with wide spacing, like a plaque; the body uses the same family lighter for long reads.

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 600, 700
- **Sizes:** 16, 20, 26, 34, 46
- **Line height:** 1.2 (display), 1.35 (headings), 1.7 (body)
- **Letter spacing:** 0.04em on display, 0.24em on uppercase labels

### JetBrains Mono — data, coordinates and status codes; the cyber side's typeface.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0.06em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Noto Serif SC | 700 | 46px | 1.2 | 0.04em | `--text-display` |
| heading | Noto Serif SC | 700 | 34px | 1.3 | — | `--text-heading` |
| subheading | Noto Serif SC | 600 | 26px | 1.4 | — | `--text-subheading` |
| body-lg | Noto Serif SC | 600 | 20px | 1.65 | — | `--text-body-lg` |
| body | Noto Serif SC | 600 | 16px | 1.7 | — | `--text-body` |
| label | JetBrains Mono | 400 | 13px | 1.4 | 0.2em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Lattice Panel

**Role:** the lattice panel (the core component)

Vermilion 6% fill, zero radius, 1px gold 45% stroke, 24px padding, dual neon outer glow (cyan 16px plus violet 40px). Each corner holds a 12px gold right-angle bracket (like a window-lattice end cap). On hover a 40px-wide cyan 25% diagonal scan band sweeps left to right (400ms linear) while the glow amplifies.

- **States:** hover: scan band sweep, glow amplified

### Vermilion Button

**Role:** primary action button

Vermilion fill, near-black text, zero radius, 1px gold 70% stroke, 14px/700, 0.2em tracking, padding 12px 28px, outer glow 0 0 20px vermilion 40%. On hover the stroke rises to 100% and a cyan scan band passes, the glow turning cyan; on press the fill darkens and it scales to 0.98. Transition 240ms.

- **Sizes:** padding 12px 28px; label 14px
- **States:** hover: cyan scan, gold border full; active: scale 0.98

### Cloud Motif

**Role:** the cloud-motif streamer

Repeating fret or cloud paths (1px stroke, gold 40%) flowing along a section's edge: swept left to right via background-position or a clip-path mask, 3-second period, linear. Decoration only, at most two per screen.

### Seal Stamp

**Role:** the seal mark

A 32px vermilion square, zero radius, holding a 20px near-black serif character, with an outer 0 0 12px vermilion 50% glow. Edges eroded by 1px (a mask notch). For marking sections and "verified".

### Neon Data Row

**Role:** the neon data row

Monospace 13px, 0.06em tracking; the left label in gold, the right value in neon cyan with a 0 0 8px cyan 50% text glow. Rows 32px tall, separated by 1px gold 15%. Values must exist as static text.

## Do's and Don'ts

### Do

- Pair vermilion and gold with neon cyan and violet
- Keep square corners; the look stays sharp
- Never omit the neon glow
- Sweep scan bands or cloud streamers on hover
- Keep control transitions within 400ms
- Set values in monospace with text glow

### Don't

- Don't use bright white backgrounds
- Don't use soft rounded shapes
- Don't omit the neon glow
- Don't use purely western ornament
- Don't use spring bounce or playful jitter
- Don't exceed 400ms on controls

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0a` | Page base |
| 1 | Panel | `rgba(212,85,58,0.06)` | Panels (vermilion-tinted translucent) |
| 2 | Gold Frame | `rgba(201,162,39,0.12)` | Gold-framed blocks |

## Elevation

- **Dual neon:** `0 0 16px rgba(0,212,255,0.45), 0 0 40px rgba(160,32,240,0.30)`
- **Gold rim:** `inset 0 0 0 1px rgba(201,162,39,0.60)`
- **Amplified:** `0 0 24px rgba(0,212,255,0.65), 0 0 64px rgba(160,32,240,0.45)`

## Imagery

Eastern-cyber illustration: dragon motifs braided with circuitry, neon lanterns, ad screens on flying eaves, seals and holograms. Traditional patterns (clouds, frets) may layer beneath the glow. No bright white grounds, soft illustration or purely western ornament.

## Layout

Capped at 1280px with 16px container padding and 12px panel spacing. Panels may join into lattice-style large screens with 1px gold lines. Zero radius site-wide; control transitions stay within 400ms.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f5f0e1`
- background: `#0a0a0a`
- vermilion: `#d4553a`
- gold: `#c9a227`
- cyan: `#00d4ff`
- violet: `#a020f0`

EXAMPLE COMPONENT PROMPTS:

1. Build a cyber-Chinese panel: background rgba(212,85,58,0.06), zero radius, 1px rgba(201,162,39,0.45) stroke, 24px padding, box-shadow 0 0 16px rgba(0,212,255,0.45), 0 0 40px rgba(160,32,240,0.3). Title 34px heavy serif, 0.04em tracking, #f5f0e1; labels in 13px monospace gold at 0.2em. On hover a 40px-wide rgba(0,212,255,0.25) diagonal scan band sweeps left to right (400ms linear) while the glow amplifies to 24px/64px. The primary button takes vermilion fill with near-black text, zero radius, 1px gold stroke. Page base #0a0a0a.
2. Build a seal stamp: a 32px vermilion square with a 20px near-black serif character, zero radius, an outer 0 0 12px rgba(212,85,58,0.50) glow, edges eroded by a mask.
