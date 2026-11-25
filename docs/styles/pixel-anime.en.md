# Pixel Anime — Style Reference

> A screen from the GBA era of JRPGs: angular dialog boxes, 15-frame animation.

**Theme:** light

The pixel-anime style merges classic JRPG interface grammar with pixel-anime art: RPG dialog boxes (4px borders with square corner blocks), status bars, monospace type, and an NES palette (blue, red, gold, green). Its timing rule is called Framerate Drop — all transitions run 75ms with linear easing or transition-none, because early-2000s handhelds ran 15 frames and animation jumped rather than slid. Smooth gradients are banned, radius is banned, and any blur is banned (including glow — pixel light must be hard-edged, zero blur).

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Hero Blue | `#4a90d9` | `--color-hero-blue` | Primary: dialog borders, primary buttons and selection. The JRPG interface blue. |
| Night Purple | `#2d1b69` | `--color-night-purple` | Deep ground and dialog interiors. Like a battle scene's dark field. |
| Alert Red | `#ff6b6b` | `--color-alert-red` | Danger, damage and "enemy" marks. |
| Coin Gold | `#ffd93d` | `--color-coin-gold` | XP, coins and highlights; the only "bright" thing on screen. |
| Heal Green | `#50c878` | `--color-heal-green` | Health, recovery and success. |
| Olive | `#a98d16` | `--color-olive` | The darkest accent, for text pressed onto gold. |

## Typography

### Press Start 2P — the only typeface, monospace. Line height must expand to 1.8, or pixel glyphs smear together.

- **Substitute:** 'Courier New', ui-monospace, monospace
- **Weights:** 400
- **Sizes:** 10, 12, 14, 18, 24, 32
- **Line height:** 1.3 (display), 1.4 (headings), 1.8 (body)
- **Letter spacing:** 0.05em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 400 | 32px | 1.35 | 0.05em | `--text-display` |
| heading | — | 400 | 24px | 1.4 | 0.05em | `--text-heading` |
| subheading | — | 400 | 18px | 1.5 | — | `--text-subheading` |
| body-lg | — | 400 | 14px | 1.8 | — | `--text-body-lg` |
| body | — | 400 | 12px | 1.8 | — | `--text-body` |
| label | — | 400 | 10px | 1.6 | 0.12em | `--text-label` |

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

- **Page max-width:** 960px
- **Section gap:** 64px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Dialog Box

**Role:** the RPG dialog box (the core component)

Deep-purple #1a1038 fill, 4px hero-blue border, zero radius, 20px padding. Each corner holds an 8px × 8px solid square (hero blue) as corner decoration, inset 4px inside the border. Text 14px monospace, line height 1.8, white. An optional 4px blur-free hard shadow outside the box.

### Command Button

**Role:** command buttons

Hero-blue fill, white monospace text, 4px night-purple border, zero radius, 14px, 0.12em tracking, padding 12px 24px, hard shadow 4px 4px 0 night purple. On hover the fill hard-cuts to coin gold with night-purple text (a palette swap, no gradient); on press it translates 4px 4px with the shadow gone. transition-none or 75ms linear throughout.

- **Sizes:** padding 12px 24px; label 14px
- **States:** hover: palette swap; active: translate 4px, shadow none

### Status Bar

**Role:** status bars (HP / EXP)

12px tall, zero radius, 4px night-purple border; the inner fill takes heal green (HP) or coin gold (EXP), segmented into 8px cells with 2px gaps, mimicking a segmented HP bar. No smooth gradients ever. Values sit to the bar's right in monospace.

### Corner Block Decoration

**Role:** corner blocks and pixel ornaments

8px or 12px solid squares in one of the four palette colors, at panel corners, beside titles, or as separators. They may form 2×2 clusters as a "sparkle" effect, but every square must be hard-edged, zero blur, zero radius.

### Menu List

**Role:** menus and option lists

Each item 32px tall, zero radius, with an 8px arrow-square at 8px from the left marking selection (transparent when unselected). The selected item fills hero-blue 20% with coin-gold text. Switching options only hard-cuts colors — no sliding.

## Do's and Don'ts

### Do

- Use 4px borders with square corner blocks
- Set the whole site in monospace pixel type
- Use only the NES palette's four colors
- Transition at 75ms or transition-none
- Keep easing linear only
- Make all glow hard-edged with zero blur

### Don't

- Don't use smooth gradients
- Don't use any border radius
- Don't use blur (including backdrop-blur)
- Don't use serif faces
- Don't use ease-in-out or ease
- Don't use soft shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Night Purple | `#2d1b69` | Page ground |
| 1 | Dialog Box | `#1a1038` | Dialog interior |
| 2 | Paper | `#f4f4f4` | Light panels |

## Elevation

- **Hard drop:** `4px 4px 0 #2d1b69`
- **Pressed:** `none`
- **Never:** `blurred shadows are forbidden`

## Imagery

Pixel art: characters, items and terrain at 16×16 to 64×64, scaled in whole multiples (2× or 3×) with image-rendering: pixelated keeping hard edges. Photos may be downsampled into pixel maps. No vector illustration, smooth gradients or blur.

## Layout

Capped at 960px with 16px container padding and 64px section gaps. The layout behaves like a game screen: the main content centered, a dialog box optionally fixed at the bottom, status hanging at the top-right. All dimensions are multiples of 4 landing on the 4px grid.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#2d1b69`
- dialog: `#1a1038`
- blue: `#4a90d9`
- gold: `#ffd93d`
- green: `#50c878`

EXAMPLE COMPONENT PROMPTS:

1. Build a pixel-RPG dialog box: background #1a1038, 4px solid #4a90d9 border, border-radius 0, 20px padding. Each corner holds an 8px × 8px #4a90d9 solid square inset 4px from the border. Text 14px Press Start 2P, line height 1.8, white. Below it, a command button: background #4a90d9, white monospace text, 4px #2d1b69 border, zero radius, box-shadow 4px 4px 0 #2d1b69. On hover the background hard-cuts to #ffd93d with #2d1b69 text; on active translate(4px,4px) with no shadow, transition: none. Page ground #2d1b69.
2. Build a status bar: 12px tall, 4px night-purple border, the fill segmented into 8px cells with 2px gaps in heal green or coin gold, values in monospace on the right.
