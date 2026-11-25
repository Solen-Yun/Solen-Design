# Skeuomorphism — Style Reference

> Every control is a physical object: leather, wood, metal — with thickness and highlights.

**Theme:** light

Skeuomorphic design builds the interface out of real materials: panels like leather or woodgrain, buttons like metal plates, pages like cream stationery. Its technical core is "dual inner shadows plus one gradient" — an inset 0 1px 0 white 70% on top as the lit face, an inset 0 -1px 0 black 12% at the bottom as the turn line, an outer shadow for height off the surface, and a 3% dot texture over everything as the material grain. It takes a third path between neumorphism and flat design: not monochrome, but light and material. The cost is per-component light tuning — a rough implementation looks cheap instantly.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Leather | `#8b7355` | `--color-leather` | Dark panels and the primary button ground, aged-leather toned. Carries a fine grain texture. |
| Wood | `#d4c4a8` | `--color-wood` | Cards and light panels, pale wood and cardboard. Two tiers brighter than leather. |
| Metal | `#c0c0c0` | `--color-metal` | The metal face of buttons and sliders; a vertical gradient is mandatory for reflection. |
| Paper | `#f5f5dc` | `--color-paper` | Page and letter ground, cream writing paper. |
| Brass | `#c9a227` | `--color-brass` | Metal fittings and the primary accent, for icons, scales and selection. |
| Dark Brown | `#5c4033` | `--color-dark-brown` | Dark text and recessed grooves, like scorching and engraving. |
| Forest | `#2e5a3c` | `--color-forest` | Success and "enabled" states, like the green marks on an old gauge. |

## Typography

### Georgia — headings and graduated labels. The serif makes text read as printed on the material, not floating above the screen.

- **Substitute:** 'Times New Roman', 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 13, 15, 17, 22, 30, 40
- **Line height:** 1.15 (display), 1.25 (headings), 1.65 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Verdana — interface text and figures. A slightly squared sans, like the face of an old device.

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 700
- **Sizes:** 12, 14, 16
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Georgia | 700 | 40px | 1.15 | — | `--text-display` |
| heading | Georgia | 700 | 30px | 1.2 | — | `--text-heading` |
| subheading | Georgia | 400 | 22px | 1.3 | — | `--text-subheading` |
| body-lg | Verdana | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | Verdana | 400 | 14px | 1.6 | — | `--text-body` |
| label | Verdana | 700 | 12px | 1.4 | 0.1em | `--text-label` |

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
| inputs | 6px |
| knobs | 999px |

- **Page max-width:** 1080px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Metal Button

**Role:** primary action button

Vertical metal gradient (#d8d8d8 to #a8a8a8), dark-brown text, 8px radius, 1px #7a7a7a stroke; shadow is 0 3px 6px black 25% plus inset 0 1px 0 white 85%; 14px/700 type, 0.1em tracking, padding 10px 24px. On hover the gradient brightens 6% and the outer shadow deepens; on press the gradient inverts (dark on top, light below) and the shadow becomes inset 0 2px 6px black 30%. Transition 150ms.

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: brighter gradient; active: inverted gradient, inset shadow

### Leather Panel

**Role:** dark panels and toolbars

Leather fill with a 3% dot texture (a 5px radial-gradient grid), 12px radius, 24px padding; shadow 0 8px 16px black 20% with a top white 70% highlight and a bottom black 12% dark line. Text inside is cream; labels are 12px/700 at 0.1em tracking, as if engraved.

### Inset Well

**Role:** inputs and recessed areas

Wood fill, 6px radius, 1px #b8a88c stroke; all shadows point inward: inset 0 2px 6px black 25% plus inset 0 -1px 0 white 45%, forming a recess. Padding 8px 12px, 14px type. On focus the inner shadow deepens to 8px and a 2px brass ring appears outside.

### Brass Knob

**Role:** sliders and knob controls

A 24px circle with a mirrored radial shift (linear-gradient 135deg, #e8d48a to #9a7a1e), 1px #7a5f14 stroke; shadow 0 2px 4px black 30% plus inset 0 1px 1px white 80% and inset 0 -1px 2px black 25%. On hover it rotates 8 degrees; on press the inner shadow deepens.

### Ribbon Header

**Role:** page and section title bars

Dark-brown fill, a 3px brass edge line at the bottom, no radius, 12px 24px padding, a top 1px white 15% highlight. The title is 22px serif in cream at 0.1em tracking, left-aligned with a 24px icon slot.

## Do's and Don'ts

### Do

- Give every control a top highlight and a bottom dark line
- Use material textures, but never above 8% opacity
- Raise with outer shadows, recess with inner shadows
- Put a vertical gradient on every metal face
- Set text in serif, as if engraved into the material
- Keep at least 12px between controls

### Don't

- Don't use flat solid blocks
- Don't omit shadows or highlights
- Don't use overly simple line icons
- Don't use modern gradients or glassmorphism
- Don't push textures past 8%
- Don't mix recessed and raised shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f5f5dc` | Page ground |
| 1 | Wood Panel | `#d4c4a8` | Cards and panels |
| 2 | Leather | `#8b7355` | Dark panels and toolbars |

## Elevation

- **Raised panel:** `0 8px 16px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.70), inset 0 -1px 0 rgba(0,0,0,0.12)`
- **Recessed well:** `inset 0 2px 6px rgba(0,0,0,0.25), inset 0 -1px 0 rgba(255,255,255,0.45)`
- **Metal button:** `0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.85)`

## Imagery

Real material photographs: leather grain, woodgrain, brushed metal, binding stitches. Textures may overlay panels at 3% to 8% opacity. No flat illustration or modern gradients — they destroy the material assumption.

## Layout

Capped at 1080px with 24px container padding and 64px section gaps. The page reads as one device panel: zones are separated by recesses and raised edges instead of whitespace; toolbars may sit on leather; the content area behaves like paper. Controls keep at least 12px apart so shadows don't pollute each other.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#5c4033`
- background: `#f5f5dc`
- panel: `#d4c4a8`
- dark: `#8b7355`
- accent: `#c9a227`
- border: `#b8a88c`

EXAMPLE COMPONENT PROMPTS:

1. Build a skeuomorphic metal button: background linear-gradient(to bottom, #d8d8d8, #a8a8a8), text #5c4033, 8px radius, 1px #7a7a7a border, padding 10px 24px, box-shadow 0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.85). On hover the gradient brightens 6%; on active the gradient inverts with inset 0 2px 6px rgba(0,0,0,0.3). Page ground #f5f5dc.
2. Build a leather panel: #8b7355 fill with a 3% dot texture (5px radial-gradient grid), 12px radius, 24px padding, box-shadow 0 8px 16px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.70), inset 0 -1px 0 rgba(0,0,0,0.12). Text in cream, labels 12px/700 at 0.1em tracking.
