# Broadcast Glitch — Style Reference

> The signal is failing: scanlines crawl, RGB trembles, color bars sweep by.

**Theme:** dark

Broadcast glitch revives the station idents and VHS artifacts of the 90s, distinct from synthwave: it doesn't draw sunsets and grids — it simulates the signal itself breaking. On a CRT near-black ground (#0b0b0e) a layer of slowly crawling scanlines always overlays everything, only three signal colors exist (glitch red #ff2e4c, CRT cyan #00e5d8, test-card yellow #f5e000), SMPTE bars serve as the signature ornament, and every glitch animation hard-cuts in steps() (frame jumps, VHS horizontal tearing, sweeping bars) — never smooth. Synthwave's purple-pink-orange sunsets and horizon grids are explicitly banned — that is another style.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| CRT Black | `#0b0b0e` | `--color-crt-black` | Page ground. The tube's black, always under scanlines. |
| Signal White | `#ededed` | `--color-signal-white` | Body text and the bars' white. Slightly grey, like an old TV's bright. |
| Glitch Red | `#ff2e4c` | `--color-glitch-red` | One side of the RGB split and alarms. Taken from the bars' red. |
| CRT Cyan | `#00e5d8` | `--color-crt-cyan` | The other side of the RGB split and status. |
| Test Card Yellow | `#f5e000` | `--color-test-yellow` | Highlights and the bars' bright segment. |

## Typography

### JetBrains Mono — monospace, uppercase. Like a station's caption machine and timecode.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13, 16, 22, 32, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.5 (body)
- **Letter spacing:** 0.06em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 48px | 1.1 | 0.06em | `--text-display` |
| heading | — | 700 | 32px | 1.2 | 0.06em | `--text-heading` |
| subheading | — | 700 | 22px | 1.3 | 0.06em | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.5 | — | `--text-body` |
| label | — | 400 | 11px | 1.4 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1240px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Scanline Crawl

**Role:** the crawling scanlines (core)

A fixed full-page repeating-linear-gradient (a 1px black 50% line every 4px), overlaid by the same pattern translating via transform: translateY from 0 to 4px over 8 seconds (linear infinite loop), creating the illusion of "signal crawling". Never animate top or height. Static under reduced-motion.

- **Sizes:** 4px pitch; 8s linear loop

### RGB Split Title

**Role:** the channel-split title

The title stacks two copies: one offset 2px in glitch red, one -2px in CRT cyan, blend mode screen. At rest the offset is 2px; every 6 seconds a 120ms steps(2) jitter fires (offset jumping to 4px and back). Body text never gets channel separation — it would become unreadable.

- **Sizes:** jitter 120ms steps(2), every 6s

### SMPTE Bars

**Role:** the SMPTE bars (signature)

A 24 to 48px tall bar strip with seven segments in standard order: white, yellow, cyan, green, magenta, red, blue. It appears only at the page top or between sections, exactly one at a time, as "signal calibration" ornament.

### Signal Panel

**Role:** signal panels

#111116 fill, zero radius, 1px signal-white 12% stroke, 24px padding, no shadow. Title 22px/700 with channel separation, body 13px signal-white 80%. On hover the stroke rises to 25% and a 2px color bar sweeps across within 200ms (steps(4)).

- **States:** hover: bar sweep on steps(4)

### Broadcast Button

**Role:** action buttons

Transparent ground, 1px signal-white 30% stroke, zero radius, 13px/700 uppercase 0.16em, padding 10px 24px. On hover the stroke turns glitch red and text turns test-card yellow; on press the element tears horizontally — clip-path cutting three horizontal offsets (2 to 4px each), resetting within 80ms. transition-none or 80ms steps(2).

- **States:** hover: red border; active: horizontal tear

## Do's and Don'ts

### Do

- Ground in CRT black with crawling scanlines
- Use only three signal colors
- Hard-cut glitch motion in steps()
- Sign with exactly one SMPTE bar strip
- Reserve channel separation for titles and ornament
- Keep jitter at 2 to 4px, extremely infrequent

### Don't

- Don't use synthwave sunsets or horizon grids
- Don't use rounded corners, soft glow or soft shadows
- Don't introduce a fourth color
- Don't jitter the whole screen continuously
- Don't channel-split body text
- Don't animate layout properties

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | CRT Black | `#0b0b0e` | Page ground |
| 1 | Signal Panel | `#111116` | Panels |
| 2 | Color Bars | `SMPTE bars` | Bar ornament |

## Elevation

- **None:** `none — this is hard signal, not soft UI`
- **Channel split:** `2px 0 #ff2e4c, -2px 0 #00e5d8`

## Imagery

VHS footage, test cards, color bars, TV noise, surveillance frames. Must carry scanlines and slight color shift. Photos may be pressed into the 3-color signal palette. No clean photography, soft illustration or any synthwave sunset.

## Layout

Capped at 1240px with 16px container padding and 64px section gaps. Zero radius throughout. Scanlines overlay all content; the color bar appears once, at the top. Elements may jitter every 6 seconds, 2 to 4px, extremely infrequent.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ededed`
- background: `#0b0b0e`
- red: `#ff2e4c`
- cyan: `#00e5d8`
- yellow: `#f5e000`
- panel: `#111116`

EXAMPLE COMPONENT PROMPTS:

1. Build a broadcast-glitch panel: CRT black #0b0b0e fill, zero radius, 1px rgba(237,237,237,0.12) stroke, 24px padding, no shadow. Title 22px/700 monospace uppercase with two stacked copies for channel separation (one text-shadow 2px 0 #ff2e4c, one -2px 0 #00e5d8), jittering 120ms every 6 seconds. The page overlays repeating-linear-gradient (1px black 50% every 4px) plus a layer translating translateY 0→4px over 8s linear. At the top, one 32px SMPTE strip (white yellow cyan green magenta red blue). Buttons transparent with a 1px stroke turning #ff2e4c on hover and tearing horizontally via clip-path on active. Only three signal colors sitewide; no synthwave sunset.
