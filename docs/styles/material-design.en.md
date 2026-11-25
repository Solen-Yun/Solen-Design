# Material Design — Style Reference

> The metaphor of paper and ink: elements have elevation, motion has physics, and the grid is 8dp.

**Theme:** light

Material Design's core is not appearance but two physical assumptions. First, the interface is made of "paper" — paper has elevation, and hierarchy is expressed through shadow depth, not borders. Second, motion must follow one shared curve — cubic-bezier(0.4, 0, 0.2, 1) at 250ms, decelerating in. All dimensions land on the 8dp grid; the primary color is bold (violet #6200ee) with the secondary as garnish (teal #03dac6). Buttons must shrink to 0.98 and deepen their shadow when pressed — that is what this system considers "tactile realism".

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Material Violet | `#6200ee` | `--color-violet` | Primary actions, selection and the floating button. The system's identity color. |
| Teal | `#03dac6` | `--color-teal` | Secondary, for emphasis, progress and icons on the floating button. |
| Pink | `#ff0266` | `--color-pink` | Errors and deletion. One of the material spec's semantic colors. |
| Amber | `#ffde03` | `--color-amber` | Warnings and states that need attention. |
| Green | `#00c853` | `--color-green` | Success and completion, usually on checkmarks and progress rings. |
| Rust | `#c12700` | `--color-rust` | Serious warnings and the confirmation state for irreversible operations. |

## Typography

### Roboto — the only font on the site. Buttons and labels use 500 with 0.08em tracking, all caps; headings use large 400.

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 16, 20, 24, 34, 45
- **Line height:** 1.17 (display), 1.25 (headings), 1.5 (body)
- **Letter spacing:** -0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 400 | 45px | 1.17 | — | `--text-display` |
| heading-lg | — | 400 | 34px | 1.2 | — | `--text-heading-lg` |
| heading | — | 400 | 24px | 1.25 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.08em | `--text-label` |

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
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |

### Border Radius

| Element | Value |
|---|---|
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| fab | 999px |

- **Page max-width:** 1200px
- **Section gap:** 40px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Contained Button

**Role:** primary action button

Material-violet fill, white text, 4px radius, no border; 14px/500, 0.08em tracking, uppercase, padding 10px 24px, the three-layer shadow of elevation 2. On hover the fill brightens to #7528e5 and elevation rises to 4; on press it scales to 0.98, elevation drops to 8 and a white 20% ripple spreads from the center (reaching 2.5× radius within 250ms). Transition 250ms cubic-bezier(0.4, 0, 0.2, 1).

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: elevation 4; active: scale 0.98, ripple

### Elevated Card

**Role:** content cards and list containers

White ground, 4px radius, 16px padding, the two-layer shadow of elevation 1, no border. On hover elevation rises to 4 (shadow deepens, blur widens) while the card stays in place — in the material spec, the elevation change itself is the feedback.

- **States:** hover: elevation 1 → 4

### Floating Action

**Role:** the floating primary button

A 56px circle, material-violet fill, a white 24px icon, elevation 4, sitting 16dp from the viewport's bottom-right. On hover elevation rises to 8 and the fill brightens; on press it scales to 0.96. Icon-to-edge spacing is strictly 16px.

### Outlined Field

**Role:** text inputs

Transparent ground, 1px #9e9e9e stroke, 4px radius, padding 12px 16px, 16px type, with the label floating on the stroke. On focus the stroke becomes 2px material violet, the label turns violet, and a 0 0 0 4px violet 12% halo appears. In the error state the stroke turns pink and helper text shows.

### Snackbar

**Role:** light notices and undo

Dark grey #323232 fill, white text, 4px radius, padding 14px 16px, 14px type, elevation 6, appearing centered at the viewport bottom 16dp up. A teal text button sits on the right. It auto-dismisses after 4 seconds, entering on the 250ms decelerate curve.

## Do's and Don'ts

### Do

- Express hierarchy through elevation shadows, not borders
- Land every dimension on the 8dp grid
- Keep motion at 250ms on the standard decelerate curve
- Shrink pressed buttons to 0.98 and deepen the shadow
- Make the card's elevation change on hover
- Keep the primary bold and the secondary as garnish

### Don't

- Don't use inconsistent shadow depths
- Don't soften the palette
- Don't omit interaction feedback
- Don't break the 8dp grid
- Don't use non-standard easing curves
- Don't leave a card's shadow unchanged on hover

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Surface | `#ffffff` | Pages and cards |
| 1 | Elevated 1 | `#ffffff` | Cards, elevation via shadow |
| 4 | Elevated 4 | `#ffffff` | Floating buttons and menus |

## Elevation

- **Elevation 1:** `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
- **Elevation 2:** `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`
- **Elevation 4:** `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`
- **Elevation 8:** `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`

## Imagery

Icons, illustration and product screenshots lead. Icons must be Material-Symbols-style solid or outlined shapes, sized on the 8dp grid. No realistic photography or decorative hero images.

## Layout

Capped at 1200px; every dimension is a multiple of 8 (spacing 8, 16, 24, 32). A 12-column grid with 16dp gutters; cards and lists use 16dp padding. Content aligns left; the toolbar is fixed at the top and the floating button fixed at the bottom-right.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffffff`
- primary: `#6200ee`
- secondary: `#03dac6`
- error: `#ff0266`
- surface: `#ffffff`

EXAMPLE COMPONENT PROMPTS:

1. Build a Material primary button: background #6200ee, white text, 4px radius, 14px/500 uppercase at 0.08em tracking, padding 10px 24px, shadow 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23). On hover the background becomes #7528e5 and the shadow rises to 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23). On active scale(0.98) with a deeper shadow. Transition 250ms cubic-bezier(0.4,0,0.2,1).
2. Build an outlined field: transparent ground, 1px #9e9e9e stroke, 4px radius, padding 12px 16px, 16px text with the label floating on the stroke. On focus the stroke becomes 2px #6200ee, the label turns violet and a 0 0 0 4px rgba(98,0,238,0.12) halo appears.
