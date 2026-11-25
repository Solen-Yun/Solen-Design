# Sci-Fi HUD — Style Reference

> A layer of glowing data over deep space: translucent panels, L-shaped corner marks, lights forever pulsing.

**Theme:** dark

The sci-fi HUD simulates the display layer of a starship cockpit or tactical command console. Its construction is fixed: a deep-space ground (#020617), panels stacked at 85% opacity with a 20px glow edge, L-shaped 2px corner frames marking selection, monospace uppercase text with wide tracking, status lights pulsing continuously, and progress bars in gradient with a sweep of light. The point is not decoration but the feeling that "the system is alive" — every interaction must make some part glow or pulse; a deeper drop shadow is never enough.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Space | `#020617` | `--color-deep-space` | Page ground. A very deep blue-black stretching cyan's contrast to the max. |
| Primary Cyan | `#06b6d4` | `--color-cyan` | Borders, glow and primary accent. Every "systems online" signal comes from it. |
| Scan Blue | `#0ea5e9` | `--color-scan-blue` | Radar sweeps, data streams and secondary highlights. |
| Bright Cyan | `#22d3ee` | `--color-bright-cyan` | Peak highlights and key values, one step brighter than primary cyan. |
| System Green | `#22c55e` | `--color-system-green` | Nominal states, locked targets, passed checks. The only "safe" color. |
| Resonance Violet | `#9e74ff` | `--color-violet` | Abnormal readings and states needing human attention, least frequent. |

## Typography

### JetBrains Mono — the only typeface, uppercase throughout, 0.08 to 0.16em tracking. Monospace aligns value columns and makes the whole page read like instrument output.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 10, 11, 12, 14, 18, 24
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** 0.08em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 24px | 1.2 | 0.08em | `--text-heading` |
| subheading | — | 400 | 18px | 1.3 | 0.08em | `--text-subheading` |
| body-lg | — | 400 | 14px | 1.5 | 0.04em | `--text-body-lg` |
| body | — | 400 | 12px | 1.6 | — | `--text-body` |
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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |
| dials | 999px |

- **Page max-width:** 1600px
- **Section gap:** 24px
- **Card padding:** 20px
- **Element gap:** 8px

## Components

### HUD Panel

**Role:** main panels and data blocks

Deep-slate 85% fill, 20px blur, 4px radius, 1px primary-cyan 30% stroke, 20px padding, outer glow 0 0 20px cyan 50%. Each corner draws an L-shaped mark with two pseudo-elements (2px primary cyan, 16px long). On hover the stroke rises to 60% and the glow widens to 32px — that is "system activation".

- **Sizes:** padding 20px; radius 4px
- **States:** hover: border 60%, glow 32px

### Glow Button

**Role:** the primary action button

Transparent ground, 2px primary-cyan stroke, 2px radius, no fill, 12px/700 uppercase 0.16em, padding 8px 20px, text bright cyan. Already glows 0 0 12px at rest. On hover the fill takes cyan 12% and the glow widens to 24px; on press the glow contracts to 6px and the fill rises to 20%. Transition 120ms.

- **States:** hover: fill 12%, glow 24px; active: glow 6px

### Status Light

**Role:** status indicator lights

An 8px dot: green nominal, violet caution, orange alarm. It must pulse continuously — the outer glow expands from 4px to 12px and back over a 2-second cycle, ease-in-out. Beside every light sits 11px monospace status text — never color alone.

### Scan Bar

**Role:** progress bars and scan indicators

6px tall, 2px radius, track in primary-cyan 15%. The fill runs a horizontal primary-cyan to bright-cyan gradient with a 24px white 40% highlight sweeping left to right every 3 seconds. The value sits at the right in monospace, unit separated from number.

### Radar Ring

**Role:** radar and dial rings

A 160px to 240px ring, 2px primary-cyan 30% stroke, inner crosshair 1px primary-cyan 20%, the sweep sector a conic-gradient from cyan 40% fading to transparent, rotating once per 4 seconds linear. The center shows an 18px monospace readout.

## Do's and Don'ts

### Do

- Pair translucent panels with blur and outer glow
- Mark all four corners with L-shaped brackets
- Set monospace uppercase at 0.08 to 0.16em
- Keep status lights pulsing
- Make interactions change some glow
- Reserve warm colors for warnings

### Don't

- Don't use light or white backgrounds
- Don't use warm tones (warnings excepted)
- Don't use serif faces
- Don't speak in rounded, cute language
- Don't exceed 8px radius
- Don't let status lights freeze

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Space | `#020617` | Page ground |
| 1 | Panel | `rgba(15,23,42,0.85)` | Primary panels |
| 2 | Panel Raised | `rgba(30,41,59,0.90)` | Overlays and dialogs |

## Elevation

- **Panel glow:** `0 0 20px rgba(6,182,212,0.50)`
- **Active glow:** `0 0 32px rgba(6,182,212,0.70)`
- **Text glow:** `0 0 8px rgba(34,211,238,0.60)`

## Imagery

Grids, radar, waveforms and star charts are the image language — no photography. Deep-space photography may sit under panels at 20% opacity. No illustration, no people, no warm-toned imagery.

## Layout

Capped at 1600px with 16px container padding and 8px panel spacing — a dense instrument arrangement. Panels may join along 1px cyan lines into larger display areas. L-shaped corner marks persist at the corners, with a 16px safe margin at the page edge.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e5f2ff`
- background: `#020617`
- panel: `rgba(15,23,42,0.85)`
- accent: `#06b6d4`
- bright: `#22d3ee`
- ok: `#22c55e`

EXAMPLE COMPONENT PROMPTS:

1. Build a sci-fi HUD panel: background rgba(15,23,42,0.85), backdrop-blur 20px, 4px radius, 1px rgba(6,182,212,0.3) stroke, box-shadow 0 0 20px rgba(6,182,212,0.5), 20px padding. Each corner carries an L-shaped bracket in 2px solid #06b6d4 (16px long). Title 14px monospace uppercase 0.16em. Inside, a 6px progress bar: track rgba(6,182,212,0.15), fill linear-gradient(to right, #06b6d4, #22d3ee). Page ground #020617.
