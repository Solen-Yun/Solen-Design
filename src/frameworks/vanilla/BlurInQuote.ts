import { mountBlurInQuote, type BlurInQuoteOptions } from "../../components/blur-in-quote/BlurInQuoteEngine.js";
import type { MotionController } from "../../components/blur-in-quote/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BlurInQuoteOptions = {}): ReturnType<typeof mountBlurInQuote> {
  return mountBlurInQuote(target, options);
}
export type { BlurInQuoteOptions };
