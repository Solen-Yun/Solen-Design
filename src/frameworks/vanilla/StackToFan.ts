import { mountStackToFan, type StackToFanOptions } from "../../components/stack-to-fan/StackToFanEngine.js";
import type { MotionController } from "../../components/stack-to-fan/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StackToFanOptions = {}): ReturnType<typeof mountStackToFan> {
  return mountStackToFan(target, options);
}
export type { StackToFanOptions };
