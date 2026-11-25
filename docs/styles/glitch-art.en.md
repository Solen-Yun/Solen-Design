# Glitch Art — Style Reference

> The frame is failing on purpose: RGB split, screen tearing and dropped frames, all kept deliberately.

**Theme:** dark

Glitch art treats digital error as aesthetics: monospace uppercase with wide tracking, text split by 3px magenta-and-cyan dual text-shadows (RGB channel separation), every state change on transition-none (the jolt of a dropped frame), press using skew-x plus scale-y for screen tearing, and cards marked by 4 to 8px thick left borders that swap color on hover. The bans are absolute: no radius, no smooth transitions, no frosted glass or soft gradients, no decorative color beyond CMY, no serif or regular sans — monospace only; shadows must be solid blocks.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Glitch Black | `#0a0a0a` | `--color-glitch-black` | Page base. Pure enough for the cyan and magenta split to ghost. |
| Cyan | `#00ffff` | `--color-cyan` | The left channel of the RGB split, and the primary text color. |
| Magenta | `#ff00ff` | `--color-magenta` | The right channel of the split, and the warning color. |
| Yellow | `#ffff00` | `--color-yellow` | CMY's third member, for highlights and dropped-frame marks. |
| White | `#ffffff` | `--color-white` | Text and solid blocks only — never a ground. |
| Alarm Red | `#ff0506` | `--color-alarm-red` | Errors and crashes; the least frequent. |

## Typography

### JetBrains Mono — the only typeface. Headlines 900 uppercase at 0.06em tracking; body 400.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 900
- **Sizes:** 12, 14, 18, 26, 40, 64
- **Line height:** 1 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** 0.06em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 64px | 1 | 0.06em | `--text-display` |
| heading | — | 900 | 40px | 1.05 | 0.06em | `--text-heading` |
| subheading | — | 900 | 26px | 1.15 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| label | — | 400 | 12px | 1.4 | 0.16em | `--text-label` |

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
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1280px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### RGB Split Text

**Role:** RGB-split text (the core component)

Monospace 900 uppercase; the resting text is white or cyan with two pseudo-element copies layered over: one offset -3px in magenta, one offset +3px in cyan, both at 80% opacity. At rest the split is 3px; on hover the split hard-cuts to 6px with a 1px vertical jitter (two frames, steps(1)). Blur and smooth transitions are never used.

- **States:** hover: split 6px, jitter

### Tear Button

**Role:** the tear button

Cyan or magenta fill, black text, zero radius, 2px same-color stroke, 14px/900 uppercase at 0.16em, padding 10px 24px, hard shadow 4px 4px 0 in the opposing color (cyan pairs magenta, magenta pairs cyan). On hover the fill hard-cuts to the other color (transition-none); on press skewX(-6deg) plus scaleY(0.9) tears the screen as it shifts 2px 2px. Every state change is transition-none.

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: hard color swap; active: skew and squash

### Marked Card

**Role:** the thick-left-border card

Dark grey #111 fill, zero radius, a 4 to 8px left border (cyan or magenta), 20px padding, no shadow. On hover the left border hard-cuts from cyan to magenta and the title swaps in sync. The border width never changes — only the color.

- **States:** hover: border color cut

### Scanline Bed

**Role:** the scanline and noise ground

Two fixed full-page layers: a repeating-linear-gradient drawing white 4% horizontal lines every 3px, and a base64 noise image or irregular clip-path blocks at 2% offset noise. pointer-events: none. Optionally a 60ms whole-page displacement jitter every 4 seconds (the dropped frame).

### Error Readout

**Role:** error readouts and status codes

12px monospace uppercase at 0.16em, in cyan or alarm red. The format is fixed: "ERR // 0x0A4F // FRAME DROP". Placed in section corners as environmental texture, not a real notice. A genuine error message must also carry readable natural language.

## Do's and Don'ts

### Do

- Set monospace, uppercase, wide tracking
- Split with dual text-shadows
- Put every state change on transition-none
- Tear with skew-x plus scale-y on press
- Keep shadows as solid blocks
- Restrict decorative color to CMY

### Don't

- Don't use any border radius
- Don't use smooth transition animation
- Don't use frosted glass or soft gradients
- Don't reach beyond CMY for decoration
- Don't use serif or regular sans
- Don't use soft blurred shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Glitch Black | `#0a0a0a` | Page base |
| 1 | Panel | `#111111` | Cards and panels |

## Elevation

- **Solid block:** `4px 4px 0 #00ffff`
- **Solid block alt:** `4px 4px 0 #ff00ff`
- **Pressed:** `none`

## Imagery

Glitch imagery: pixelated screenshots, misaligned color bars, compression artifacts, scanlines. Photos may take RGB channel shifts and blocky compression. No realistic photography, soft illustration or natural imagery.

## Layout

Capped at 1280px with 16px container padding and 48px section gaps. Elements may misalign 2 to 8px for instability while the information hierarchy stays clear. Every state change is instantaneous; the whole page may jitter once every 4 seconds.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#00ffff`
- background: `#0a0a0a`
- magenta: `#ff00ff`
- yellow: `#ffff00`
- white: `#ffffff`
- alarm: `#ff0506`

EXAMPLE COMPONENT PROMPTS:

1. Build a glitch button: background #00ffff, black text, zero radius, 2px solid #00ffff border, 900 weight 14px uppercase at 0.16em tracking, padding 10px 24px, box-shadow 4px 4px 0 #ff00ff. On hover the background hard-cuts to #ff00ff (transition: none); on active skewX(-6deg) scaleY(0.9) translate(2px,2px). Headlines use monospace 900 uppercase with two pseudo-element copies for the RGB split — one text-shadow 3px 0 #ff00ff, one -3px 0 #00ffff. Page base #0a0a0a, layered with 3px-interval white 4% scanlines. Zero radius, zero smooth transitions site-wide.
2. Build a marked card: #111 fill, zero radius, a 4–8px left border in cyan that hard-cuts to magenta on hover with the title swapping in sync — width never changes.
