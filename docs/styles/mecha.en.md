# Mecha — Style Reference

> A cockpit panel: chamfered metal, chunky borders, hazard yellow and military green.

**Theme:** dark

The mecha style borrows from the mecha-design language of Gundam and EVA: military green and deep navy on the ground, hazard yellow and danger red as accents, an interface like a panel that has been chamfered, riveted and plastered with warning labels. Its technical signatures are chamfers (clip-path polygons cutting one or two corners), chunky borders (2px minimum, often with a 4px accent bar on the left), and blur-free hard shadows. Type must be monospace uppercase with wide tracking — this is equipment nameplate. Soft corners are banned, pink and light tones are banned, flashy gradients and frosted glass are banned, script faces are banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Navy | `#1a2744` | `--color-navy` | Primary ground and dark panels. The hull's main coating. |
| Military Green | `#4a5c3a` | `--color-military-green` | Secondary panels and borders. The matte green of armor plate. |
| Hazard Yellow | `#fbbf24` | `--color-hazard-yellow` | Primary accent: edge bars, button text and key readouts. The industrial warning color. |
| Danger Red | `#ef4444` | `--color-danger-red` | Alarms, overload and deletion. Its presence means an abnormal state. |
| Signal Green | `#56ed40` | `--color-signal-green` | Normal operation and "systems online", like a gauge's indicator lamp. |
| Deep Green | `#069006` | `--color-deep-green` | The green's dark stop, for text over bright green and the charts' second series. |

## Typography

### JetBrains Mono — monospace uppercase throughout. Tracking 0.08 to 0.16em, like a number sprayed onto armor.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 10, 11, 13, 15, 20, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** 0.08em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 28px | 1.2 | 0.08em | `--text-heading` |
| subheading | — | 700 | 20px | 1.3 | 0.08em | `--text-subheading` |
| body-lg | — | 400 | 15px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.6 | — | `--text-body` |
| body-sm | — | 400 | 11px | 1.55 | — | `--text-body-sm` |
| label | — | 700 | 10px | 1.4 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| dials | 999px |

- **Page max-width:** 1360px
- **Section gap:** 32px
- **Card padding:** 24px
- **Element gap:** 12px

## Components

### Armor Button

**Role:** primary action button

Deep-grey fill, hazard-yellow text, 2px hazard-yellow 60% stroke, zero radius, 4px 4px 0 navy hard shadow, monospace 11px/700, uppercase, 0.16em tracking, padding 12px 32px. clip-path cuts 14px off the top-left and bottom-right corners. On hover the fill hard-cuts to hazard yellow with navy text; on press it translates 2px 2px and the shadow shrinks to 2px. Transition 100ms linear.

- **Sizes:** padding 12px 32px; label 11px
- **States:** hover: yellow fill; active: translate 2px

### Armor Panel

**Role:** cards and instrument panels

Navy fill, 2px military-green stroke, a 4px hazard-yellow edge bar on the left, zero radius, 24px padding, hard shadow 4px 4px 0 hazard yellow 30%. clip-path cuts 20px off the bottom-right corner. A 32px L-shaped bracket (2px hazard yellow 40%) sits at the top-right, moving 2px inward and brightening to 100% on hover. On hover the left bar widens from 4px to 10px, over 150ms linear.

- **States:** hover: left edge 4px→10px, bracket brightens

### Hazard Stripe

**Role:** the warning stripe

An 8px-tall diagonal band: 45-degree repeats of hazard yellow and navy (12px each), on top of panels or between sections. No radius, no shadow — a purely flat industrial marker.

### Readout Gauge

**Role:** readouts and status gauges

A 12px-tall segmented bar: 10 segments, 2px gaps, zero radius, the trough in military green 30%. The fill takes signal green (normal), hazard yellow (caution) or danger red (overload). A 10px uppercase label on the left, a monospace value on the right, a 1px military-green divider between.

### Cockpit Frame

**Role:** the header and cockpit frame

64px tall, navy ground, a 2px military-green bottom stroke, an 8px hazard stripe on top. A 20px monospace uppercase wordmark on the left; three or four system status lamps in the middle (8px dots with 10px labels); one Armor Button on the right. Zero radius throughout.

## Do's and Don'ts

### Do

- Chamfer with clip-path, never radius
- Give panels a 4px hazard-yellow edge bar
- Set monospace uppercase at 0.08 to 0.16em tracking
- Keep hard shadows blur-free
- Pair military green with navy; reserve yellow for accent
- Land every dimension on multiples of 4

### Don't

- Don't use soft rounded corners
- Don't use pink or light tones
- Don't use flashy gradients or frosted glass
- Don't use script or decorative faces
- Don't use blurred shadows
- Don't mix two chamfer sizes on one screen

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Navy | `#1a2744` | Page ground |
| 1 | Panel | `#22283a` | Panels |
| 2 | Armor | `#4a5c3a` | Secondary blocks |

## Elevation

- **Hard drop:** `4px 4px 0 #1a2744`
- **Hard drop yellow:** `4px 4px 0 rgba(251,191,36,0.30)`
- **Pressed:** `2px 2px 0 #1a2744`

## Imagery

Mecha line art, armor-plate texture, warning labels and gauges. Photos may be graded into military-green duotones with a screen-tone overlay. No soft illustration, pink imagery or frosted layers.

## Layout

Capped at 1360px with 16px container padding and 12px panel spacing — a dense cockpit arrangement. Panels may join into large screens with 2px military-green lines. Every dimension is a multiple of 4; chamfers are uniformly 14px or 20px.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#fbbf24`
- background: `#1a2744`
- panel: `#22283a`
- green: `#4a5c3a`
- danger: `#ef4444`
- signal: `#56ed40`

EXAMPLE COMPONENT PROMPTS:

1. Build a mecha button: background #2b2b2b, text #fbbf24, 2px solid rgba(251,191,36,0.6) border, zero radius, box-shadow 4px 4px 0 #1a2744, monospace 11px/700 uppercase at 0.16em tracking, padding 12px 32px, clip-path: polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px). On hover the background becomes #fbbf24 with #1a2744 text; on active translate(2px,2px) with the shadow at 2px 2px 0, transition 100ms linear. Page base #1a2744.
2. Build an armor panel: navy fill, 2px military-green stroke, a 4px hazard-yellow left bar, zero radius, 24px padding, hard shadow 4px 4px 0 rgba(251,191,36,0.30), clip-path cutting 20px off the bottom-right, with an L-bracket at the top-right. On hover the bar widens to 10px and the bracket brightens, over 150ms linear.
