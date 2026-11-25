import { mountRegroupingBubbles, type RegroupingBubblesOptions } from "../../components/regrouping-bubbles/RegroupingBubblesEngine.js";
import type { MotionController } from "../../components/regrouping-bubbles/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: RegroupingBubblesOptions = {}): ReturnType<typeof mountRegroupingBubbles> {
  return mountRegroupingBubbles(target, options);
}
export type { RegroupingBubblesOptions };
