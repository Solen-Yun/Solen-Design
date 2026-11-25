Implement the "BorderGlow" component from zero: a dark card whose 1px border is a mesh gradient of coloured radial pools, where the portion of the border nearest the cursor catches fire — a directional cone of the gradient sweeps around the frame following the cursor angle, a soft outer glow bloom escapes the frame on the same bearing, and a faint mesh fill washes the card face near the edges. Edge proximity gates everything: dead centre is dark, the closer the pointer gets to the frame, the harder the glow burns. An optional idle sweep animates the cone around the border without a pointer. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: BorderGlow.jsx and BorderGlow.css. React >= 18; no runtime dependencies. All lighting is pure CSS gradients, masks and blend modes driven by two custom properties.
- Root is a `<div class="border-glow-card">` (plus `border-glow-card--light` when the background colour is light, plus any className): position relative, display grid, isolation isolate, transform translate3d(0,0,0.01px), border 1px solid rgb(255 255 255 / 15%), background var(--card-bg), radius var(--border-radius), overflow visible, and a six-step layered box-shadow ladder (0 1px 2px up to 0 32px 64px, rgba(0,0,0,0.1)). The light-surface variant flips the border to rgb(24 24 27 / 12%), softens the shadow ladder, and forces the glow layers to mix-blend-mode normal.
- Custom properties injected from props: --card-bg, --edge-sensitivity, --border-radius, --glow-padding (px), --cone-spread, --fill-opacity, plus the glow and gradient variable sets below. The CSS derives --color-sensitivity = --edge-sensitivity + 20 and defaults --edge-proximity to 0, --cursor-angle to 45deg.
- Three stacked layers, all absolute inset 0 with radius inherit, z-index −1 (except the outer glow), opacity transitions 0.25s ease-out when visible and 0.75s ease-in-out when hidden (a layer goes dark whenever the card is not hovered and not sweep-active):
  1. `::before` — the mesh-gradient border. Background is a border-box stack: card-colour padding-box underlay, a transparent border-box, then seven radial-gradient pools (see palette) plus a base linear gradient, all border-box. It is masked by a conic gradient `from var(--cursor-angle) at center`: opaque for `coneSpread%`, easing to transparent over the next 15%, transparent through the middle, symmetric on the far side — so only the arc of the border facing the cursor shows the gradient. Opacity = (proximity − colorSensitivity) / (100 − colorSensitivity).
  2. `::after` — the mesh-gradient face fill. The same seven pools and base gradient on the padding-box, masked by a composite of a base fill minus a large central ellipse plus four small corner ellipses, then intersected with a conic gradient from the cursor angle — colour washes the face only near the edges and only on the cursor's side. Opacity = fillOpacity × the same proximity term, mix-blend-mode soft-light.
  3. `.edge-light` — the outer bloom. Span absolutely positioned at `inset: calc(var(--glow-padding) * −1)`, masked by a wide conic gradient from the cursor angle (opaque 0–2.5% and 97.5–100%), mix-blend-mode plus-lighter, z-index 1, pointer-events none. Its `::before` (inset var(--glow-padding)) carries 14 box-shadow rings — 7 inset + 7 outset — of the glow colour at 100/60/50/40/30/20/10% alphas, with spreads up to 50px, forming a soft halo that leaks past the frame. Opacity = (proximity − edgeSensitivity) / (100 − edgeSensitivity).
- The content sits inside `.border-glow-inner` (flex column, relative, z-index 1, overflow auto).
- Palette: seven radial gradients at fixed positions (80% 55%, 69% 34%, 8% 6%, 41% 38%, 86% 85%, 82% 18%, 51% 4%), each `radial-gradient(at <pos>, <colour> 0px, transparent 50%)`; colours are picked from the colors array by the index map [0,1,2,0,1,2,1] (3 colours spread over 7 pools). A `--gradient-base` linear gradient of colors[0] underlays them.

## Pointer engine

- `onPointerMove` on the root converts the pointer to card-local coordinates, then computes two values and writes them as custom properties:
  - Edge proximity: for each axis, k = halfSize / |pointer − centre| (infinite when exactly centred); proximity = clamp(1 / min(kx, ky), 0, 1) — the fraction of the way toward the nearest frame edge along the dominant axis, written as 0–100 with 3 decimals.
  - Cursor angle: atan2(dy, dx) in degrees + 90 (0 = bottom of the card), wrapped to 0–360, written as `Ndeg` with 3 decimals.
  No listeners beyond this handler; the CSS does all the lighting.
- Light-surface detection: a 3/6-digit hex background whose luma (0.2126R + 0.7152G + 0.0722B) exceeds 180 switches to the light variant; non-hex values always count as dark.

## Idle sweep

- With `animated`, the component runs a scripted pass around the frame on mount/re-enable: edge proximity ramps 0 → 100 over 0.5 s (ease-out cubic); cursor angle travels 110° → 465° (355° of arc) — the first 50 units of travel over 1.5 s (ease-in cubic), the remaining 50 units over 2.25 s (ease-out cubic) after a 1.5 s delay; proximity then drains 100 → 0 over 1.5 s (ease-in cubic) after a 2.5 s delay. The root carries a `sweep-active` class for the duration so the layers stay lit without hover. Cancelling (prop off or unmount) stops every animation frame and removes the class. Values are driven by a small rAF value animator with delay support.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Card content, rendered inside the inner flex column. |
| className | string | "" | Extra class names for the card. |
| edgeSensitivity | number | 30 | Threshold (0–100) where the outer bloom starts appearing as the pointer nears an edge. |
| glowColor | string | "40 80 80" | Glow hue as an "H S L" triplet (e.g. "268 90 76"); unparsable input falls back to warm gold. |
| backgroundColor | string | "#120F17" | Card background; a light hex flips the whole card to the light variant. |
| borderRadius | number | 28 | Corner radius in px. |
| glowRadius | number | 40 | How far (px) the outer bloom extends past the frame. |
| glowIntensity | number | 1.0 | Multiplier on the glow halo's alpha ladder, 0–1. |
| coneSpread | number | 25 | Angular width (percent of the circle) of the lit arc facing the cursor. |
| animated | boolean | false | Plays a scripted idle sweep of the glow around the border. |
| colors | string[] | ["#c084fc", "#f472b6", "#38bdf8"] | Mesh-gradient pool colours; indices map onto 7 fixed positions. |
| fillOpacity | number | 0.5 | Strength of the soft-light mesh fill on the card face. |

## Delivery & validation

- Deliver the complete content of BorderGlow.jsx and BorderGlow.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the border lights up in a cone pointing at the cursor and rotates as the cursor orbits; the outer bloom and face fill fade in only as the pointer approaches the frame, and the centre of the card stays dark; layers dim smoothly on leave and re-light on enter; custom glow colours tint the whole alpha ladder; the 7-pool mesh uses the given colours in the fixed positions; light backgrounds flip borders, shadows and blend modes; animated mode runs one full sweep and cleans its frames; content scrolls independently inside the card; 375 / 768 / 1440 wide without overflow; no listeners or frames left after unmount.
