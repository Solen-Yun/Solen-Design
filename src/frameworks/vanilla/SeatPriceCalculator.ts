import { mountSeatPriceCalculator, type SeatPriceCalculatorOptions } from "../../components/seat-price-calculator/SeatPriceCalculatorEngine.js";
import type { MotionController } from "../../components/seat-price-calculator/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SeatPriceCalculatorOptions = {}): ReturnType<typeof mountSeatPriceCalculator> {
  return mountSeatPriceCalculator(target, options);
}
export type { SeatPriceCalculatorOptions };
