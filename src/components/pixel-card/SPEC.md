Implement the "PixelCard" component from zero: a content card whose background is an invisible canvas that fills with twinkling pixels when it activates — pixels pop in radiating from the centre or the cursor with an overshooting ease, brighten in a moving spotlight around the pointer, ripple in expanding shockwaves on click, and drain away again when the card deactivates. Four colour presets, three pixel shapes, hover/click/always triggers and dark/light theming. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + Canvas 2D, two files only: PixelCard.jsx (entry, pixel field engine) and PixelCard.css (surface, edge ring, theme tokens). React >= 18; no runtime dependencies. No iframe, no WebGL.
- Root is a `div.pixel-card` — grid place-items center, default 300×400 px (overridable via style), overflow hidden, rounded by `--pixel-card-radius` (radius prop), carrying data-theme and data-active. Surface: a dark vertical gradient (#17151c → #0f0e13) or light (#ffffff → #f6f6f8) with a large soft shadow; an ::after inset ring (1px edge + 1px top highlight) brightens while active. Children render above the canvas (z-index 1); the canvas is an absolute inset-0 background layer, pointer-events none, aria-hidden.
- Root is focusable (tabIndex 0) unless noFocus (the pink preset defaults to true), with a focus-visible 3px ring; focus/blur activate/deactivate in hover mode.
- Pixel field: a grid of pixels spaced `gap` px (centred so margins are even), each with a random palette tint, base size (pixelSize × 0.25–1.0), twinkle phase/rate, and a jitter value. Density/colours rebuild only when size, DPR (min 2), gap, pixelSize or palette change; the field is rebuilt on resize preserving prior presence values. DPR-scaled canvas, cleared every frame.

## Activation model

- Triggers: "hover" — pointerenter activates (pointerleave deactivates immediately for mouse, after 1.2s for touch), focus activates and blur deactivates (unless noFocus); "click" — pointerdown toggles, clicking outside deactivates, Enter/Space on the focused card toggles; "always" — activates once and stays on. Trigger changes sync at runtime (switching to always turns on; leaving always turns off if unhovered).
- Intro: on first intersection with the viewport (unless reduced motion and not always-triggered), after introDelay ms the card activates; in non-always modes it deactivates again revealDuration + 700ms later — a one-time flourish.
- Activation records the origin: centre of the card, or the pointer position when origin is "pointer" (entry/click coordinates). Per-pixel delays are scheduled over revealDuration: activating staggers from the origin outward (82% distance + 18% jitter); deactivating drains the near pixels first (45% distance + 10% jitter). A pixel's presence rises over 0.26s and falls over 0.22s (instant under reduced motion).
- Click pulse (when clickPulse and reduced motion is off): each pointerdown while active emits a ring from the click point expanding at maxDistance / (0.9 × revealDuration), power decaying to zero at maxDistance + 40; pixels within a 26px gaussian band of the ring grow ×2.4 and brighten.

## Rendering details

- Pixel draw: presence maps size through easeOutBack (overshoot pop, c=1.9) and a mid-rise flash (sin(presence·π) up to ×1.9 size and +0.6 alpha). With speed > 0, pixels twinkle — size breathes 0.62–1.0 and alpha ±0.12 around a sine wave at (speed/35) × 1.35 frequency; rare jittery pixels (> 0.92) flash harder. Base alpha = 0.5 + presence × 0.38, multiplied by the edge-fade mask and the opacity prop.
- Spotlight: a damped spring (stiffness 120, damping 0.9 × critical) tracks the pointer; on hover its power eases to 1, enlarging pixels up to ×3.4 and brightening up to +0.45 within a lens of min(width,height) × 0.38 + 30px, scaled by the spotlight prop.
- Glow: while any presence is visible, a radial gradient in glowColour (resolved through a canvas fillStyle round-trip; presets supply per-theme defaults) radiates from the origin (or the spotlight when active) up to 85% of the larger dimension, at 0.32 × glow × opacity × presence strength.
- Edge fade (fade prop): pixels within 5%–42% of the min dimension from an edge fade out along a quintic — the fill dissolves toward the rim.
- Shapes: square (fillRect), circle (arc), diamond (rotated square at 0.62 scale), all drawn per palette colour in passes with globalAlpha.
- Reduced motion: presence snaps instantly to targets (no stagger animation, no pop/twinkle/spotlight/pulse motion), intro is skipped for non-always triggers; activation still happens on hover/click.
- Frame loop: dt clamped to 50ms; sleeps when not active, no presence left, no pulses, spotlight settled and not hovering; wakes on input, resize, visibility, or prop sync. Unmount: cancel frame, disconnect observers, remove all listeners (including the document-level pointerdown). Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "default" \| "blue" \| "yellow" \| "pink" | "default" | Colour/speed preset: default (gap 5, speed 35, white greys), blue (gap 10, speed 25, sky blues), yellow (gap 3, speed 20, yellows), pink (gap 6, speed 80, rose reds, focus off). |
| colors | string \| string[] | preset palette | Pixel palette overriding the variant; a comma-separated string also works. |
| gap | number | preset (5 default) | Pixel spacing, in px (min 2). |
| speed | number | preset (35 default) | Twinkle speed 0–100; 0 stops the twinkle. |
| pixelSize | number | 2 | Base pixel size, in px (min 0.5). |
| shape | "square" \| "circle" \| "diamond" | "square" | Pixel shape. |
| origin | "center" \| "pointer" | "center" | Where the reveal radiates from. |
| revealDuration | number | 600 | Stagger span of the reveal, in ms (min 50). |
| spotlight | number | 0.5 | Pointer spotlight strength, 0–1. |
| glow | number | 0.5 | Background radial glow strength, 0–1. |
| glowColor | string | preset per theme | Glow colour; any CSS colour, invalid falls back to white. |
| opacity | number | 1 | Global pixel opacity, 0–1. |
| fade | number | 0 | Edge fade strength, 0–1. |
| trigger | "hover" \| "click" \| "always" | "hover" | What activates the field. |
| clickPulse | boolean | true | Clicks emit an expanding ring wave. |
| intro | boolean | true | Plays a one-time flourish when first scrolled into view. |
| introDelay | number | 0 | Delay before the intro flourish, in ms. |
| noFocus | boolean | preset (false; pink true) | Removes the card from tab order and focus activation. |
| theme | "dark" \| "light" | "dark" | Surface, edge and default palette tone. |
| radius | number | 24 | Card corner radius, in px. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root (override width/height here). |
| children | ReactNode | - | Card content rendered above the pixel canvas. |

## Delivery & validation

- Deliver the complete content of PixelCard.jsx and PixelCard.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: pixels pop in from the centre (or the entry point with origin pointer) with the overshoot ease and mid-rise flash, far pixels trailing near ones; hover tracks the spotlight with springy lag and enlarges pixels near the cursor; leave drains pixels near-first; clicks ripple a ring that bulges pixels; click trigger toggles and outside clicks deactivate; always trigger stays lit; intro flourishes once per mount after introDelay; all four variants and custom palettes recolour correctly; shapes switch cleanly; theme light/dark swaps surface, edge and palettes; speed 0 freezes twinkle; fade dissolves the rim; children stay readable above the canvas; reduced motion snaps without stagger/twinkle/pulses; the loop sleeps when settled; unmount leaves no listeners, observers or frames; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
