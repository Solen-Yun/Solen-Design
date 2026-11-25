# Studio Bold — Style Reference

> Type big enough to fill the screen, color blocks that simply switch, corners that stay square and confident.

**Theme:** dark

The studio-bold style is the portfolio language of a design studio: the hero title must be big enough to carry impact on its own (6xl to 8xl, line height 0.95, tight tracking), dark sections (#1a1a1a) alternate with light ones (#f5f5f0), sections separate by switching their ground rather than by borders, project cards are square-cornered and scale to 1.02 on hover, and a single coral (#ff6b6b) runs through the site as the CTA. Its bans all circle one idea — no softening: no small hero, no rounded corners, no serif, no hairline borders dividing sections, no pure-white backgrounds.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a1a` | `--color-ink` | Dark section grounds and text on light sections. The style's structural color. |
| Paper | `#f5f5f0` | `--color-paper` | Light section grounds. Warmer than pure white, so white text never gets confused. |
| Coral | `#ff6b6b` | `--color-coral` | The only accent: CTAs, hover states and the highlighted words in the hero. |
| White | `#ffffff` | `--color-white` | Text only, never a ground. |
| Graphite | `#333333` | `--color-graphite` | Secondary text and dividers inside dark sections. |
| Near Black | `#0d0d0d` | `--color-near-black` | The deeper ground for headers and footers, adding one more layer between dark sections. |

## Typography

### Inter — sans throughout. Headings run 700 to 900 compressed to line height 0.95; body runs 300 to 400. The gap between them is itself the hierarchy.

- **Substitute:** Helvetica, 'Arial Black', system-ui, sans-serif
- **Weights:** 300, 400, 700, 900
- **Sizes:** 14, 18, 24, 40, 64, 96, 128
- **Line height:** 0.95 (display), 1.05 (headings), 1.55 (body)
- **Letter spacing:** -0.04em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 128px | 0.95 | -0.04em | `--text-display` |
| heading-lg | — | 900 | 96px | 0.98 | -0.04em | `--text-heading-lg` |
| heading | — | 700 | 64px | 1.02 | -0.03em | `--text-heading` |
| subheading | — | 700 | 40px | 1.1 | -0.02em | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.55 | — | `--text-body` |

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| avatars | 999px |

- **Page max-width:** 1440px
- **Section gap:** 128px
- **Card padding:** 0px
- **Element gap:** 24px

## Components

### Hero Display

**Role:** the oversized hero title (core)

96 to 128px, weight 900, line height 0.95, -0.04em tracking, left-aligned and free to wrap. One or two key words take coral, the rest white or ink. Never below 48px — smaller than that and the impact is gone.

### Coral CTA

**Role:** the primary action button

Coral fill, white text, zero radius, no stroke, 18px/700, padding 16px 32px, no static shadow. On hover the fill deepens to #e55a5a, a 0 20px 40px coral 30% shadow appears and the button lifts 2px; on press it scales 0.98. Transition 300ms.

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: darker fill, lift 2px, shadow; active: scale 0.98

### Project Card

**Role:** project cards

Light paper ground, zero radius, overflow hidden, no border. The image is 4:3 or 16:9, with text pressed below it (never on it): project name 24 to 32px/700, client name 14px/300 grey. On hover the whole card scales 1.02 with a 0 25px 50px shadow and the image scales 1.04. Transition 300ms.

- **States:** hover: card 1.02, image 1.04, shadow

### Section Switch

**Role:** the section ground switch (the means of separation)

No borders and no shadows between sections — the ground simply switches: dark (#1a1a1a) → light (#f5f5f0) → dark. The switch is itself the divider, and it carries more force than a line. A page usually holds three to five blocks.

### Testimonial Block

**Role:** client testimonials

Max-width 64rem, centered, 64px vertical and 48px horizontal padding, quote 24 to 30px italic at line height 1.6 in ink, with a 14px name and role below. No quote icon, no border.

## Do's and Don'ts

### Do

- Keep the hero title at 48px minimum, usually 96 to 128px
- Use zero radius, avatars excepted
- Stay sans-serif throughout
- Separate sections by switching grounds
- Run coral through the site as the single accent
- Scale cards to 1.02 on hover

### Don't

- Don't build a hero with small or standard sizes
- Don't use rounded corners
- Don't use serif faces
- Don't divide sections with hairline borders
- Don't use pure-white backgrounds
- Don't press text onto project imagery

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ink | `#1a1a1a` | Dark sections |
| 1 | Paper | `#f5f5f0` | Light sections |
| 2 | Near Black | `#0d0d0d` | Header and footer |

## Elevation

- **None:** `none at rest — blocks do the separating`
- **Card hover:** `0 25px 50px rgba(0,0,0,0.25)`
- **CTA hover:** `0 20px 40px rgba(255,107,107,0.30)`

## Imagery

Project imagery and team portraits. Work must be high quality, croppable, without radius or borders. Client logo walls are allowed (greyscale or single color). No decorative illustration or background texture.

## Layout

Capped at 1440px with 32px container padding and 128px section gaps. The hero approaches full height. Titles may overlap images, but text must stay on the top layer. Every section is square-cornered.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#1a1a1a`
- paper: `#f5f5f0`
- accent: `#ff6b6b`
- muted: `#8a8a85`
- dark: `#0d0d0d`

EXAMPLE COMPONENT PROMPTS:

1. Build a studio-bold hero: a dark section on #1a1a1a with white type. Title 128px/900 at line height 0.95, -0.04em tracking, left-aligned, with two key words in coral #ff6b6b. The CTA is coral fill, white text, zero radius, 18px/700, padding 16px 32px, deepening to #e55a5a on hover with a 0 20px 40px rgba(255,107,107,0.3) shadow and a 2px lift. The next section switches its ground directly to #f5f5f0 with no border. Project cards are square-cornered, scaling 1.02 on hover with a shadow. Sans-serif throughout, no pure-white backgrounds.
