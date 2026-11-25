import { mountQuoteShareTooltip, type QuoteShareTooltipOptions } from "../../components/quote-share-tooltip/QuoteShareTooltipEngine.js";
import type { MotionController } from "../../components/quote-share-tooltip/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: QuoteShareTooltipOptions = {}): ReturnType<typeof mountQuoteShareTooltip> {
  return mountQuoteShareTooltip(target, options);
}
export type { QuoteShareTooltipOptions };
