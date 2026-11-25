Implement the "Strands" component from zero: a frosted glass orb with spectral ribbons of light twisting inside it — two families of gaussian light sheets (a warm red-amber family and a cool cyan-blue family) wind along a shared cubic axis, and where they come together the bundle swells into a smooth bulge, like a voice assistant waking. The orb refracts the strands with chromatic dispersion, the whole scene breathes with an activity level, hovering leans and brightens the sphere, and clicking punches a physical pulse into the glass. Everything is a single WebGL2 fullscreen fragment pass; a light-theme mode re-renders the same optics as ink on paper. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React, zero runtime dependencies beyond React >= 18; two files only: Strands.jsx (entry, one raw WebGL2 program, springs/envelopes) and Strands.css (container + canvas rules). Root `<div class="strands-container">` (+ `className`/`style`) fills its host (position relative, width/height 100%, transparent, tap-highlight none); the canvas is appended as a child, aria-hidden, block 100%×100%.
- Context: WebGL2, alpha true, premultipliedAlpha true, antialias false; no context → the canvas is removed and nothing renders. DPR = min(devicePixelRatio, `maxDevicePixelRatio`). One fullscreen triangle, blending disabled. WebGL context loss stops the loop; context restore rebuilds the program and wakes it.
- Colour input: `colors` is a hex string array (3/6-digit, up to 8 entries). The entries are interpolated across 7 fixed roles — red, orange, amber, warmWhite, cyan, blue, deep — so 1 colour paints the whole scene in that hue and 7 map one-to-one. An empty array falls back to the default palette [#d95b56, #ba5046, #ffa24c, #ffe0b3, #93f1ff, #3569fa, #193d9b]. A final global grade multiplies saturation ×1.5 and hue-rotates by `hueShift × 2π` in YIQ space.

## The strands (fragment pass)

- Space: coordinates normalise by min(resolution) / scale (`scale`, min 0.05). The glass sphere radius is 0.42 × `glassSize`, grown from 94% to 100% over the intro and breathing with the click pulse (× 1 + 0.03·pulse).
- Outside the sphere: transparent (plus a faint contact shadow at the bottom in light mode). Inside, the sample is remapped by the refraction lens: a scale factor derived from `refraction` (0–1.8) weighted by bend = r^5.17 — stronger near the rim, identity at the centre; `dispersion` splits the red/blue remap scales by ±0.02·dispersion·bend for chromatic fringes.
- Strand model: two light sheets share a cubic axis curve (bent by `amplitude` and a pointer "lean"); each sheet is a sum of Gaussian fills — a body fill (smoothed erf-based thickness integral), an edge glow pair at the sheet borders, and ridge lines (at `count` ≥ 2 and ≥ 3) — with widths from `thickness`, cross-fades from `spread`, per-sheet σ widened by screen-space derivatives for anti-aliasing and by `glow`. The warm sheet grades warmWhite→amber→orange→orange-edge across its thickness (tinted red at high thickness), the cool sheet grades coolCore→cyan→blue→deep. A mend envelope concentrates all sheets near the meeting point so the bundle reads as one twisted cable.
- The bulge: a travelling bump centred at x ≈ −0.23 (shiftable by lean) multiplies a width term by amplitude × activity × motion — this is the smooth swelling where the strands come together, sliding slowly with the motion phase. A wide white halo follows the bundle centre scaled by `glow`.
- Motion: a 3-vector of layered sines (phases 0.53/0.71/0.41 Hz) drives the phase, bulge height and drift, scaled by sway = 0.75 + 0.45·pace. The clock advances dt × speed × (0.6 + 1.6·pace).
- Activity (`uLevel`, 0–1): scales strand amplitude from 0.25 up to 1.0 (and to 1.12 above 0.65). Its target = min(1.2, max(energy, voice) + hover·0.18 + burst): `energy` is the resting floor (0–1); `voice` is either the `level` prop (clamped 0–1, e.g. from a microphone meter) or, when `listening` is on, a procedural speech envelope (phrase envelope × syllable chatter × stress); hover adds up to 0.18; click bursts add up to 1.2. Activity eases in over 0.12s and decays over 0.4s; pace follows it over 0.8s.
- Light mode: the accumulated light converts to ink — luminance coverage, hue-preserving dark ink, cream cores in hot spots — over a light grey glass body with fresnel edge darkening and a top-left specular; a soft drop shadow appears below the sphere. Dark mode is additive: colour = 1 − exp(−light).
- Intro (1.4s, cubic ease-out, `intro` on): global fade-in plus the sphere growing in; the bundle fades in from the centre outward.
- Grain-free; banding avoided by the exponential tone mapping.

## Interaction & lifecycle

- Pointer (container): pointermove maps to a ±1.2 local space — hover strength = clamp(1.6 − distance, 0, 1), lean target = pointer × 0.8 (eased over 0.35s); pointerleave zeroes both; pointerdown (when `clickPulse`) adds pulse velocity 5 and a burst of 0.9 (burst decays over 0.45s, pulse is a damped spring, ω ≈ 13, ζ ≈ 0.68).
- `interactive=false` freezes hover/lean; `listening=false` and no `level` prop rests at the `energy` floor.
- Frame loop: keeps running while visible (IntersectionObserver), the tab is shown (visibilitychange) and the context is alive; with prefers-reduced-motion the clock and speech freeze, and the loop self-sleeps once all springs (activity, pulse, burst, hover, lean) settle. ResizeObserver re-measures and redraws immediately.
- Unmount: cancel the frame, remove all listeners, disconnect observers, delete program/buffer, lose the context, remove the canvas. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | 7-colour default palette | Palette mapped across the 7 strand roles; 1–8 hex colours. |
| count | number | 3 | Ridge lines on the sheets, 1–3. |
| speed | number | 1 | Animation clock rate. |
| amplitude | number | 1 | Curve amplitude of the strand axis. |
| waviness | number | 1 | Phase modulation of the twist. |
| thickness | number | 1 | Sheet thickness scale. |
| glow | number | 1 | Edge glow and halo strength. |
| taper | number | 1 | Bulge width scale (min 0.05). |
| spread | number | 1 | Cross-fade of the two sheet families. |
| hueShift | number | 0 | Final hue rotation in turns (0–1). |
| intensity | number | 1 | Overall brightness. |
| saturation | number | 1 | Saturation multiplier on the final grade. |
| opacity | number | 1 | Canvas output opacity. |
| scale | number | 1 | Zoom of the whole scene (min 0.05). |
| glass | boolean | true | Renders the refracting glass orb; off = the bare bundle on the page. |
| refraction | number | 1 | Lens strength of the orb, 0–1.8. |
| dispersion | number | 1 | Chromatic fringing of the refraction. |
| glassSize | number | 1 | Orb radius multiplier. |
| rim | number | 1 | Rim ring, haze and specular strength. |
| energy | number | 0.65 | Resting activity floor, 0–1. |
| listening | boolean | false | Drives a procedural speech envelope into the bulge. |
| level | number | - | External activity level (0–1) overriding energy; e.g. a live audio meter. |
| interactive | boolean | true | Hover brightens and leans the orb toward the pointer. |
| clickPulse | boolean | true | Clicks punch a spring pulse into the glass. |
| intro | boolean | true | Plays the 1.4s grow-in. |
| lightMode | boolean | false | Ink-on-paper rendering for light pages. |
| maxDevicePixelRatio | number | 2 | DPR clamp (min 0.5). |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of Strands.jsx and Strands.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the bundle twists inside the frosted orb and swells at the meeting point; hover brightens and leans the sphere; clicking punches a visible pulse; the bulge churns with `listening` and follows a `level` meter; 1-colour and 7-colour palettes both map correctly across the roles; hueShift rotates the scene; `glass=false` shows the bare bundle; lightMode renders readable ink on a white page with a soft shadow; `energy=0` rests quiet, high energy churns; intro grows in once; prefers-reduced-motion freezes the clock and the loop sleeps when settled; WebGL context loss and restore recover without errors; unmount leaves no loop, observers, listeners or GL objects; same-page instances are independent; 375 / 768 / 1440 wide containers keep the orb centred without overflow.
