# JRPG — Style Reference

> Beveled borders, gold titles, blue gradients: a menu window from 1995.

**Theme:** dark

The JRPG interface comes from the 16- and 32-bit era of game menus: on a deep navy ground (#0f172a) layered with a blue-to-dark-blue gradient, windows use a 2px blue border plus inner shadows for a beveled relief, titles run gold (#fbbf24), status bars use green (HP) and blue (MP), cards carry double strokes (2px dark blue with a 1px bright-blue ring), and buttons appear raised through inset white highlights. Menu feedback must hard-cut — 75 to 120ms, mimicking the rhythm of a gamepad cursor, never eased. Minimalist flatness is banned: no border and no shadow here equals not finished.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Navy | `#0f172a` | `--color-deep-navy` | Page ground and window interiors. The 32-bit era's menu blue. |
| Command Blue | `#1e40af` | `--color-command-blue` | Window borders, button fills and the MP bar. |
| Gold | `#fbbf24` | `--color-gold` | Titles, key values and the selected item. The only glowing color in the menu. |
| Window White | `#f0f9ff` | `--color-window-white` | Primary text and descriptions. A blue-tinged white. |
| HP Green | `#22c55e` | `--color-hp-green` | Health and success. Always a segmented bar, never a smooth gradient. |
| Signal Green | `#56ed40` | `--color-signal-green` | Status hints and "executable" marks. |

## Typography

### Inter — a slightly squared interface sans; titles at 700 in gold. Type sizes run compact because menus fit many lines in one screen.

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 700
- **Sizes:** 13, 16, 20, 26, 34, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.08em on uppercase labels

### JetBrains Mono — values and status readouts. Monospace lets HP/MP and levels align vertically.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 13, 16, 20
- **Line height:** 1.4 (display), 1.4 (headings), 1.55 (body)
- **Letter spacing:** 0.04em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | Inter | 700 | 44px | 1.15 | 0.02em | `--text-heading` |
| subheading | Inter | 700 | 34px | 1.2 | 0.02em | `--text-subheading` |
| body-lg | Inter | 400 | 20px | 1.5 | — | `--text-body-lg` |
| body | Inter | 400 | 16px | 1.6 | — | `--text-body` |
| body-sm | Inter | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | JetBrains Mono | 700 | 13px | 1.4 | 0.08em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
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
| cards | 8px |
| buttons | 6px |
| inputs | 6px |
| bars | 999px |

- **Page max-width:** 1120px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Bevel Window

**Role:** the beveled menu window (core component)

Window ground #132039, 2px command-blue stroke wrapped by an outer 1px bright-blue 20% ring for the double border, 8px radius, 20px padding, shadows inset 0 1px 0 white 20% and inset 0 -1px 0 black 35% for the bevel. Outer drop 0 8px 24px black 55%. Title gold 34px/700; window text white 16px.

### Command Button

**Role:** command buttons

Command-blue fill, window-white text, 2px dark-blue stroke, 6px radius, 16px/700, padding 10px 24px, inset 0 1px 0 white 20% for the raised feel. On hover the fill brightens 6% and the text turns gold; on press the inner shadow inverts (inset 0 2px 6px black 45%) and the button sinks 1px. Transition 90ms linear — a hard cut.

- **Sizes:** padding 10px 24px; label 16px
- **States:** hover: brighter, gold text; active: inset shadow, sink 1px

### Status Bar

**Role:** HP / MP status bars

16px tall, fully rounded, 2px dark-blue stroke; the fill is HP green or bright blue, separated into 8px cells (2px gaps), mimicking a segmented health bar. Never a smooth gradient — segmentation is the era's signature. The value sits right of the bar in 13px gold monospace.

### Menu List

**Role:** menu option lists

Each row 36px tall, 6px radius, with an 8px gold triangle or square 8px from the left marking selection (transparent when unselected). The selected row fills gold 18% and its text turns gold. Switching only hard-cuts colors — no sliding, 90ms.

### Portrait Frame

**Role:** portrait and avatar frames

48 to 96px, 8px radius, a 2px gold stroke with a 1px dark-blue outer ring, interior in deep navy or holding the portrait. A 4px gold corner mark at each corner. Used for characters, items and party members.

## Do's and Don'ts

### Do

- Bevel with 2px borders plus inner shadows
- Use gold for titles and selection
- Segment every status bar
- Hard-cut menu feedback in 75 to 120ms
- Double the strokes (2px dark blue + 1px bright blue)
- Raise buttons with inset white highlights

### Don't

- Don't go minimal-flat (no border, no shadow)
- Don't ease menu feedback smoothly
- Don't render status bars as continuous gradients
- Don't use flat line-art icons
- Don't exceed 8px radius
- Don't set body text in gold

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Navy Gradient | `linear-gradient(#1e3a8a, #0f172a)` | Page and window ground |
| 1 | Window | `#132039` | Menu windows |
| 2 | Selected Row | `rgba(251,191,36,0.18)` | Selected rows |

## Elevation

- **Bevel:** `inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.35)`
- **Window drop:** `0 8px 24px rgba(0,0,0,0.55)`
- **Pressed:** `inset 0 2px 6px rgba(0,0,0,0.45)`

## Imagery

Pixel portraits, item icons, maps and skill effects. Icons must carry a 2px stroke and inner shadow — never flat line-art. Photos may be reduced to a 32-color palette. No modern illustration or flat icons.

## Layout

Capped at 1120px with 16px container padding and 12px window spacing — a dense menu arrangement. Windows may stack (sub-menus over the main menu), each layer offset 8px with a deeper shadow. All dimensions are multiples of 4.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f0f9ff`
- background: `#0f172a`
- blue: `#1e40af`
- gold: `#fbbf24`
- green: `#22c55e`
- window: `#132039`

EXAMPLE COMPONENT PROMPTS:

1. Build a JRPG menu window: #132039 ground, 2px solid #1e40af border plus an outer 1px rgba(96,165,250,0.2) ring, 8px radius, 20px padding, box-shadow inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.55). Title 34px/700 gold #fbbf24, body 16px #f0f9ff. Below it, a 16px tall fully rounded HP bar in green #22c55e, segmented into 8px cells. Buttons #1e40af fill, 2px dark-blue border, inset 0 1px 0 white highlight; on hover the text turns gold, transition 90ms linear. Page ground: linear-gradient(#1e3a8a, #0f172a).
