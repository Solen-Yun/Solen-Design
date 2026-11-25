# Diffraction Foil — Style Reference

> Light is the ink: let the silver respond to one shared lamp according to the grating equation.

**Theme:** dark

The diffraction-foil style does not fake iridescence with a translating rainbow gradient — the color is computed from grating diffraction. A 1500 nm grating produces a spectrum under an off-screen lamp 300 px away; the relative angle of the surface normal and the lamp decides the wavelength, and most of the surface still reads as silver. Orders 1, 2 and 3 are weighted 1, 0.5 and 0.3. A near-black print sheet and hairline crop marks set off the embossed foil; the structure stays restrained and the material does the talking. The interactive version shares a single WebGL2 context across the whole page and ships a CSS stand-in that follows the same lamp.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Print Sheet | `#0c0b10` | `--color-print-sheet` | The near-black canvas of the page, so the shifting foil and its spectrum hold the focus. |
| Panel | `#141319` | `--color-panel` | The ground of dark cards and containers, layered with a very fine white border. |
| Dark Silver Foil | `#a3a2af` | `--color-dark-silver` | The grey-silver base of the dark foil; the iridescence only lands where the angle agrees. |
| Light Silver Foil | `#e9e8f0` | `--color-light-silver` | The light foil that carries dark ink type — not a substitute for pure white. |
| Ink | `#16151c` | `--color-foil-ink` | Used only for headings and button labels printed on light silver foil, never over a rainbow band. |
| Text | `#ececf2` | `--color-text` | Primary text on the print sheet and dark panels — high contrast without glare. |
| Secondary Text | `#a9a8b6` | `--color-text-secondary` | Explanations, captions and secondary content; one level back, never shrunk into unreadability. |
| Focus Silver | `#c9c8d4` | `--color-focus-silver` | Keyboard focus, range sliders and the restrained action button — the visible outline. |
| Sampled Spectral Red | `#d2052d` | `--color-spectrum-red-sample` | One red-end sample from the 1500 nm CSS spectrum strip; only ever part of the dynamic spectrum. |
| Sampled Spectral Green | `#00d777` | `--color-spectrum-green-sample` | The computed green sample on the CSS spectrum strip — not a fixed component fill. |
| Sampled Spectral Violet | `#6600e1` | `--color-spectrum-violet-sample` | The computed violet sample on the CSS spectrum strip; it moves with the lamp and the diffraction order. |

## Typography

### Sans Serif — the whole site uses the sans stack; display type is bold and compact, secondary markers use monospace and wide tracking. No new families are introduced.

- **Substitute:** system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700, 800
- **Sizes:** 12, 14, 16, 20, 24, 32, 48, 72
- **Line height:** 1.05 (display), 1.2 (headings), 1.65 (body)
- **Letter spacing:** -0.025em on display, 0.2em on uppercase labels

### Monospace — for the grating equation, nanometre values, redemption codes and sparse technical labels, never for long body copy.

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, Consolas, monospace
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 18
- **Line height:** 1.2 (display), 1.4 (headings), 1.65 (body)
- **Letter spacing:** 0.04em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Sans Serif | 800 | 72px | 1.05 | -0.025em | `--text-display` |
| heading-lg | Sans Serif | 800 | 48px | 1.12 | -0.02em | `--text-heading-lg` |
| heading | Sans Serif | 800 | 32px | 1.2 | -0.015em | `--text-heading` |
| subheading | Sans Serif | 600 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Sans Serif | 400 | 16px | 1.65 | — | `--text-body-lg` |
| body | Sans Serif | 400 | 14px | 1.65 | — | `--text-body` |
| label | Monospace | 500 | 12px | 1.4 | 0.2em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards and foil panels | 16px–24px |
| buttons and input fields | 12px |
| pills and star seals | 999px |
| section dividers | 0px; 1px border |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Foil Trading Card

**Role:** the collectible's main body — a dark card frame carrying a wide foil face

A #141319 frame with a fine white 10% border and 16 to 24px radius; the foil face inside has a 1.8:1 aspect ratio. The title is printed near the bottom edge, over a light area; the caption and number use #a9a8b6 in monospace. The edge may carry a dark drop shadow, but the foil face itself takes no heavy shadow over it.

- **Sizes:** foil face 1.8:1; frame padding 20px–24px
- **States:** spectrum follows the shared lamp; non-foil card frame remains still

### Light Foil Button

**Role:** the primary action on light silver foil, where pressing bends the material without moving the layout

Built from a bright multi-layer silver ground, a screen highlight and an overlay spectrum; dark #16151c ink type, 12px radius, minimum height 44px, 24px horizontal padding, 14px/600 type. A fine inner white highlight and a dark drop shadow sit inside the edge; keyboard operation keeps a 2px #c9c8d4 outer outline.

- **Sizes:** minimum height 44px; 12px radius
- **States:** press: bend shading normal up to 14° and spring back; never translate the button

### Grating Controls

**Role:** letting the reader watch how incidence angle and groove spacing change the diffraction orders

Two horizontal range controls inside a dark panel: lamp angle 0°–70°, and spacing 800–2200 nm in steps of 50 nm; the live values and the 1–3 diffraction positions are shown next to them. The track uses #c9c8d4 as its silver accent, labels are 14px, and the values are set in monospace.

- **Sizes:** panel padding 24px–32px; two 44px-high controls
- **States:** changing angle or period updates computed wavelength markers and spectral strip

### Foil Material Samples

**Role:** side-by-side display of the groove differences between rainbow film, concentric starburst and crushed facets

Uniform size, 12px radius, on a #141319 card ground; the graphics use a crossed grating, circular grooves and random facets in turn. Brushed grating and thin-film interference need WebGL2's per-pixel effect, shown with a real shader preview rather than a fake static color block.

### Redeem-Code Field

**Role:** the short code used to redeem a collectible card or its packaging

Panel ground #141319, a 1px rgba(255,255,255,0.15) border, 12px radius, 12px 16px padding; the placeholder format is XXXX-XXXX-XXXX, set in uppercase monospace at 0.2em tracking with #6c6b78 placeholder text. The focus border switches to #c9c8d4, keeping the focus ring visible.

- **Sizes:** 14px monospace; 12px 16px padding; 12px radius
- **States:** input uppercases characters and announces incomplete/valid format; validation does not depend on color alone

### Collector Navigation

**Role:** a light row of navigation at the edge of the sheet, rather than a heavy app bar

Near-black ground, a 1px rgba(255,255,255,0.1) hairline along the bottom, 24px horizontal padding; the wordmark may use an ink-colored foil treatment, ordinary links stay #a9a8b6. Only a short action button sits on the right, and on desktop a text link may offer the HTML download.

- **Sizes:** roughly 56px high; 24px horizontal padding
- **States:** hover raises text contrast; keyboard links keep the silver offset outline

## Do's and Don'ts

### Do

- Compute the color with λ = d × |dot(h, k)| / m, with d defaulting to 1500 nm and orders 1, 2 and 3 weighted 1, 0.5 and 0.3.
- Use a shared pointer lamp 300 px off-screen; the color follows the direction angle, and the silver shows where nothing diffracts.
- Treat the violet, blue, green, yellow and red shifts as a computed dynamic spectrum, never a fixed palette.
- Share one WebGL2 context across the whole page's interactive effect, drawing item by item and copying into each element's canvas.
- Provide a CSS stand-in driven by the same lamp for users who do not support or have disabled WebGL.
- Land the interaction feedback on the normal and the light: a press tilts the normal by at most 14°, with spring stiffness 320 and damping ratio 0.32.
- Limit dark ink to the bright silver foil; body copy on the dark sheet uses #ececf2 and secondary text uses #a9a8b6.
- Respect reduced motion: fix the lamp in place and stop orbital movement and spring overshoot.

### Don't

- Don't fake grating diffraction with a static iridescent gradient or a translated background-position.
- Don't flood the foil with rainbow; most of the surface must still read as silver.
- Don't set ink type over a high-saturation spectrum; move the type to a light silver area instead.
- Don't create a WebGL context per element or repeat the expensive shader per element.
- Don't change the color with a cycling hue-rotate; that loses the explainable relation between grating and lamp.
- Don't generate fake CSS color-block previews for the WebGL-only brushed or holographic styles.
- Don't interleave layout reads with style writes; measure first, then draw or write variables in one pass.
- Don't keep auto-orbit, bounce or overshoot in reduced-motion mode.

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Print Sheet | `#0c0b10` | Near-black page ground supporting the foil. |
| 1 | Raised Panel | `#141319` | Content cards use a 10% white hairline. |
| 2 | Dark Silver Foil | `linear-gradient(#4f4e59, #a3a2af 28%, #5e5d68 50%, #adacb9 76%, #575661)` | Grey metal under a spectrum blended with screen. |
| 2 | Light Silver Foil | `linear-gradient(#b4b3bf, #e9e8f0 30%, #bdbcc8 52%, #ecebf2 78%, #b6b5c1)` | Light metal uses overlay to preserve ink contrast. |
| 3 | Diffracted Spectrum | `1500 nm grating; orders 1:0.5:0.3 over silver` | Computed from lamp angle, never a static RGB fill. |

## Elevation

- **Trading card:** `0 24px 48px -28px rgba(0,0,0,0.9)`
- **Light-foil top rim:** `inset 0 1px 0 rgba(255,255,255,0.6)`
- **Dark panel:** `1px solid rgba(255,255,255,0.1); no broad glow`
- **Lamp highlight:** `radial highlight within 150px of shared lamp`

## Imagery

Show real spectral foil, collectibles or macro details of packaging, keeping areas where the metal base is recognizable. Static displays use a precomputed spectrum strip over a silver ground with a directional highlight; avoid photo noise drowning the fine grooves. WebGL-only brushed and holographic styles need actual shader previews.

## Layout

The print sheet's main container is capped at 1280px, with 24px padding on mobile and 40px on desktop; a hairline above each block and a vertical rhythm of 48px on mobile / 64px on desktop. Bright faces use the 1.8:1 wide card, laid out as one main card beside two square material samples; the reading area leaves enough whitespace to tell the print sheet, the panels and the foil apart.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- background: `#0c0b10`
- panel: `#141319`
- text: `#ececf2`
- secondaryText: `#a9a8b6`
- inkOnLightFoil: `#16151c`
- silver: `#c9c8d4`
- brightSilver: `#e9e8f0`

EXAMPLE COMPONENT PROMPTS:

1. Build an interactive foil collectible card. The canvas is #0c0b10; the card frame is #141319 with a fine 10% white border, holding a 1.8:1 silver foil face. Compute the grating wavelength with λ = d × |dot(h, k)| / m, d = 1500 nm, with orders 1 / 2 / 3 weighted 1 / 0.5 / 0.3; one shared pointer lamp 300 px off-screen drives the whole page, and the silver ground should show over most of the area. Blend the bright foil with overlay and the dark foil with screen. Use one WebGL2 context for the whole page and provide a CSS stand-in controlled by the same spectrum strip and lamp; pressing bends the normal only and never moves the layout. Under reduced motion the lamp stops. Verify: the color changes with the lamp angle, most of the surface reads as silver, the card size stays stable, the focus ring is clear, and the CSS stand-in works.
