# Fintech Clean — Style Reference

> Violet, deep navy and a grid underlay: financial infrastructure drawn as engineering paper.

**Theme:** light

The fintech-clean style earns trust through restraint plus precision. The primary violet (#635bff) appears only on actions and links; body text is deep navy (#0a2540) rather than black; the ground is a blue-tinged pale grey (#f6f9fc). The signature move is a 40px grid underlay — it turns the page into drafting paper and hints at rigor. Cards float on two stacked soft shadows (never one), lifting further on hover as the shadow spreads. Buttons carry an inner highlight, swapping to an inner shadow when pressed for a physical push.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Fintech Violet | `#635bff` | `--color-violet` | Primary actions, links and selection. The only brand color; two or three appearances per screen at most. |
| Deep Navy | `#0a2540` | `--color-navy` | Body, headings and dark sections. Softer than black; reads like printing ink. |
| Haze | `#f6f9fc` | `--color-haze` | Page canvas, layered with 40px grid lines. White cards form the second layer above it. |
| Card White | `#ffffff` | `--color-card-white` | Cards, forms and overlays. |
| Electric Cyan | `#00d4ff` | `--color-cyan` | Gradients and the charts' second series. Only ever paired with violet, never a standalone primary. |
| Lilac | `#7a73ff` | `--color-lilac` | Gradient ends and hover states. Same hue as the primary violet, one step lighter. |

## Typography

### Inter — the only font on the site. Headings at 700 with tight tracking, body at 400; paired with deep navy it reads like print.

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 44, 64
- **Line height:** 1.1 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.02em on uppercase labels

### JetBrains Mono — code samples and API snippets. Half of the language is written for developers.

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400
- **Sizes:** 13
- **Line height:** 1.5 (display), 1.5 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0 on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 1.1 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 44px | 1.15 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.25 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| code-blocks | 12px |

- **Page max-width:** 1120px
- **Section gap:** 112px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Primary Button

**Role:** primary action button

Solid violet fill, white text, 8px radius, no border. 14px type, weight 500, padding 10px 24px. Shadow: outer 0 2px 5px violet 40% plus inner highlight inset 0 1px 0 white 20%. On hover the fill deepens to #5851ea, the button lifts 2px and the outer shadow widens to 10px; on press it scales to 0.98 and the shadow becomes inset 0 2px 4px black 20%. Transition 300ms ease-out.

- **States:** hover: lift 2px, deeper fill; active: inset shadow, scale 0.98

### Floating Card

**Role:** feature cards and product cards

White ground, 12px radius, no border, 24px padding. Shadow stacks two layers: 0 2px 10px 6% and 0 4px 20px 4%. The icon block is 40px square, 10px radius, on a violet 10% ground with a violet icon. On hover the card lifts 4px, the shadow spreads to 0 12px 30px 8% and the icon block scales 1.1, over 400ms ease-out.

### Grid Backdrop

**Role:** page underlay and hero background

Two crossed 40px linear-gradient grids in violet 10%, on the pale haze ground, the whole layer at 40% opacity. It appears on the hero and a few sections only — never across the whole page, or it would bury the content.

### Code Block

**Role:** API samples and config snippets

Deep navy ground, white text at 90%, 12px radius, 20px padding, 13px monospace at 1.7 line height. A dot row (three 8px dots) may sit at the top left. No border, no shadow.

## Do's and Don'ts

### Do

- Reserve violet for actions and links, two or three per screen
- Set body text in deep navy, not black
- Stack two shadows on cards
- Confine the grid underlay to the hero
- Give buttons an inner highlight; swap to an inner shadow on press
- Set code blocks on deep navy

### Don't

- Don't use violet as a large background
- Don't let the grid cover the full page
- Don't use a single shadow layer; the float would collapse
- Don't introduce a second independent accent
- Don't use pure black body text
- Don't exceed 12px card radius

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Haze | `#f6f9fc` | Canvas, with the 40px grid on top |
| 1 | Card White | `#ffffff` | Cards and forms |
| 2 | Navy Stage | `#0a2540` | Dark sections and footer |

## Elevation

- **Card:** `0 2px 10px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)`
- **Card hover:** `0 12px 30px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)`
- **Button:** `0 2px 5px rgba(99,91,255,0.40), inset 0 1px 0 rgba(255,255,255,0.20)`

## Imagery

Interface screenshots, abstract geometric diagrams and code lead. A violet-to-cyan gradient may stand in for imagery, but only on one card. No people photography, no decorative illustration.

## Layout

Capped at 1120px, 12 columns, 24px container padding. Section gap 112px. The hero is commonly text-left with an image right, or centered large type above a product screenshot. The grid underlay covers the hero and fades out down the page.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#0a2540`
- background: `#f6f9fc`
- card: `#ffffff`
- accent: `#635bff`
- secondary: `#00d4ff`
- grid: `rgba(99,91,255,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. Build a fintech-clean card: white ground, 12px radius, 24px padding, shadow 0 2px 10px rgba(0,0,0,0.06) stacked with 0 4px 20px rgba(0,0,0,0.04). Top-left a 40px square icon block (10px radius, #635bff at 10% ground). Title 20px/600 #0a2540. On hover lift 4px and spread the shadow to 0 12px 30px rgba(0,0,0,0.08). Page ground #f6f9fc with a 40px violet 10% grid layered on top.
2. Build a primary button: violet #635bff fill, white 14px/500 text, padding 10px 24px, 8px radius, shadow 0 2px 5px rgba(99,91,255,0.40) plus inset 0 1px 0 rgba(255,255,255,0.20). On hover the fill deepens to #5851ea and the button lifts 2px over 300ms ease-out; on press it scales 0.98 with inset 0 2px 4px rgba(0,0,0,0.20).
