Implement the "DitherVeil" component from zero: a photograph printed as a coarse 1-bit dither — ordered Bayer cells, procedural blue noise, engraving lines or true error-diffusion — that the cursor burns through, melting the dither into the full-colour photo along a soft capsule trail that lingers and knits itself back shut cell by cell. Clicks fire expanding shockwave rings that briefly open the photo, an optional idle wander keeps the burn moving, and an intro wipe assembles the dithered image from the centre. Everything renders in two WebGL2 fragment passes. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components (the demo supplies its own image; the component accepts any image `src`).

## Structure & rendering

- Pure React + one small WebGL helper dependency (ogl ^1.0.11) for the renderer/program/mesh wrappers; two files only: DitherVeil.jsx (entry, blue-noise generator, CPU error diffusion, two GLSL programs) and DitherVeil.css (one rule set). React >= 18. No iframe.
- Root is a `<div>` with class `dither-veil` plus `className`/`style`: position relative, width 100%, height 100%, overflow hidden, touch-action pan-y. The canvas fills it (display block), DPR = min(devicePixelRatio, 2).
- Two programs share one fullscreen triangle. The **mask pass** writes a monochrome trail texture into one of two ping-pong render targets at half the canvas size (HALF_FLOAT when EXT_color_buffer_float exists, otherwise UNSIGNED_BYTE with a minimum fade of 1.5/255 so 8-bit trails fully decay). The **view pass** samples the image, the mask and the diffusion texture and outputs the final print.
- The image loads with `crossOrigin=anonymous`; on load its 32×32 thumbnail's border pixels are averaged into a matte colour, and if their variance is below 0.06 the photo counts as "plain-backed" (keyed): the matte background is replaced by paper both in the dither and in the revealed photo, so transparent-looking flat photos sit on the paper colour.
- Image placement follows `fit`: contain or cover of the canvas, computed as a UV scale/offset; the view pass also derives a mip LOD from `cell × texel density` so big dither cells sample a downscaled mip instead of aliasing.

## The dither print (view pass)

- The canvas is divided into square cells of `pixelSize × DPR` px (min 1). Each cell samples one tone from the image, then quantises it to `levels` steps (default 2 = pure 1-bit) after a contrast/brightness grade (slope around 0.5, gamma 1.6). Duotone palette grades luminance between ink and paper; RGB palette quantises each channel separately for colour dithering.
- Four ordered patterns: an 8×8 Bayer matrix computed with bit tricks; a 64×64 blue-noise texture generated once on the CPU (void-and-cluster: greedy swap minimisation over gaussian taps, ranks emitted as grey levels); an engraving pattern (diagonal stripe threshold softened by the Bayer term); and true error diffusion.
- Error diffusion (`floyd` — Floyd–Steinberg weights 7/3/5/16, `atkinson` — six taps at 1/8) runs on the CPU: the image is drawn into a `cols × rows` canvas at cell resolution over the matte colour, graded with the same curve, then diffused along a serpentine (boustrophedon) scan with the kernel mirrored on odd rows. The result is cached in a texture and only recomputed when pattern/levels/palette/contrast/brightness/fit/cell or canvas size changes; if pixel reads throw (tainted canvas) it silently falls back to Bayer.
- Ink/paper are hex strings parsed to RGB. Out-of-frame cells (contain letterboxing) print matte tone; with keying on, cells matching the matte print paper instead.
- Cursor reveal: the mask value per cell is `max(decayed trail, click shockwaves)`; normally larger mask = photo, `reverse` inverts it. In the photo region the crisp full-colour image shows (flat matte areas keyed to paper when applicable). A `rim` fraction converts the transition band into rim-coloured dots: cells whose mask crosses a Bayer-positioned threshold between the dither and photo zones take the rim colour.
- Intro (1.1s, eased quadratic): cells pop in inside an expanding circle from the centre, with a Bayer-dithered edge; before the image loads the screen prints pure ink.

## Mask dynamics & interaction

- The trail texture decays every frame by `dt / linger` (linger seconds; `linger=0` clears instantly). The cursor stamps a capsule from the previous smoothed brush position to the current one with radius `revealRadius × (0.45 + 0.55 × presence)` and a soft band of `radius × softness × 1.6`, at strength = presence. Presence eases toward 1 while the pointer is inside (τ 0.16s) and back to 0 after it leaves, so the trail shrinks and fades rather than vanishing.
- Brush smoothing: an exponential follow with τ 0.035s turns pointer jumps into a fluid stroke; on first entry the brush snaps to the pointer.
- Clicks (any pointer type; mouse requires the left button) push a shockwave — at most 4 live at once, each lasting 1.2s: an expanding ring (reach = distance to the farthest corner, radius easing out on a sin curve) with an interior fill that fades as the wave travels, revealing the photo inside the ring. `clickBurst=false` disables them.
- `wander`: while the pointer is outside, the brush target drifts along two slow layered-sine paths across the canvas, blending in over 1.2s; with `wander` off the trail just decays. Reduced motion disables wandering entirely.
- Listeners (container): pointermove, pointerenter, pointerdown, pointerleave, pointercancel. On resize the mask targets are recreated at the new half-canvas size with the old trail blitted across.
- Frame-loop self-sleep: frames run only while the pointer is inside, wandering, presence > 0.002, bursts are alive, the trail has not fully decayed since presence was last above 0.002 (linger + 150ms), or the intro is unfinished; otherwise the loop stops until an event, prop change or resize wakes it.
- Unmount: cancel the frame, disconnect both observers, drop the image onload, remove all listeners, lose the WebGL context and remove the canvas. Changing `src` tears down and rebuilds the whole engine. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | built-in landscape photo | The image to dither. Any URL or data URI loadable with crossOrigin anonymous. |
| fit | "contain" \| "cover" | "contain" | How the photo fills the canvas; contain letterboxes with matte tone. |
| pattern | "bayer" \| "noise" \| "lines" \| "atkinson" \| "floyd" | "floyd" | Dither pattern: ordered matrix, generated blue noise, engraving stripes, or true error diffusion. |
| pixelSize | number | 2 | Dither cell size in CSS px (min 1, rounded to whole device px). |
| levels | number | 2 | Quantisation steps per tone; 2 is pure black-and-white. |
| palette | "duotone" \| "rgb" | "duotone" | Duotone grades one luminance ramp between ink and paper; RGB quantises channels for colour dither. |
| inkColor | string | "#120f17" | Dark dither ink. |
| paperColor | string | "#f4f1ea" | Light paper colour. |
| contrast | number | 1.15 | Tone slope around mid grey. |
| brightness | number | 0 | Tone offset added after contrast. |
| revealRadius | number | 200 | Cursor brush radius in px. |
| softness | number | 0.6 | Width of the brush's soft edge as a fraction of the radius, 0–1. |
| linger | number | 1 | Seconds for an opened trail cell to knit shut; 0 closes immediately. |
| rimColor | string | "#a78bfa" | Colour of the transition dots at the reveal boundary. |
| rim | number | 0 | Band width of rim-coloured dots at the boundary, 0–0.95. |
| reverse | boolean | false | Inverts the reveal: the dither is the revealed layer and the cursor reprints it. |
| wander | boolean | false | Lets the burn spot wander on its own while the pointer is away. |
| clickBurst | boolean | true | Clicks fire an expanding shockwave that opens the photo. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of DitherVeil.jsx and DitherVeil.css plus install steps and a usage example (pass your own image via `src`); no ellipses, no "fill in the core yourself" placeholders.
- Validate: the photo prints as a dither at the chosen pattern/levels/cell size and re-quantises live when they change; the cursor opens a soft colour trail that lingers and closes cell by cell; rapid strokes leave a continuous capsule trail; clicks fire shockwaves (capped at 4) that fade correctly; reverse flips the reveal; rim dots trace the boundary only when rim > 0; duotone vs RGB palettes both grade correctly; contain letterboxes with matte and cover fills; flat-backed photos key onto paper; wander drifts while idle; changing src rebuilds cleanly; the frame loop sleeps when nothing moves; prefers-reduced-motion disables wandering; unmount leaves no loop, observers, listeners or GL objects; 375 / 768 / 1440 wide containers resize the print and mask without overflow.
