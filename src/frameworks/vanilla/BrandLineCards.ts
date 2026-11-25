import { mountBrandLineCards, type BrandLineCardsOptions } from "../../components/brand-line-cards/BrandLineCardsEngine.js";
import type { MotionController } from "../../components/brand-line-cards/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BrandLineCardsOptions = {}): ReturnType<typeof mountBrandLineCards> {
  return mountBrandLineCards(target, options);
}
export type { BrandLineCardsOptions };
