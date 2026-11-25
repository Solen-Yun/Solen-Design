# Visual Novel — Style Reference

> A translucent dialogue box floats over the scene; everything yields to "keep reading".

**Theme:** dark

The visual-novel style comes from ADV game interfaces: the scene is one illustration, the dialogue box is an 85%-opaque dark panel pressed to the bottom, the character name sits at the panel's top-left on a gradient nameplate, and choices stack vertically as branch buttons with a highlight sweeping across on hover. The typographic discipline is clear — narration in serif, UI labels in sans, body line height stretched to 1.8 because players read hundreds of consecutive words. Ornament stays restrained: only an L-shaped line at the panel's corner — no thick borders, no RGB split, no pixel fonts.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Night Slate | `#1a202c` | `--color-night-slate` | Dialogue and choice panel ground, at 85% opacity pressing on the scene. |
| Mist White | `#f7fafc` | `--color-mist` | Info cards and save screens, at 70% opacity to stay airy. |
| Narrative Indigo | `#6366f1` | `--color-indigo` | Nameplates, selected items and key buttons. Marks "this line matters". |
| Heart Pink | `#ec4899` | `--color-heart-pink` | Affection, emotional choices and turning points. |
| Trust Green | `#10b981` | `--color-trust-green` | Unlocked, saved and positive feedback. |
| Magenta | `#d948bb` | `--color-magenta` | Hidden routes and special events, at most one per screen. |

## Typography

### Lora — narration and dialogue. The serif makes long text read like a novel; line height 1.8 is a hard metric.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 16, 18, 20, 24, 32, 44
- **Line height:** 1.3 (display), 1.4 (headings), 1.8 (body)
- **Letter spacing:** 0 on display, 0.06em on uppercase labels

### Inter — UI labels, buttons and values. Always in clear division of labor with the serif narration.

- **Substitute:** system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 13, 15, 18
- **Line height:** 1.3 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Lora | 500 | 44px | 1.3 | — | `--text-display` |
| heading | Lora | 500 | 32px | 1.35 | — | `--text-heading` |
| subheading | Lora | 400 | 24px | 1.4 | — | `--text-subheading` |
| body-lg | Lora | 400 | 20px | 1.8 | — | `--text-body-lg` |
| body | Lora | 400 | 16px | 1.8 | — | `--text-body` |
| label | Inter | 700 | 13px | 1.4 | 0.08em | `--text-label` |

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
| nameplates | 6px |
| pills | 999px |

- **Page max-width:** 1120px
- **Section gap:** 64px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Dialogue Panel

**Role:** the dialogue box (the core component)

Night-slate 85% fill, 20px blur, 12px radius, 1px narrative-indigo 20% stroke, 32px padding (40px at the top reserved for the nameplate), shadow 0 8px 32px black 50%. Narration is 16px serif at 1.8 line height in white. The top-left carries an L-shaped ornament of two 1px narrative-indigo 40% lines (24px each). On hover the stroke rises to 40% and the panel lifts 2px.

- **Sizes:** padding 32px; narration 16px
- **States:** hover: border 40%, lift 2px

### Nameplate

**Role:** the character nameplate

Pressed onto the dialogue box's top-left, offset 16px upward, 24px horizontal and 6px vertical padding, filled with a horizontal narrative-indigo to deep-indigo gradient, rounded only on the top corners and the bottom-right (a tag shape), white 13px/700 at 0.08em tracking, shadow 0 4px 10px indigo 30%. The nameplate width follows the name — never a fixed slot.

### Choice Button

**Role:** branch choice buttons

Night-slate 60% fill, 8px blur, 8px radius, 1px narrative-indigo 30% stroke, left-aligned 18px sans, padding 16px 32px, full width. On hover the fill turns indigo 20%, the stroke reaches 60% and the button lifts 2px while a white 5% highlight sweeps left to right (700ms). On press the whole button shifts right 8px and settles.

- **States:** hover: highlight sweep, lift 2px; active: shift right 8px

### Save Slot

**Role:** save and chapter lists

Mist-white 70% fill, 12px radius, 16px padding, with a 16:9 screenshot thumbnail on the left and a 15px chapter name plus 12px timestamp on the right. On hover the fill rises to 85% and the thumbnail scales 1.03. Empty slots use a dashed border and show the word "empty".

### Scene Stage

**Role:** the scene area

85% of the viewport tall, its background a gradient illustration (the sky transitioning top to bottom), with characters appearing as bottom-aligned translucent silhouettes (160px wide, 120% height, dome-shaped, 8% opacity). The dialogue box stacks 24px from the bottom, never blocking the visual center.

## Do's and Don'ts

### Do

- Serif for narration, sans for UI
- Build the dialogue box at 85% opacity plus blur
- Keep body line height at 1.8
- Round only the tag corners of the nameplate
- Sweep a highlight across choice hovers
- Limit ornament to the corner's L-shaped line

### Don't

- Don't use borders thicker than 4px
- Don't use RGB-split ghosting
- Don't set narration in pixel or monospace faces
- Don't use a pure black background
- Don't use terminal-style uppercase wide-tracked text
- Don't let the dialogue box block the scene's center

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Scene | `scene illustration` | The background illustration |
| 1 | Dialogue Panel | `rgba(26,32,44,0.85)` | The dialogue box |
| 2 | Info Card | `rgba(247,250,252,0.70)` | Info cards and saves |

## Elevation

- **Dialogue:** `0 8px 32px rgba(0,0,0,0.50)`
- **Nameplate:** `0 4px 10px rgba(99,102,241,0.30)`
- **Card:** `0 6px 20px rgba(0,0,0,0.30)`

## Imagery

Scene illustration leads: sky gradients, interiors, night views, with translucent character silhouettes. CG standees and expression variants are allowed. No realistic photography, UI screenshots or flat geometry.

## Layout

Capped at 1120px; the scene takes 85vh, the dialogue box fixed 24px from the bottom, max-width 960px, centered. Choices stack vertically at the dialogue's width with 8px gaps. Info cards and save screens use a two-column grid.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f7fafc`
- panel: `rgba(26,32,44,0.85)`
- accent: `#6366f1`
- heart: `#ec4899`
- trust: `#10b981`
- border: `rgba(99,102,241,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. Build a visual-novel dialogue box: background rgba(26,32,44,0.85), backdrop-blur 20px, 12px radius, 1px rgba(99,102,241,0.2) stroke, 32px padding, shadow 0 8px 32px rgba(0,0,0,0.5). Narration 16px serif at 1.8 line height in white. The top-left holds a gradient nameplate (linear-gradient(to right, #6366f1, #4f46e5), white 13px/700, rounded only on the top corners and bottom-right). Below, three choice buttons stack vertically at full width with 8px radius, a white 5% highlight sweeping across on hover.
2. Build a scene stage: 85% of the viewport tall with a gradient-sky illustration, characters as bottom-aligned translucent silhouettes (160px wide, 120% height, 8% opacity), the dialogue box 24px from the bottom.
