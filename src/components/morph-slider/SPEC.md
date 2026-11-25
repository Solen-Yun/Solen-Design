Implement the "MorphSlider" component from zero: a WebGL image slider that melts between slides — the outgoing and incoming images warp through one of four displacement fields (fractal-noise melt, pointer-centered ripple, slice shear wipe, angular swirl), separated by chromatic aberration at the transition peak, with an idle drift that keeps the canvas breathing between changes. Drag the stage to scrub the morph by hand; captions crossfade with a blur; prev/next buttons, indicator dots, autoplay and keyboard arrows are built in. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + WebGL, two files only: MorphSlider.jsx (entry, React chrome, pointer wiring) plus an embedded engine class (renderer, textures, tweens) and MorphSlider.css (stage, caption, buttons, dots). Rendering uses a small WebGL helper library (renderer/program/mesh/triangle/texture primitives) and a tweening library drives the progress uniform. React >= 18. No iframe.
- Root is a `div.morph-slider` filling its container (position relative, overflow hidden, background #0c0c0e, touch-action pan-y, user-select none) with `border-radius` from the radius prop and two CSS vars derived from duration (`--ms-swap` = 0.66 × duration for caption crossfade, `--ms-dot` = 0.45 × duration for dot morph). Inside: `div.morph-slider-stage` (absolute inset 0, grab/grabbing cursors, tabIndex 0, role group with aria-roledescription "carousel", focus-visible inset ring, keydown handler) holding the WebGL canvas (DPR min(devicePixelRatio, 2), opaque, clear colour near-black); an optional caption block (absolute left 22 bottom 22, pointer-events none, aria-live polite) where every slide's caption sits stacked in one grid cell — active caption fades/slides in, inactive fade out with a 6px blur; optional 40px round glass prev/next buttons at the vertical centre edges; optional indicator dots (role tablist) centred 18px from the bottom, the active dot widening to 22px.
- One fullscreen triangle. Two texture slots (current/next) initialised to a 4×4 dark fallback so the slider shows a dark card until each image loads; every item's image loads once (crossOrigin anonymous, no mipmaps) and its natural size feeds the cover-fit math. If an image fails, its fallback stays — no crash.
- Fragment shader, per frame: a gentle idle drift warps UVs with slow sines (scaled by the drift prop); then the transition — progress p (0–1) and envelope sin(p·π): "melt" displaces both UVs oppositely along a 5-octave fractal-noise gradient (frequency from the scale prop, amplitude from intensity) and masks the mix by noise vs p; "ripple" pushes a ring outward from the pointer position with a sine wave, masking by ring distance; "shear" shifts 14 horizontal rows by hashed random amounts and wipes with a per-row jittered threshold moving with direction; "swirl" counter-rotates the two images around the centre (stronger toward the centre, intensity-scaled). Chromatic aberration (aberration × envelope × 0.03, three horizontal taps per image) peaks mid-transition. Both images cover-fit the canvas aspect, mix by the mode's mask, then a radial vignette mixes the overlay colour in at the edges (up to 28%). Reduced motion collapses all displacement, aberration and drift (a plain crossfade).

## Motion & interaction

- Progress is tweened: programmatic next/prev tweens 0→1 over the duration prop with the ease prop (a tween-library easing string, default power2.inOut) and commits the target (current texture ← next, progress reset); going backward tweens the same shader with direction = −1. Reduced motion caps duration at 0.4s.
- Drag: pointerdown arms a drag (unless already animating); horizontal movement maps to progress = |dx|/width with direction from sign — crossing zero direction re-prepares the next texture; past 50% of progress the aria-live index announces the incoming slide. Release commits forward if progress > 0.4 (0.5s power2.out) or springs back otherwise; pointer capture keeps the drag alive; pointercancel releases. Non-loop mode blocks drags and steps past the ends.
- Pointer position (0–1) updates a uniform for the ripple centre on every pointerdown.
- Autoplay: a timeout chain fires next every autoplayDelay seconds while not hovered (mouseenter/mouseleave gate it) and resets on each index change; loop=false stops at the last slide.
- Keyboard: ArrowRight/ArrowLeft on the focused stage step forward/back (preventDefault). Dots jump one step toward the chosen slide (nearest direction), guarded while animating.
- Loop mode wraps indices; non-loop clamps. Same-page instances are independent. Unmount: kill the tween, disconnect the resize observer, remove listeners, delete textures/program, lose the WebGL context, remove the canvas; a webglcontextlost listener cancels the frame loop.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { image: string; caption?: string }[] | built-in set of 4 photo slides | Slides to morph between; captions show in the crossfade block. Precise default photos are code-embedded. |
| startIndex | number | 0 | Slide shown first (also re-seeds the engine when changed). |
| transition | "melt" \| "ripple" \| "shear" \| "swirl" | "melt" | Displacement field used during morphs. |
| duration | number | 1.1 | Morph duration, in seconds (also scales caption/dot timing). |
| ease | string | "power2.inOut" | Tween-library easing name for programmatic morphs. |
| intensity | number | 0.55 | Displacement strength of the active transition. |
| scale | number | 2.4 | Noise frequency for the melt transition. |
| aberration | number | 0.35 | Chromatic aberration strength at the transition peak. |
| drift | number | 0.4 | Idle UV breathing between transitions, 0 disables. |
| autoplay | boolean | false | Advances to the next slide every autoplayDelay seconds. |
| autoplayDelay | number | 4 | Autoplay interval, in seconds (min 1). |
| loop | boolean | true | Wraps around the ends; false clamps. |
| radius | number | 16 | Root corner radius, in px. |
| overlayColor | string | "#000000" | Colour mixed into the vignette at the edges. |
| showCaptions | boolean | true | Renders the caption crossfade block. |
| showControls | boolean | true | Renders the prev/next glass buttons. |
| showIndicators | boolean | true | Renders the dot tablist. |
| className | string | "" | Extra class names for the root. |
| ...props | - | - | Remaining props spread onto the root element. |

## Delivery & validation

- Deliver the complete content of MorphSlider.jsx and MorphSlider.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all four transitions visibly differ and melt cleanly with no hard seam at progress 0 or 1; chromatic aberration peaks mid-morph and vanishes at rest; drag scrubs the morph both directions, commits past 40% and springs back below; rapid next/prev during an animation is ignored (no texture corruption); non-loop mode clamps ends for buttons, drags and dots; loop mode wraps; captions crossfade with blur and the live region announces changes; autoplay pauses on hover and resets on index change; arrows work on the focused stage; dots enlarge when active; images that fail show the dark fallback; reduced motion crossfades flatly with capped durations; resize keeps the cover fit; unmount leaves no tween, observer, listeners, textures or context; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
