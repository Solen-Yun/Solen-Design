# Film Noir — Style Reference

> A slanted beam cuts through a black room: everything else stays hidden in shadow.

**Theme:** dark

Film noir comes from the noir pictures of the 1940s and 50s: extreme light-dark contrast, layered deep greys, diagonal light and shadow, and a single crimson touch (#c41e3a) appearing only when necessary. It builds hierarchy with brightness rather than color — cards separate by barely-there grey steps like #1a1a1a against #262626, light is faked with linear gradients, and hover changes brightness only, never hue. Titles run in serif italic, like opening credits. The bans: no colored backgrounds, no high saturation (crimson only as an accent), no large radii.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Film Black | `#0a0a0a` | `--color-film-black` | Page ground and the deepest shadow. Near pure black, so light looks thrown. |
| Screen Grey | `#1a1a1a` | `--color-screen-grey` | The first raised layer. One step brighter than the ground. |
| Second Grey | `#262626` | `--color-second-grey` | The second raised layer and card interiors. |
| Smoke White | `#f5f5f0` | `--color-smoke-white` | Titles and primary text. A slightly warm grey-white, like an old print. |
| Crimson | `#c41e3a` | `--color-crimson` | The only color, accent only: one mark, one line, one warning. |
| Brass | `#d4af37` | `--color-brass` | Barely used, hinting at "valued": awards and years. |

## Typography

### Playfair Display — titles in serif italic, like 1940s opening credits. Body in the same family upright, line height 1.7.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 20, 28, 38, 52, 72
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 700 | 72px | 1.1 | -0.01em | `--text-display` |
| heading | Playfair Display | 700 | 52px | 1.15 | — | `--text-heading` |
| subheading | Playfair Display | 400 | 38px | 1.25 | — | `--text-subheading` |
| body-lg | Playfair Display | 400 | 28px | 1.4 | — | `--text-body-lg` |
| body | Playfair Display | 400 | 20px | 1.7 | — | `--text-body` |
| label | Playfair Display | 700 | 20px | 1.4 | 0.14em | `--text-label` |

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
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1120px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Shaft Card

**Role:** the slanted-light card (core component)

#1a1a1a fill, 4px radius, 1px #2e2e2e stroke, 32px padding. The key is a linear gradient faking the slanted light: linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 45%), entering from the top-left. Title 38px serif italic in smoke white, body 20px smoke white 70%. On hover overall brightness rises 8% (filter: brightness), hue never changes.

- **States:** hover: brightness +8%

### Noir Button

**Role:** action buttons

Transparent ground, 1px smoke-white 30% stroke, 2px radius, 20px/700, 0.14em tracking, padding 12px 32px. On hover the stroke rises to 70%, text lifts from 85% to 100%, and the ground takes smoke white 4%; on press brightness drops 10%. Transition 400ms ease-out.

- **Sizes:** padding 12px 32px; label 20px
- **States:** hover: border 70%, brighter text; active: brightness -10%

### Crimson Mark

**Role:** the crimson mark

A 2px, 32 to 64px crimson line, an 8px crimson dot, or one crimson line of text. The whole page allows one or two — they are the frame's bleeding points. Never spread into a color block.

### Diagonal Shadow

**Role:** the diagonal shadow band

An absolutely positioned slanted band (rotate(-18deg)), 200 to 400px wide, filled black 60% with 120px blur, pressed over content with pointer-events: none. It fakes the shadow of blinds or a door frame — at most two per screen.

### Smoke Field

**Role:** the dark-field input

#1a1a1a fill, 2px radius, 1px #2e2e2e stroke, padding 12px 16px, 20px serif. Placeholder smoke white 35%. On focus the stroke turns smoke white 50% with a 1px outer ring.

## Do's and Don'ts

### Do

- Push extreme light-dark contrast with layered greys
- Fake slanted light with linear gradients
- Change only brightness on hover, never hue
- Set titles in serif italic
- Spend crimson sparingly, one or two places
- Keep radius at 4px or below

### Don't

- Don't use colored backgrounds
- Don't use saturated color (crimson excepted)
- Don't use large radii
- Don't spread crimson into blocks
- Don't use flat-lit photography
- Don't use color imagery

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Film Black | `#0a0a0a` | Page ground |
| 1 | Screen Grey | `#1a1a1a` | First layer |
| 2 | Second Grey | `#262626` | Second layer |

## Elevation

- **None:** `none — light is faked with gradients`
- **Card:** `0 24px 60px rgba(0,0,0,0.70)`

## Imagery

Black-and-white photography: silhouettes, blind-slat light, rainy streets, smoke, close-ups of cigarettes. Strong directional light and deep shadow required. Color photos may be converted to high-contrast monochrome. No color imagery, flat lighting or soft illustration.

## Layout

Capped at 1120px with 24px container padding and 128px section gaps. Diagonal composition and offset elements are allowed. The page stays predominantly black, regions separated by layers of dark grey — whitespace rarely does the dividing.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f5f5f0`
- background: `#0a0a0a`
- raised: `#1a1a1a`
- higher: `#262626`
- crimson: `#c41e3a`
- brass: `#d4af37`

EXAMPLE COMPONENT PROMPTS:

1. Build a film-noir card: #1a1a1a fill, 4px radius, 1px #2e2e2e stroke, 32px padding. Layer a diagonal light: background-image linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 45%). Title 38px Playfair Display italic in #f5f5f0; body 20px serif at line height 1.7 in rgba(245,245,240,0.7). The lower-left carries a 2px, 48px crimson #c41e3a line as the only color. On hover filter: brightness(1.08) — hue never changes. Page ground #0a0a0a.
