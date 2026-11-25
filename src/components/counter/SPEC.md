Implement the "Counter" component from zero: an odometer-style number display. Every digit sits on its own 0–9 wheel; when the value changes, digits roll to their new positions with spring inertia, overshoot, and a right-to-left stagger, separators and affixes fade in and out in place, and fast digits blur along their path. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: Counter.jsx (entry, slot model, motion engine) and Counter.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root element is an inline `<span>` with class counter: position relative, display inline-flex, align-items baseline, line-height 1, white-space nowrap, direction ltr, unicode-bidi isolate. Inline styles from props: fontSize (a number becomes px, a string passes through), fontWeight, color from textColor, fontVariantNumeric tabular-nums when tabular is on. CSS custom properties set on the root: --counter-fade = max(0, fade) em, --counter-gap = max(0, gap) px, --counter-padding = max(0, padding) px. Optional className appends; style merges last.
- Exactly three children: a visually hidden span (class counter__sr) holding prefix + formatted label + suffix for screen readers; the visible row (class counter__row, aria-hidden) holding a prefix affix span, one span per slot, and a suffix affix span; a hidden measure row (class counter__measure, aria-hidden) holding the ten locale digit glyphs for width measurement.
- Slots come from Intl.NumberFormat.formatToParts: integer and fraction digits, group separators, the decimal separator, and any other parts (currency symbols, percent sign, units, literals). Slot keys: integer digits i<place> with place counted down from the most significant position, fraction digits f<n>, group symbols g<place>, decimal d, and prefix/suffix parts p-<type>-<n> / s-<type>-<n> ranked ±10000 so they always sort to the two ends. Digit slots rank as -2 × place (integers, most significant first) or 1 + n (fractions); group symbols rank just above their own digit.
- A digit slot renders: an outer box (class counter__digit, box-sizing content-box, digitStyle prop merged inline) containing a hidden sizer with the current digit glyph (keeps the natural width), a window (class counter__window) absolutely inset with overflow hidden and the fade mask, an inner strip (class counter__strip) with ten absolutely positioned numeral spans (class counter__numeral) holding the ten glyphs, each translated by wrap(n - position) × 100%; and, when motionBlur is on, an invisible SVG holding one feGaussianBlur filter (id namespaced per instance via useId) applied to the strip while the digit spins fast. The window mask is a fixed 14-stop linear-gradient expressed against --counter-fade, transparent above and below and opaque across the glyph band, so rolling digits fade out beyond the text instead of clipping hard.
- Symbol slots render a single span (class counter__symbol, clip-path inset(-0.5em 0)) around a white-space:pre text span; affix spans (class counter__affix, white-space pre) hold prefix and suffix. Gap and shown-state: the row uses negative half-gap side margins, and each slot carries margin 0 calc(gap / 2 × shown) plus opacity shown, so slots fade and squeeze shut as they appear or leave.

## Localization & formatting

- The formatter is Intl.NumberFormat(locale, format); an invalid locale falls back to en-US and the remaining formatter options are dropped with it (decimals, minDigits and the passed format no longer apply). decimals (clamped 0–20) pins both minimum and maximumFractionDigits; minDigits (clamped 1–21, effective above 1) sets minimumIntegerDigits for leading zeros.
- The ten displayed glyphs come from a grouping-free formatter resolved to the same numberingSystem, so non-Latin numeral systems (e.g. arabicIndic) roll through their own digits.
- The screen-reader span always carries the plain formatted number for the current value.

## Motion engine

- Per-slot motion state: pos/vel (position on the digit wheel), target, shown/shownVel/shownTarget (presence 0–1), wait (stagger countdown), exiting, natural width for symbols, and element refs. Slots live in a ref-held map so value changes never remount rolling digits.
- On a value change: the trend is the direction prop, or when auto, compares |new| vs |old| — greater rolls up, smaller rolls down, equal takes the shortest path. stepBetween walks the mod-10 distance accordingly (up always positive, down negative unless already 0, shortest within ±5). Retained digit slots gain the step; slots that disappear roll their digit to 0, set shownTarget 0, and are removed from state only after settling; brand-new slots enter at position 0 with shownTarget 1.
- Stagger: moving slots sort by rank descending — rightmost first — and receive wait = order × stagger; group separators inherit their own digit's wait so symbols never pop ahead of the digits they belong to.
- Physics: per frame dt is clamped to 1/20 s and integrated in sub-steps of 1/240 s. Digit spring: omega = 2π / duration, damping ratio = 1 − bounce (bounce clamped 0–0.9), so higher bounce overshoots further before settling. Presence spring: omega = 2π / (duration × 0.85), critically damped. A slot is settled when its wait is spent and pos/shown are within 0.002 with velocities under 0.02; settled digit targets snap to mod 10 and positions lock.
- Paint: every numeral translateY(wrap(n − pos) × 100%); while a digit rolls, its box width interpolates between the measured glyph widths of the two neighbouring digits (unless tabular and fully shown, where the width clears); symbol boxes ease to their natural width via shown; motion blur sets feGaussianBlur stdDeviation "0 r" with r = clamp((|vel| − 3) × 0.006, 0, 0.09) × root font size, applied only above a 0.25 threshold and removed when slow.
- Reduced motion: waits cleared, springs snapped straight to targets each frame, no blur; the value still updates.
- Frame-loop self-sleep: the requestAnimationFrame loop runs only while any slot is unsettled and is kicked by value changes; unmount cancels it.
- Intro: when intro is on and motion is not reduced, an IntersectionObserver at threshold 0.5 fires once when half the root scrolls into view (immediately when IntersectionObserver is unavailable): every non-exiting digit gains a full ±10 turn (down direction rolls −10, otherwise +10) with the same stagger, so the number spins in. The observer disconnects after firing.
- Measurement: the hidden measure row reports the ten glyph widths and the root's computed font size; it re-measures through a ResizeObserver and once after document.fonts.ready.
- Same-page instances are fully independent (own engine state and filter ids); className collisions are the host's concern, all class names stay as specified.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | 0 | The number to show. Digits roll to every new value. |
| locale | string | "en-US" | Locale used for separators, symbols and numerals. |
| format | Intl.NumberFormatOptions | - | Formatting options such as currency, percent, units or compact notation. |
| decimals | number | - | Fixed number of decimal places. Leave it out to use the format defaults. |
| minDigits | number | 1 | Pads the whole part with leading zeros. |
| prefix | ReactNode | - | Content shown before the number. |
| suffix | ReactNode | - | Content shown after the number. |
| direction | "auto" \| "up" \| "down" \| "shortest" | "auto" | Which way digits roll. Auto rolls up as the number grows and down as it shrinks. |
| duration | number | 0.7 | Roughly how long a roll takes, in seconds; clamped to at least 0.05. |
| bounce | number | 0.2 | How much digits overshoot before settling, 0 to 0.9. |
| stagger | number | 0.04 | Delay in seconds between neighbouring digits, so changes ripple from the right. |
| motionBlur | boolean | true | Blurs digits along their path while they spin fast. |
| intro | boolean | true | Spins every digit once and lands it when the counter first scrolls into view. |
| fade | number | 0.3 | How far in em digits roll beyond the text before fading out. 0 clips them at the edge. |
| fontSize | number \| string | 100 | Font size in px, or any CSS size such as inherit. |
| fontWeight | number \| string | "inherit" | Font weight of the number. |
| textColor | string | "inherit" | Colour of the number. |
| gap | number | 0 | Space between digits and symbols in px. |
| padding | number | 0 | Extra height in px added to each digit, which also spaces out rolling digits. |
| tabular | boolean | true | Keeps every digit the same width. When off, widths ease between digits as they roll. |
| digitStyle | CSSProperties | - | Styles for each digit box, for example a tile background with padding and radius. |
| className | string | "" | Extra classes for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of Counter.jsx and Counter.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: group separators, decimal points, currency and percent slots appear, roll with their digits, and fade out when they disappear; decimals and minDigits round-trip; prefix/suffix render around the row; direction auto/up/down/shortest; duration, bounce and stagger shape the roll; retargeting mid-roll never jumps or reverses wrongly; motion blur appears at speed and clears at rest; the intro spins once at half visibility; tabular vs easing widths; gap, padding, fade and digitStyle take effect; the screen-reader text always equals the formatted value; prefers-reduced-motion snaps without breaking updates; same-page instances roll independently; unmount leaves no frame loop; no horizontal overflow at 375 / 768 / 1440 wide.
