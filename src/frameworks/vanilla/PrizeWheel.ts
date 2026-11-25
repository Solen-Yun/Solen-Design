import { mountPrizeWheel, type PrizeWheelOptions } from "../../components/prize-wheel/PrizeWheelEngine.js";
import type { MotionController } from "../../components/prize-wheel/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PrizeWheelOptions = {}): ReturnType<typeof mountPrizeWheel> {
  return mountPrizeWheel(target, options);
}
export type { PrizeWheelOptions };
