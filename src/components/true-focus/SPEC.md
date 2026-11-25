Implement the "TrueFocus" component from zero: a sentence whose words sit blurred except the one currently "in focus"; the focus walks through the words on a timer (or follows your hover), and a viewfinder overlay — four corner brackets, a full box, an underline or a soft highlight block — glides from word to word with a smooth or springy transition while the newly focused word snaps into clarity. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the animation library named below.

## Structure & rendering

- One component in TrueFocus.jsx plus TrueFocus.css. React >= 18. Dependencies: motion at ^12.23.12 (the motion/react entry: the motion component and useReducedMotion).
- Root is a `<div class="focus-container">`: relative, flex, gap 1em, centered, wrapping, user-select none; inline CSS variables: --border-color (borderColor), --highlight-color (color-mix in srgb of highlightColor or borderColor at 30% with transparent), --glow-color, --corner-size, --border-width.
- The sentence splits on separator and drops blank tokens into word spans (`focus-word`, font-size 3rem, font-weight 900, cursor pointer). The active word (index = currentIndex % wordCount, or none when there are no words) gets blur(0), opacity 1 and scale(focusScale) when focusScale ≠ 1; the rest get blur(blurAmount px), opacity unfocusedOpacity and scale 1. Words transition filter/opacity/transform over `duration` seconds with ease for smooth mode or the spring cubic-bezier for spring mode.
- The overlay shapes are absolutely positioned in a pointer-events-none `.focus-frame` layer, measured from the active word's offsetLeft/Top/Width/Height and expanded by focusScale symmetrically, then padded by a fixed 10px gutter. Measurement re-runs whenever the active index or sentence changes, and a ResizeObserver on the container and every word keeps the frame glued across reflows.

## Overlay shapes

- "brackets" (default): four L-shaped corner spans (cornerSize px squares, borderWidth borders, two sides removed per corner) pinned around the padded frame. "box": one rounded rect (6px radius) drawn around the padded frame with a border of --border-width. "underline": a bar of --border-width height sitting just below the word (at frame height + 40% of the gutter). "highlight": no outline at all — a rounded (6px) translucent block (the 30% colour mix) laid slightly larger than the word itself.
- Every shape animates between words with the motion library: initial opacity 0 → animate to the measured geometry and opacity 1, transition either a spring ({ type: "spring", visualDuration: duration, bounce: 0.38 }) or a smooth tween ({ duration, ease cubic-bezier(0.65, 0, 0.35, 1) }); shapes carry a drop-shadow glow of --glow-color.

## Focus loop

- Auto mode (manualMode false, more than one word): a setInterval fires every (animationDuration + pauseBetweenAnimations) × 1000 ms and advances the index — "sequential" steps one word forward and wraps; "random" picks uniformly among the other words. The interval is cleared and rebuilt when any of those settings change.
- manualMode = true stops the timer entirely; hovering a word sets the focus to it (words keep their pointer cursor).
- focusStyle, order, easing, blur, scale, colours, sizes and timing are all live props: changing them re-renders the overlay in place without losing the current index.

## Reduced motion & cleanup

- prefers-reduced-motion (via the library's useReducedMotion): the per-word duration becomes 0 and the spring shape transition is replaced by the instant tween, so focus changes land without travelling; the auto-advance timer still steps between words.
- Unmount clears the interval and disconnects the observers. Multiple instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sentence | string | "True Focus" | The text to walk through. |
| separator | string | " " | Delimiter that splits the sentence into words. |
| manualMode | boolean | false | Stops the timer and focuses whichever word is hovered. |
| focusStyle | "brackets" \| "box" \| "underline" \| "highlight" | "brackets" | The viewfinder overlay shape. |
| order | "sequential" \| "random" | "sequential" | How the auto loop picks the next word. |
| easing | "smooth" \| "spring" | "smooth" | Transition character between words. |
| blurAmount | number | 5 | Blur radius on unfocused words, in px. |
| focusScale | number | 1 | Extra scale of the focused word (and its frame). |
| borderColor | string | "green" | Colour of the brackets / box / underline and the highlight tint source. |
| highlightColor | string | - | Highlight block colour; defaults to a 30% mix of borderColor. |
| glowColor | string | "transparent" | Drop-shadow glow colour behind the overlay shapes. |
| animationDuration | number | 0.5 | Transition time per focus change, in seconds. |
| pauseBetweenAnimations | number | 1 | Hold time on each word between advances, in seconds. |
| cornerSize | number | 16 | Bracket corner square size, in px. |
| borderWidth | number | 3 | Overlay border / underline thickness, in px. |
| unfocusedOpacity | number | 1 | Opacity of blurred words. |

## Delivery & validation

- Deliver the complete content of TrueFocus.jsx and TrueFocus.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependencies: motion at ^12.23.12 (motion/react).
- Validate: the focus walks the sentence in order and wraps; random never repeats the current word; manual mode follows hover and stops the timer; all four overlay styles track the focused word across multi-line wrapping; the frame survives container resizes; blur / opacity / scale swap smoothly with the configured duration; spring easing overshoots once and smooth does not; highlightColor falls back to the borderColor mix; glow shows only when glowColor is set; changing focusStyle/order/easing live keeps the current index; reduced motion lands focus instantly; unmount leaves no interval or observers; multiple instances are independent; the sentence wraps and stays inside 375 / 768 / 1440 wide without overflow.
