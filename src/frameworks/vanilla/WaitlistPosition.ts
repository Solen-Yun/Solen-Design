import { mountWaitlistPosition, type WaitlistPositionOptions } from "../../components/waitlist-position/WaitlistPositionEngine.js";
import type { MotionController } from "../../components/waitlist-position/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: WaitlistPositionOptions = {}): ReturnType<typeof mountWaitlistPosition> {
  return mountWaitlistPosition(target, options);
}
export type { WaitlistPositionOptions };
