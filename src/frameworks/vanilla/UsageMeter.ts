import { mountUsageMeter, type UsageMeterOptions } from "../../components/usage-meter/UsageMeterEngine.js";
import type { MotionController } from "../../components/usage-meter/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: UsageMeterOptions = {}): ReturnType<typeof mountUsageMeter> {
  return mountUsageMeter(target, options);
}
export type { UsageMeterOptions };
