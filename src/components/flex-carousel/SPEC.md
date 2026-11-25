Implement the "FlexCarousel" component from zero: an infinite horizontal row of photo cards that flows through an invisible "liquid glass" lens at its edges — cards bend, curl and split into spectral fringes as they pass the lens zone, and snap into a crisp flat row at the center where one card is active. Cards can be dragged, wheel-scrolled, keyboard-stepped, and clicked to open a focused enlarge; a caption with title and a rolling digit counter sits under the row. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + WebGL2, two files only: FlexCarousel.jsx (entry, layout, physics, input, two-pass rendering) and FlexCarousel.css (caption, counter, live region, cursors). Rendering uses a small WebGL helper library (renderer/program/mesh/triangle/plane/texture/render-target primitives). React >= 18. No iframe.
- Root is a `div.flex-carousel` filling its container (position relative, overflow hidden, cursor grab, touch-action pan-y, user-select none, outline none) with `tabIndex={0}`, `role="region"`, `aria-roledescription="carousel"`, `aria-label="Image carousel"`, and an inline `--flex-carousel-half` (= clamped cardHeight × 50%) used to position the caption. A hidden WebGL canvas (aria-hidden, block, 100% × 100%) is prepended inside. Cursors change via data attributes: `data-hover="open"` → zoom-in, `data-hover="close"` → zoom-out, `data-dragging` → grabbing; `:focus-visible` draws an inset 2px ring.
- WebGL2 with alpha, premultipliedAlpha, antialias false, depth false, DPR min(devicePixelRatio, 2) further capped by a 4.5M-pixel budget. If WebGL2 is unavailable the effect silently does nothing (context is lost intentionally).
- Two-pass pipeline each dirty frame: (1) every visible card is drawn into an offscreen render target (mipmapped, regenerated per frame) by a card program — each card is a rounded-box SDF mask (radius prop, DPR-scaled edge), cover-fit texture with a 1.08 zoom crop, horizontal `uShift` pan driven by the card's distance from center (a tilt-shift/parallax feel), alpha fade-in over 0.45s after its image loads, and a flat average-colour placeholder sampled from an 8×8 canvas probe of the image before it's ready; cards are drawn far-to-near (sorted by |distance|), tiled ±3 loop cycles, culled 40px beyond the viewport. (2) A fullscreen lens program samples the target texture and displaces it: the lens is a rotated superellipse (exponent = 2 + (1 − roundness)^1.5 × 10, half-extents lensWidth × width/2 and lensHeight × width/2, rotated by tilt), with a smooth inner/outer falloff band (outer = 1.6 × inner, inner = reach × average span). Inside the falloff, pixels are lifted upward by a quintic ramp scaled by bend, swirled along the lens tangent (curl: "twist" flips direction per side, "rise" always up, "fall" always down), and split into RGB fringes by a 12-tap vertical dispersion sample weighted around 0.15/0.5/0.85 wavelengths. Derivative vectors are clamped to keep textureGrad shimmer-free.
- Scene alpha and lens strength come from the intro effect envelope; the final pass multiplies by sceneAlpha so the whole canvas can fade in.
- If no settings/items exist yet, the frame loop idles; the loop self-sleeps: it keeps requesting frames only while animating, dragging, dirty, or the intro is waiting, and resumes on wake() (prop changes), image load, input, resize, or visibilitychange.

## Layout & physics

- Card layout: cardH = max(24, cardHeight × container height); each card's width = aspect × cardH where aspect comes from the fit prop ("square" 1, "portrait" 0.75, "landscape" 4/3, or "natural" — the loaded image's own aspect). Cards are laid in a row with `gap` spacing; the row length is the loop size, and positions wrap modulo it (rendered ±3 cycles so the row is endless). Resize remaps pos/goal into the new metrics so nothing jumps.
- Motion is a spring toward `goal`: stiffness 55 in spring mode, 80 in wheel mode, 9 during the spin intro; damping = 2√stiffness, integrated in 240Hz sub-steps; settles when within 0.05px and 0.5px/s. Long travel re-bases positions by whole loops to keep numbers small.
- Wheel: deltaX (or deltaY, shift-swapped) is clamped to ±120 and scaled ×1.25 onto goal; vertical wheel only participates when captureWheel is on; ctrl+wheel is ignored; after 150ms without wheel input the goal re-snaps to the nearest card.
- Drag: pointerdown arms a drag after 5px horizontal movement (10px on touch, and vertical touch intent cancels it for page scrolling); dragging maps 1:1 px to position with zero velocity; on release, velocity comes from the last 100ms of samples (×1000, flipped), the landing is snap(pos + velocity × 0.32), and a fast flick that lands in place force-advances one card. Pointer capture keeps the drag alive; pointercancel re-snaps.
- Click/tap on a card: if it's already the centered active card → onSelect callback and (with focusOnClick) open the focus mode; if it's an off-center card → spring to it and open focus automatically once arrived (pending focus cancelled if the target changed).
- Focus mode: the focused card scales up to at most 84% of height / 92% of width (clamped 1–1.3) on a spring (stiffness 64) while the lens strength fades out and all other cards slide outward (0.7 × width) and fade with a distance-based stagger; the caption counter fades out; clicking anywhere, pressing Escape, or starting a drag closes it. A CSS var `--flex-carousel-lift` carries the live scale to the caption position.
- Active index = card nearest the center; changes fire onChange(index, item) and re-render the caption. `squeeze` squashes all card widths by up to squeeze × energy, where energy is an eased function of travel speed (rise 0.07s / decay 0.35s); `liquid` lets a velocity-driven deform scalar (spring stiffness 120, damping 0.32 × critical) wobble the lens half-extents and x-offset for a jelly feel.
- Lens position: follows the pointer with a spring (k = 110, damping 0.8 × critical) when followCursor is on and the pointer hovers (not while dragging/touch/focused); otherwise it rests at the container center.
- Intro: waits for all images (or a 3.5s timeout) then plays intro kind — "rise" (cards rise from below with distance stagger over 2.1s), "bloom" (scale-in over 1.6s), "spin" (the row starts a loop-and-a-half away and springs in over 2.2s), "deal" (cards slide in from their offsets over 1.5s), "fade" (simple 0.35s fade); reduced motion forces "fade". Skipped by any pointerdown or wheel.
- Autoplay: when enabled and settled, not hovered/pressed/focused, not in focus mode, ≥3s after the last interaction and ≥interval seconds after the last step, it advances one card (disabled under reduced motion).
- Reduced motion also zeroes energy/deform/lens-shift contributions (uShift forced 0).

## Caption & accessibility

- Caption (when captions on and the intro has revealed): the active item's title (or alt, or `Image N`), with an optional subtitle line, plus a counter "NN / NN" whose digits roll on a vertical 0–9 reel (translateY −digit × 10%, 600ms ease). The caption animates in once; the title replays its slide-up on each change; both animations are disabled under prefers-reduced-motion.
- A visually hidden aria-live region announces "title, i of n" on every active change. Keyboard on the focused container: ArrowRight/ArrowDown step forward, ArrowLeft/ArrowUp step back, Home/End jump to first/last, Enter/Space select + focus the active card, Escape closes focus mode. Items accept `{ src, alt?, title?, subtitle? }`; an empty items array falls back to the built-in default set.
- Unmount: cancel frames, disconnect both observers (resize + intersection visibility gating), remove all listeners, dispose textures, lose the WebGL context, remove the canvas. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { src: string; alt?: string; title?: string; subtitle?: string }[] | built-in set of 12 photo cards | Cards in the endless row; widths follow each image's aspect unless fit is fixed. Precise default photos are code-embedded. |
| preset | "liquid" \| "ribbon" \| "vortex" \| "arch" | "liquid" | Lens character preset; the lens* props below override individual preset values. |
| intro | "rise" \| "bloom" \| "spin" \| "deal" \| "fade" | "rise" | First-reveal animation; reduced motion forces "fade". |
| cardHeight | number | 0.5 | Card height as a fraction of the container height. |
| gap | number | 12 | Gap between cards, in px. |
| radius | number | 0 | Card corner radius, in px. |
| fit | "natural" \| "square" \| "portrait" \| "landscape" | "natural" | Card aspect source; natural uses each image's own aspect. |
| lensWidth | number | preset (0.74 liquid) | Lens half-extent as a fraction of width. |
| lensHeight | number | preset (1.18 liquid) | Lens vertical half-extent as a fraction of width. |
| tilt | number | preset (62 liquid) | Lens rotation, in degrees. |
| roundness | number | preset (1 liquid) | Superellipse roundness 0–1; 1 is elliptical. |
| bend | number | preset (0.34 liquid) | How far pixels bend through the lens. |
| reach | number | preset (0.38 liquid) | Width of the lens falloff band. |
| curl | "twist" \| "rise" \| "fall" | preset ("twist" liquid) | Direction of the swirl on each side. |
| dispersion | number | preset (0.45 liquid) | RGB fringe separation strength. |
| liquid | number | preset (0 liquid) | Jelly deform of the lens with velocity, 0–1. |
| followCursor | boolean | preset (false liquid) | The lens follows the pointer while hovering. |
| squeeze | number | 0.2 | How much fast motion squashes card widths, 0–1. |
| focusOnClick | boolean | true | Clicking the centered card opens the enlarged focus mode. |
| autoplay | boolean | false | Advances one card every interval when idle. |
| interval | number | 4 | Autoplay delay, in seconds. |
| captions | boolean | true | Shows the title and rolling counter under the row. |
| captureWheel | boolean | true | Lets vertical wheel scroll drive the carousel. |
| onChange | (index: number, item) => void | - | Called when the centered card changes. |
| onSelect | (index: number, item) => void | - | Called when a centered card is activated/clicked. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of FlexCarousel.jsx and FlexCarousel.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the row is endless in both directions with correct wrap tiling and no popping at loop boundaries; cards bend/curl and split into fringes at the lens and are crisp at center; drag with flick momentum lands on the nearest card and a hard flick always advances; wheel and shift+wheel navigate, vertical wheel obeys captureWheel; clicking a neighbor scrolls to it then focuses, clicking the centered card focuses immediately; focus mode scales the card, slides others away, and Escape/click/drag closes; arrows/Home/End/Enter/Space/Escape all work while focused; onChange and onSelect fire with the right index; presets liquid/ribbon/vortex/arch each look distinct; captions roll digits on change and hide the counter in focus mode; placeholder colour shows until each image loads; missing images fail gracefully; autoplay advances only when settled, unhovered and unfocused; prefers-reduced-motion plays a plain fade, freezes deform/shift, and disables autoplay; resize remaps without jumps; the frame loop sleeps when settled and resumes on interaction; unmount leaves no listeners, observers, textures or context; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
