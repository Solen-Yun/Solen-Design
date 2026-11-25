Implement the "ScrubField" component from zero: a compact numeric chip — label, editable number, suffix — that you drag horizontally to scrub the value in step increments, with a logarithmic rubber-band that leans and overshoots the limits while the chip itself leans in the drag direction, a floating delta bubble riding the pointer, click-to-type editing, and modifier keys for coarse/fine steps. Built with React, CSS and a motion library (motion values, animate, useMotionTemplate, useReducedMotion); no icon dependencies required. It must not depend on external pages, videos, images or font files.

## Structure & rendering

- Two files: ScrubField.jsx (entry, scrub math, typing flow) and ScrubField.css (all styles). Dependencies: React >= 18 plus a motion library exposing `motion/react`-style primitives (animate, motion, useMotionValue, useMotionValueEvent, useMotionTemplate, useTransform, useReducedMotion); no other runtime deps. No iframe.
- Root is a `motion.div` with class `scrub-field` (plus caller className), width/height/font/radius per size preset (sm 28/12/6/104, md 34/13/8/128, lg 44/16/10/160), chip background var, cursor ew-resize, touch-action pan-y, user-select none. Data attributes: `data-dirty` (value differs from defaultValue and showDirty), `data-dragging`, `data-typing`, `data-disabled`, `aria-disabled`. Inline tokens: `--sf-accent` (fill/ghost/outline accent), `--sf-chip` (chip background), `--sf-ghost-ink` (auto contrast ink for the ghost, computed from accent via YIQ luma ≥ 128 → #111111 else #ffffff), plus the size tokens. The chip's whole transform is a motion template `translateX(lean px)`.
- Children: an optional fill track (absolute inset 0 behind content, overflow hidden, radius inherit) whose inner fill span scales on X from left origin by `(value − min) / (max − min)` — a 16%-alpha accent bar showing the position in range; a `<label>` handle for the field text (55%-alpha ink, hover 85%, active/dragging scales 0.96 with full ink); the `<input type="text" inputMode="decimal" role="spinbutton">` (borderless, transparent, right-aligned, tabular-nums, aria-valuenow/min/max, aria-valuetext "`value` `suffix`", uncontrolled with the display value written to it imperatively); an optional suffix span (45%-alpha ink); and a floating `scrub-field__ghost` bubble (accent background, auto-contrast ink, 11px semibold pill above the chip, shown only while dragging with an opacity/scale ease).
- Disabled state dims to 0.5, blocks the cursor and pointer handling; typing state lightens the chip (7% currentColor mix) and switches the cursor to text.

## Scrubbing

- A single display motion value is the source of truth for painting; committed values are clamped, rounded to the finest decimal precision (decimals of step, or of step + fineMultiplier, capped at 6), and pushed through onChange on every increment and onCommit when a scrub or edit session ends (value actually changed). Controlled mode adopts valueProp (unless dragging); uncontrolled mode re-adopts when defaultValue changes.
- Drag: pointerdown (primary button, not while typing) stops any return animation, records the pointer, decodes the current rubber-band overshoot back into an unbounded "raw" value (unbend), samples the modifier multiplier, and captures the pointer; Escape (window listener during drag) cancels — restoring the pre-drag value and stopping. After a slack of 3px (8px on touch) the drag activates: document cursor switches to ew-resize, dragging state shows the ghost. Each move adds `round(dx / sensitivity) × step × multiplier` to the raw value; the shown value clamps into [min, max] then bends past the bounds logarithmically (`sign × reach × log1p(|over|/reach)`, reach = rubberReach% of the range) so the number visibly resists at the limits; the committed value stays the clamped one. The ghost bubble rides at the pointer (translate relative to the drag-start chip position, −50% −100%) reading the signed delta from the drag start (`+`/`−` with the same formatting).
- Chip lean: while the shown value is out of bounds the chip translates up to ±4px in the drag direction (lean = clamp(over / reach) × 4, skipped for reduced motion).
- Release: if the shown value is past the bounds it springs back to the clamped value over returnDuration ms with a no-bounce spring (reduced motion jumps); a drag that never moved past the slack focuses the input instead (click-to-type); onCommit fires when the value changed during the drag.
- Modifiers: Shift multiplies steps by coarseMultiplier (default 10), Alt divides by 1/fineMultiplier (default 0.1); changing modifiers mid-drag re-bases the raw value from the current shown position so nothing jumps.
- Typing: focusing selects all and enters typing mode (display stops overwriting the input; a draft state tracks the text). Enter blurs and commits; Escape restores the last committed value and blurs; blur parses the draft (stripping non-numeric characters), commits it and fires onCommit. Arrow keys step by step × modifier with immediate jump (no animation), PageUp/PageDown use the coarse multiplier, Home/End jump to min/max, all firing onCommit.
- Display formatting: values render with base decimals when they land on the step grid, otherwise the fine precision (so Alt-steps show extra decimals); the suffix is display-only. Reduced motion disables the lean, the return spring becomes a jump, and the handle/ghost lose their transform transitions. Unmount clears the document cursor and the Escape listener.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | "Radius" | Field label shown in the handle. |
| suffix | string | "px" | Suffix after the number; empty hides the span. |
| value | number | - | Controls the value yourself; the prop wins over internal state. Use with onChange. |
| defaultValue | number | 24 | Starting value (uncontrolled mode). |
| min | number | 0 | Minimum allowed value. |
| max | number | 100 | Maximum allowed value. |
| step | number | 1 | Step size per scrub tick; its decimals define the display precision. |
| size | "sm" \| "md" \| "lg" | "md" | Chip height/font/radius/width preset. |
| sensitivity | number | 2 | Pointer pixels per scrub tick. |
| rubberReach | number | 8 | Rubber-band reach past the limits, percent of the range. |
| returnDuration | number | 300 | Spring-back duration after releasing past a limit, ms. |
| coarseMultiplier | number | 10 | Shift-key step multiplier (also PageUp/PageDown). |
| fineMultiplier | number | 0.1 | Alt-key step multiplier. |
| showDelta | boolean | true | Shows the floating delta bubble while dragging. |
| showDirty | boolean | false | Outlines the chip when the value differs from defaultValue. |
| showFill | boolean | true | Shows the in-range fill bar behind the chip content. |
| accent | string | "#f5f5f5" | Accent for the fill, ghost bubble and dirty outline; the ghost's text colour derives from its luma. |
| chipColor | string | "#27272a" | Chip background. |
| disabled | boolean | false | Disables interaction. |
| onChange | (value: number) => void | - | Called on every committed value change. |
| onCommit | (value: number) => void | - | Called when a drag or typing session ends with a change. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of ScrubField.jsx and ScrubField.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: dragging scrubs in step increments with the ghost delta bubble riding the pointer; pushing past min/max bends the number logarithmically, leans the chip, and springs back on release; Shift/Alt (and PageUp/PageDown) scale the steps, and changing them mid-drag does not jump; a click without movement focuses the input for typing; typing parses on blur, Enter commits, Escape restores, arrow keys step with jumps; controlled and uncontrolled modes honour onChange/onCommit and external value/defaultValue changes; sizes sm/md/lg; accent with a light colour yields dark ghost text and vice versa; suffix optional; dirty outline only with showDirty; disabled blocks everything; reduced motion removes lean/springs but keeps scrubbing exact; unmount leaves no global cursor or listeners; 375 / 768 / 1440 wide without overflow.
