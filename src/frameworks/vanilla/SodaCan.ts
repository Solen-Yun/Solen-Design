import { mountSodaCan, type SodaCanOptions } from "../../components/soda-can/SodaCanEngine.js";
import type { MotionController } from "../../components/soda-can/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SodaCanOptions = {}): ReturnType<typeof mountSodaCan> {
  return mountSodaCan(target, options);
}
export type { SodaCanOptions };
