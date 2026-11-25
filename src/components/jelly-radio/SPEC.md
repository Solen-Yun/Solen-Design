Implement the "JellyRadio" component from zero: a radio group rendered as a row of pill chips where selecting one makes it swell like jelly — growing larger while its neighbours are barged outward to make room — and every chip settles on individual, slightly desynchronised springs so the row jiggles organically; non-selected chips shrink a touch. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + a motion runtime, two files only: JellyRadio.jsx (entry, spring wiring, keyboard roving) and JellyRadio.css (all styles). React >= 18; the runtime provides motion values, spring `animate`, reduced-motion detection, transform helpers and per-value `useTransform`.
- Root is a `<div role="radiogroup">` with class `jelly-radio` (inline-flex, align-items center, gap, user-select none), aria-label, data-disabled (opacity 0.5, pointer-events none). Inline CSS variables: colour tokens --jr-chip/--jr-active/--jr-text/--jr-active-text, --jr-gap, --jr-radius, and size tokens from the preset (sm: 28px chip height / 12px font / 12px padding, md: 36/13/16, lg: 44/14/20).
- Each chip is a `<button role="radio" type="button">` with aria-checked, roving tabIndex (0 on the checked chip, −1 on the others), disabled when the group or that item is disabled, and data-on="true"/"false". The button itself carries no visuals except the transform; its inner "skin" span holds the look: inline-flex centred row (gap 0.4em) with height = preset, padding 0 × preset horizontal padding, radius, background = chip colour (active colour when checked), ink = text colour (active text colour when checked), font-size = preset, weight 500, line-height 1, nowrap, overflow hidden, plus an optional icon span. The skin carries the transitions: transform 160ms ease-out (active press), background-colour 200ms, colour 200ms.
- The chip's transform is composed per frame from three motion values — translateX (px), scaleX, scaleY — through one useTransform per chip, applied to the button. Hover on an unchecked chip (pointer-fine only) overlays an 11% ink wash via the skin's ::before; an active press scales the skin to 0.97. A checked chip shows cursor default; a disabled chip inside an enabled group shows 0.4 opacity.

## Jelly motion model

- Selecting index i computes the push distance: half of the selected chip's measured width × swell + barge px. Every chip then animates: the selected chip scales to 1 + swell, every other chip to 1 − shrink, and each chip's translateX is dir × push where dir points away from the selection (flipped for RTL, read from the group's computed direction). Springs use mass 0.9, damping = 2√(k·m) × (1 − bounce).
- The jelly factor tints the two scale springs apart: scaleX runs on stiffness × (1 + 0.24j), mass 0.9 − 0.1j, bounce min(0.85, bounce + 0.3j); scaleY runs on stiffness × (1 − 0.14j), mass 0.9 + 0.05j, standard bounce, delayed by an extra 0.05j seconds. The horizontal spring is softened for far chips (stiffness × (1 − 0.12 × min(distance, 3))) and staggered by distance × stagger ms — but only when that chip's motion values are idle; chips still in flight restart immediately with no delay so rapid re-picks never queue.
- Reduced motion (or an instant flag for programmatic/keyboard changes) jumps every motion value straight to its target.
- The group reserves room for the swell: it measures every chip's width (and the max height) and sets --jr-pad-x (ceil(maxWidth × swell × 1.3 / 2 + barge) + 2px) and --jr-pad-y (ceil(chipHeight × swell / 2) + 2px) as its own padding, so a swollen chip never clips. Measurement re-runs on a ResizeObserver on the group and after fonts load; size/geometry prop changes re-measure and re-apply instantly.

## Selection model

- Controlled mode: `value` selects the chip; uncontrolled mode seeds from defaultValue (first item when absent). Clicking an enabled, unselected chip applies the jelly layout, updates the inner state and fires onChange(value, index); clicking the checked chip does nothing. Keyboard roving tabindex: ArrowRight/Down and ArrowLeft/Up step (wrapping, skipping disabled items), Home/End jump to the ends, Space/Enter pick the focused chip; every move commits instantly and moves focus.
- Items accept strings or { value, label, icon, disabled }. Unmount destroys every motion value.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | (string \| { value: string; label: string; icon?: ReactNode; disabled?: boolean })[] | DEFAULT_ITEMS | Radio options; strings become value and label. |
| value | string | - | Controlled selected value. |
| defaultValue | string | - | Initial selected value (uncontrolled mode). |
| onChange | (value: string, index: number) => void | - | Fires when a chip is picked. |
| chipColor | string | "#27272a" | Unchecked chip background. |
| activeColor | string | "#f5f5f5" | Checked chip background. |
| textColor | string | "#f5f5f5" | Unchecked chip ink. |
| activeTextColor | string | "#18181b" | Checked chip ink. |
| size | "sm" \| "md" \| "lg" | "md" | Size preset (chip height / font / padding). |
| gap | number | 8 | Gap between chips in px. |
| radius | number | 18 | Chip corner radius in px. |
| swell | number | 0.2 | How much the checked chip swells (scale increment). |
| barge | number | 6 | Extra px neighbours are pushed out beyond the swell. |
| shrink | number | 0.05 | How much unchecked chips shrink (scale decrement). |
| jelly | number | 1 | Vertical/horizontal spring desync strength: 0 is rigid, higher jiggles more. |
| bounce | number | 0.25 | Base spring overshoot, 0–1. |
| stagger | number | 22 | Per-chip-distance animation delay in ms (idle chips only). |
| stiffness | number | 580 | Base spring stiffness. |
| disabled | boolean | false | Disables the whole group. |
| ariaLabel | string | "Options" | Accessible name of the radiogroup. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of JellyRadio.jsx and JellyRadio.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: picking a chip swells it while neighbours barge outward and jiggle with desynchronised springs; rapid re-picks interrupt cleanly without queued delays; the group padding grows so nothing clips at high swell; strings, icons and per-item disabled items all work; controlled and uncontrolled values agree; keyboard arrows/Home/End/Space/Enter move focus and selection, skipping disabled; RTL direction flips the barge; sizes sm/md/lg and colours/gap/radius take effect; disabled dims the group; reduced motion jumps without jiggle; resizing and font loads re-measure; unmount destroys motion values; 375 / 768 / 1440 wide without overflow.
