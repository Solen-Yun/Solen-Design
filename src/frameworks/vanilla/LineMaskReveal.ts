import { mountLineMaskReveal, type LineMaskRevealOptions } from "../../components/line-mask-reveal/LineMaskRevealEngine.js";
import type { MotionController } from "../../components/line-mask-reveal/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LineMaskRevealOptions = {}): ReturnType<typeof mountLineMaskReveal> {
  return mountLineMaskReveal(target, options);
}
export type { LineMaskRevealOptions };
