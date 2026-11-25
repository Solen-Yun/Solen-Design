import { mountCoffeeCupSize, type CoffeeCupSizeOptions } from "../../components/coffee-cup-size/CoffeeCupSizeEngine.js";
import type { MotionController } from "../../components/coffee-cup-size/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CoffeeCupSizeOptions = {}): ReturnType<typeof mountCoffeeCupSize> {
  return mountCoffeeCupSize(target, options);
}
export type { CoffeeCupSizeOptions };
