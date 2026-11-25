import { mountPromoCodeSummary, type PromoCodeSummaryOptions } from "../../components/promo-code-summary/PromoCodeSummaryEngine.js";
import type { MotionController } from "../../components/promo-code-summary/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PromoCodeSummaryOptions = {}): ReturnType<typeof mountPromoCodeSummary> {
  return mountPromoCodeSummary(target, options);
}
export type { PromoCodeSummaryOptions };
