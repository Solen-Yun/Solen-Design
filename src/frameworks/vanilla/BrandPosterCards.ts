import { mountBrandPosterCards, type BrandPosterCardsOptions } from "../../components/brand-poster-cards/BrandPosterCardsEngine.js";
import type { MotionController } from "../../components/brand-poster-cards/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BrandPosterCardsOptions = {}): ReturnType<typeof mountBrandPosterCards> {
  return mountBrandPosterCards(target, options);
}
export type { BrandPosterCardsOptions };
