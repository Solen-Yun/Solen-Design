# Outrun — Style Reference

> A magenta-and-cyan sunset, palm silhouettes, a perspective grid racing toward the horizon.

**Theme:** dark

Outrun is 80s racing and synth aesthetics: neon magenta (#ff006e) and violet (#a020f0), a cyan (#00d4ff) sky, a near-black ground, a perspective grid floor, palms and sports-car silhouettes. Two motion rules must be obeyed. First, glow must be dual-colored (magenta plus cyan) — single-color glow reads as "not Outrun enough". Second, the grid background must never stand still: a background-position shift creates the illusion of racing toward the horizon. Without it the style loses its core.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Magenta | `#ff006e` | `--color-magenta` | The first neon: the primary button, the horizon and key accents. |
| Violet | `#a020f0` | `--color-violet` | The second neon, for layered glows and the sky gradient. |
| Neon Cyan | `#00d4ff` | `--color-cyan` | Sky, grid lines and data. Forms a chromatic pairing with magenta. |
| Near Black | `#0a0a0a` | `--color-near-black` | Page base and silhouettes. Gives the neon somewhere to glow. |
| Sunset Orange | `#ff6b35` | `--color-sunset-orange` | Sunset and warm highlights, in the gradient's middle. |
| Pale Violet | `#9f9aff` | `--color-pale-violet` | Text reflections and the brightest highlight; the brightest stop. |

## Typography

### Inter — a bold sans; headings at 900 with tight tracking; small labels go uppercase with 0.22em wide tracking, the 80s way.

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 34, 48, 68
- **Line height:** 1.05 (display), 1.15 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.22em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 68px | 1.05 | -0.02em | `--text-display` |
| heading | — | 900 | 48px | 1.1 | -0.02em | `--text-heading` |
| subheading | — | 700 | 34px | 1.2 | — | `--text-subheading` |
| body-lg | — | 700 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 700 | 14px | 1.55 | — | `--text-body` |
| label | — | 700 | 14px | 1.4 | 0.22em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 4px |
| buttons | 4px |
| inputs | 4px |

- **Page max-width:** 1240px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Outrun Button

**Role:** action button

Magenta fill, white text, 4px radius, no stroke, 14px/700 uppercase at 0.22em, padding 12px 28px, resting with a 0 0 12px magenta glow. On hover a dual neon glow stacks — 0 0 20px magenta and 0 0 40px cyan (Dual Neon Glow) — as the button lifts 2px; on press it scales to 0.97 and the glow contracts to 8px. Transition 200ms.

- **Sizes:** padding 12px 28px; label 14px
- **States:** hover: dual neon glow, lift 2px; active: scale 0.97

### Chrome Card

**Role:** content cards

Near-black 80% fill, 4px radius, 1px magenta 35% stroke, 24px padding, outer glow 0 0 20px magenta 40%. Titles use a magenta-to-pale-violet horizontal gradient text (background-clip: text); body is white 75%. On hover the dual neon glow ignites, over 300ms.

### Perspective Grid

**Role:** the perspective grid floor (the signature component)

A transform: perspective(320px) rotateX(62deg) plane with 40px-interval cyan 20% grid lines. It must move via background-position along the Y axis, charging toward the viewer (2s period, linear, infinite loop) — standing still forfeits the style's core. Static under prefers-reduced-motion.

- **Sizes:** cell 40px; loop 2s linear

### Sunset Band

**Role:** the sunset band

A horizontal band 160 to 240px tall, running from near black through violet and magenta to sunset orange, holding a 120px circular sun (a magenta-to-orange radial) sliced by 8 horizontal dark lines (the 80s striped sun). No border, no radius.

### Palm Silhouette

**Role:** palm and car silhouettes

Pure-black silhouettes (single-color paths) set at both sides of the horizon, 120 to 280px tall, with an optional 1px magenta stroke as a neon rim. Purely decorative; no interaction.

## Do's and Don'ts

### Do

- Keep the magenta, violet, cyan triad
- Make every glow dual-colored (magenta plus cyan)
- Keep the perspective grid constantly moving
- Pair the bold sans with wide-tracked labels
- Ground on near black, never bright white
- Slice the sunset with horizontal lines

### Don't

- Don't use bright white backgrounds
- Don't drift into modern minimalism
- Don't omit the neon glow
- Don't use soft low-saturation palettes
- Don't glow in a single color
- Don't let the grid stand still

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0a` | Page base |
| 1 | Sky Gradient | `linear-gradient(#0a0a0a, #a020f0, #ff006e)` | The sky |
| 2 | Grid Floor | `perspective grid` | The ground plane |

## Elevation

- **Dual neon:** `0 0 20px #ff006e, 0 0 40px #00d4ff`
- **Dual neon strong:** `0 0 28px #ff006e, 0 0 60px #00d4ff`
- **Text glow:** `0 0 10px rgba(255,0,110,0.70)`

## Imagery

80s synth visuals: sunsets, palms, sports cars, city skylines, grid floors. Photos may be graded into duotone silhouettes. No bright white grounds, modern photography or soft gradients.

## Layout

Capped at 1240px with 24px container padding and 96px section gaps. The common hero: the perspective grid floor, a sunset, and a centered large title. Elements may overlap the grid, but text always stays above the glow and readable.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a0a`
- magenta: `#ff006e`
- violet: `#a020f0`
- cyan: `#00d4ff`
- orange: `#ff6b35`

EXAMPLE COMPONENT PROMPTS:

1. Build an Outrun button: background #ff006e, white text, 4px radius, 14px/700 uppercase at 0.22em tracking, padding 12px 28px, resting box-shadow 0 0 12px #ff006e. On hover stack the dual neon — 0 0 20px #ff006e, 0 0 40px #00d4ff — with translateY(-2px); on active scale(0.97) with the glow at 8px, transition 200ms. The hero adds a perspective(320px) rotateX(62deg) grid floor (40px cells, 1px #00d4ff at 20%) whose background-position loops every 2s linear for the rushing feel. Page base #0a0a0a.
2. Build a chrome card: near-black 80% fill, 4px radius, 1px rgba(255,0,110,0.35) stroke, 24px padding, outer glow 0 0 20px rgba(255,0,110,0.40), a magenta-to-pale-violet gradient title, white 75% body. On hover the dual neon glow ignites over 300ms.
