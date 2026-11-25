Implement the "ScrambledText" component from zero: a block of text whose letters scramble into random characters from a pool and settle back — as a pointer-proximity decode on hover, as one of three physical distortion fields (letters lift off the line, blur out of focus, or magnify away from the cursor), and as expanding click shockwaves that re-scramble every letter the wavefront crosses. An intro decode reveals the whole passage letter by letter when it scrolls into view. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the animation library named below.

## Structure & rendering

- React + CSS, with the GSAP tween library (core, SplitText and ScrambleTextPlugin). Two files: ScrambledText.jsx (splitting, energy field, waves) and ScrambledText.css (layout). React >= 18. No iframe.
- Root is a `<div class="scrambled-text">` — margin 7vw, max-width 800px, monospace family, font-size clamp(14px, 4vw, 32px) — plus className; the color and fontFamily props inject matching inline styles when set. Two children: a visually hidden span with the plain text for screen readers, and an aria-hidden `<p>` holding the visible text (keyed by the string children so a text change rebuilds).
- The visible text is split with the SplitText utility (type "chars", smartWrap, aria off). Every char span is rebuilt as two layers: a hidden sizer span holding the original character (keeps layout and width) and an absolutely positioned glyph span centred with translateX(-50%) and white-space pre — the glyph layer is what scrambles and transforms, so layout never shifts while letters change.
- Character centers are measured lazily (relative to the root, via offsetParent walks) on first pointer use and re-measured on pointerenter, ResizeObserver changes and font load; the measured font size scales all physical offsets.

## Scramble behaviour

- The scramble primitive tweens one glyph with the ScrambleTextPlugin: target text is the original character, source chars come from the scrambleChars prop (default ".:"), tween length and revealDelay are passed per call, ease none, and onUpdate recolours the glyph with scrambleColor while its text differs from the original (cleared otherwise). speed controls how fast the plugin cycles characters (0–1, default 0.5).
- Intro decode (intro on, motion allowed): a paused timeline gives every glyph a scramble tween whose reveal moment is 0.15 + duration × (0.75 × letter-progress + 0.25 × random); an IntersectionObserver (rootMargin "0px 0px -10% 0px") plays it once when the block enters the viewport.
- Pointer modes — effect picks the behaviour:
  - "scramble" (default): pointer moves (rAF-throttled) scramble every glyph within radius px, tween length shrinking with distance (duration × (1 − dist/radius)).
  - "lift": each character carries an energy value eased toward a falloff (1 − (d/radius)²)² from the smoothed pointer and from passing waves; energy translates the glyph up by energy × fontPx × 0.75 × strength.
  - "blur": energy drives filter blur energy × fontPx × 0.24 × strength, opacity 1 − energy × min(0.7, 0.45 × strength), and scale 1 + energy × 0.15 × strength.
  - "magnify": characters are pushed away from the pointer — displacement and scale (1 + energy × 0.85 × strength) with a z-index bump by energy — the displacement vector is smoothed at the same rate as the energy.
- Pointer smoothing and energy dynamics: the smoothed pointer follows the real pointer with a time constant of 0.06s; energy attacks with a 0.08s time constant and releases with trail/3 seconds — trail (default 0.6) is literally how long the distortion lingers behind the cursor.
- Click shockwave (clickBurst on, left button / touch): each pointerdown spawns a wave from the click point with reach = farthest character + fontPx (capped at 4 concurrent waves, oldest dropped); the ring expands with an ease-out over life = 0.45 + reach/1100 seconds and fades over the last 25%. When the ring first crosses a character, that glyph gets a scramble tween of length duration × (0.2 + 0.5 × strengthAt) where strengthAt = 1 − 0.6 × d/reach; in physical modes the ring also feeds band energy (a Gaussian around the ring front, width max(fontPx × 1.3, 16), magnify softened to 0.55) pushing characters outward.
- The raf loop is self-sleeping: it runs only while waves are alive, the smoothed pointer is chasing, or any character's energy exceeds 0.0005; waking happens on pointer events and wave spawns. Changing the effect prop clears all paints immediately.

## Reduced motion & cleanup

- prefers-reduced-motion: reduce — the intro decode is skipped, the physical modes are disabled (a pointer move falls back to plain proximity scramble), and paint clears stay instant.
- Unmount removes pointerenter / pointermove / pointerleave / pointerdown listeners, disconnects the ResizeObserver and the intro observer, cancels both rafs, kills the intro timeline and all glyph tweens, and reverts the split to restore the original DOM. Multiple instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - (required) | The text to scramble; a string change rebuilds the split. |
| radius | number | 100 | Pointer influence radius in px. |
| duration | number | 1.2 | Base scramble tween length in seconds. |
| speed | number | 0.5 | How fast characters cycle during a scramble, 0–1. |
| scrambleChars | string | ".:" | Character pool the scramble draws from. |
| scrambleColor | string | "" | Colour for glyphs mid-scramble; empty keeps the text colour. |
| effect | "scramble" \| "lift" \| "blur" \| "magnify" | "scramble" | Pointer mode; the last three are physical distortion fields. |
| strength | number | 1 | Physical distortion multiplier (≥ 0). |
| trail | number | 0.6 | How long distortion lingers behind the pointer, in seconds-scale units. |
| clickBurst | boolean | true | Clicking spawns an expanding shockwave that re-scrambles. |
| intro | boolean | true | Decode the passage letter by letter when it first enters the viewport. |
| fontFamily | string | "" | Inline font family for the block; empty keeps the stylesheet default. |
| color | string | "" | Inline text colour; empty inherits. |
| className | string | "" | Extra class names for the root div. |
| style | object | {} | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of ScrambledText.jsx and ScrambledText.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: gsap at ^3.13.0 (core, SplitText, ScrambleTextPlugin).
- Validate: the intro decode runs once on scroll-in and each letter settles to its original character; pointer proximity scrambles within radius and letters settle cleanly; lift raises letters near the cursor and drops them back; blur softens and dims them; magnify pushes and scales them with correct stacking; click waves expand, re-scramble the crossed letters and fade without residue (and cap at four concurrent waves); trail stretches the linger time; scrambleColor colours only mismatched glyphs; layout never shifts while glyphs change (sizer layer holds widths); changing text or the effect prop resets paints; reduced motion skips the intro and degrades physical modes to plain scramble; unmount leaves no raf, observers, tweens or split wrappers; multiple instances are independent; 375 / 768 / 1440 wide without overflow.
