import { mountLaptopLid, type LaptopLidOptions } from "../../components/laptop-lid/LaptopLidEngine.js";
import type { MotionController } from "../../components/laptop-lid/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LaptopLidOptions = {}): ReturnType<typeof mountLaptopLid> {
  return mountLaptopLid(target, options);
}
export type { LaptopLidOptions };
