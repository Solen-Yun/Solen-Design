Implement the "CodeSlots" component from zero: a one-time code input rendered as a row of rounded slots where each typed digit springs into its slot with a scale-in fill, a blinking caret glides fluidly between slots (accounting for digits still mid-flight), pasting a multi-digit string lands the digits in a cascade, success wipes an accent wash over the row and raises a checkmark while the digits sink away, and an error drains the digits out in reverse cascade. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + a spring/motion runtime, two files only: CodeSlots.jsx (entry, input handling, spring wiring) and CodeSlots.css (all styles). React >= 18; the runtime provides motion values, `animate` springs, reduced-motion detection and transform helpers.
- Root is a `<div>` with class `code-slots` holding the slot row plus a visually-hidden live region. Inline CSS variables: --cs-accent, --cs-ink, --cs-slot, --cs-digit, --cs-danger, --cs-size (slotSize), --cs-height (round(slotSize × 1.18)), --cs-gap, --cs-radius (min(radius, slotSize / 2)), --cs-font (round(slotSize × 0.5)).
- The row (`code-slots__row`, display inline-flex, gap, cursor text, touch-action manipulation) carries `data-status`, `data-focused` and `data-disabled` attributes. It contains, in paint order: a fully transparent real `<input type="text">` overlaying everything (z-index 4, absolute inset 0, opacity 0, caret-color transparent, 16px font so mobile zoom does not trigger), one slot per digit, an accent wash span with a checkmark, and a caret span. The input carries inputMode="numeric", autoComplete="one-time-code", pattern="[0-9]*", maxLength = length, aria-label, aria-invalid while error, aria-describedby pointing at the live region, and always-empty value — the visible digits live in the slots, the input only collects keystrokes and paste (including SMS autofill through the change event).
- Each slot (`code-slots__slot`, width size × height, radius, background --cs-slot, overflow hidden) stacks a fill span (scaleX/scale via a motion value, background --cs-accent, transform-origin center) and an optional digit span (tabular-nums, weight 600, colour --cs-digit) whose transform combines a rise offset with a sink offset and whose opacity fades as it sinks. Slots get an 8% ink tint while active and a 4% tint on hover (pointer-fine only); in error status every slot is tinted 20% danger and every fill turns danger-coloured.
- The wash span is absolute inset 0, radius, background --cs-accent, grid-centered; its clip-path is driven from a motion value: inset(0 (1 − o) × 50% round <washRadius>) so the wash sweeps in from the left edge. Inside it a check span (a stroke tick icon at 60% of slot size, stroke 2.2) rises 8px and scales 0.85→1 with the wash-open value. In error status the wash colours itself danger and shows no tick (the fill spans already turn red). The caret is a 1.5px × 50%-height bar at 25% top, translated by a motion value computed every frame; the visible line blinks on a 1s linear keyframe cycle.

## Motion model

- Two families of motion values, both created once per `length`: one per slot "pop" value (0 = empty, 1 = filled) and one per slot "sink" value (0 = visible, 1 = sunk). Pop springs use duration = settle (s) and bounce; sink springs use duration 0.3, bounce 0.
- Landing a digit: its pop value jumps to 0 if above 0, then springs to 1 (optionally delayed by cascade ms × index offset), so the accent fill scales in and the digit pops. Clearing a digit: spring the pop value back to 0. Reduced motion jumps values instantly to their targets.
- The caret's x position is recomputed each frame from the active index × pitch (slotSize + gap) plus corrections for every slot whose digit is still in flight (a "glide" set tracks slots crossed over during insert/clear): slots behind the caret contribute −(1 − h) × pitch while landing, slots ahead contribute h × pitch while landing, where h is the current pop value; entries leave the set once settled. The sum is clamped to the row. The caret is visible only while focused, not disabled, not veiled, not success, and the active slot is empty (or status is error).
- Digit display uses a small per-slot cache so a digit character stays mounted while its pop value animates out (avoids remounting mid-spring).

## Input & keyboard

- Digits only: any non-digit characters are stripped. Typing a digit inserts at the active slot and advances; Backspace clears the active slot, or the previous one (with a backward glide) if the active slot is empty; Delete clears the active slot; ArrowLeft/ArrowRight/Home/End move the active index without touching digits. Meta/ctrl/alt shortcuts are ignored.
- Paste inserts all digits from the clipboard starting at the active slot with cascade stagger; a multi-digit autofill/insert arriving through the input's change event starts at slot 0. After every mutation the joined code is emitted via onChange, and onComplete fires once on the transition from not-full to full.
- Pointer: mousedown on the row (prevented default) jumps the active slot to the pressed column clamped to the first empty slot (compensating CSS zoom by comparing rect width to offsetWidth) and focuses the hidden input.
- Controlled mode: when `value` is passed, external changes diff against the rendered slots — newly filled slots land in cascade, removed slots leave in reverse cascade, the active index glides to the first empty slot — without remounting. Uncontrolled mode seeds from defaultValue. Changing `length` re-derives the slot array, re-seeds the caret and emits a code if it changed.

## Success & error choreography

- status → "success": the row becomes read-only (veiled). The wash opens over 0.3s ease-out; every sink value springs to 1 (digits drop half a slot height and fade, starting at 60ms with 30ms steps); the check rises at 280ms with the bounce spring. The caret hides. Reduced motion jumps everything instantly.
- Leaving success: the check fades out in 150ms, the wash closes over 0.2s after a 60ms delay and the veil clears when it closes, sink values spring back with a 100ms delay.
- status → "error": every filled slot drains out in reverse order with cascade stagger (pop → 0); input is blocked while draining; after the last slot's animation (cascade × (n−1) + settle × 1000 ms, or 300ms under reduced motion) the code is committed empty and draining clears. Row mouse handling ignores clicks while disabled, draining, or success.

## Accessibility

- role listbox/option is not used: the component is one text input labelled by ariaLabel with aria-invalid in error status. A polite live region reports "N of length digits entered" (by default) or "Code accepted" in success. The row and all decorations are aria-hidden. autoFocus focuses the hidden input on mount.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| length | number | 6 | Number of code digits / slots. |
| value | string | - | Controlled code. Non-digits are stripped; external changes animate in. |
| defaultValue | string | "" | Initial code (uncontrolled mode). |
| onChange | (code: string) => void | - | Fires whenever the joined code changes. |
| onComplete | (code: string) => void | - | Fires once when the last empty slot is filled. |
| status | "idle" \| "success" \| "error" | "idle" | Result state: success washes the row and raises a check, error drains the digits red. |
| mask | boolean | false | Shows digits as bullets. |
| caret | boolean | true | Shows the gliding caret. |
| disabled | boolean | false | Disables the input and dims the row. |
| autoFocus | boolean | false | Focuses the hidden input on mount. |
| accentColor | string | "#f5f5f5" | Accent of the fill spans, success wash and caret. |
| inkColor | string | "#f5f5f5" | Tint used for hover/active slot backgrounds. |
| slotColor | string | "#27272a" | Slot background. |
| digitColor | string | "#18181b" | Digit (and check) colour. |
| dangerColor | string | "#ff3b30" | Error tint for slots and fills. |
| slotSize | number | 44 | Slot width in px; height, radius cap and font size derive from it. |
| gap | number | 8 | Gap between slots in px. |
| radius | number | 12 | Slot corner radius in px, capped at half the slot size. |
| bounce | number | 0.2 | Spring overshoot of the digit pop-in, 0–1. |
| settle | number | 0.3 | Pop spring duration in seconds. |
| rise | number | 8 | How far a landing digit rises from below, in px. |
| cascade | number | 20 | Per-slot delay of paste/error/external-change cascades, in ms. |
| ariaLabel | string | "One-time code" | Accessible name of the hidden input and the list. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of CodeSlots.jsx and CodeSlots.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: typed digits spring into their slots and the caret glides smoothly across mid-flight digits; paste of a full code lands in cascade; SMS-style autofill through the input lands from slot 0; backspace/delete/arrows/home/end behave; success wipes the wash, sinks the digits and raises the check, and reversal restores editing; error drains the digits in reverse and resets the code; controlled value updates animate as a diff; length changes re-seed cleanly; disabled and readOnly states block editing; mask shows bullets; reduced motion jumps instead of springs and still ends in the right state; unmount clears timers and destroys no listeners; 375 / 768 / 1440 wide without overflow.
