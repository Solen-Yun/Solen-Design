import { mountStickyStackCards, type StickyStackCardsOptions } from "../../components/sticky-stack-cards/StickyStackCardsEngine.js";
import type { MotionController } from "../../components/sticky-stack-cards/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StickyStackCardsOptions = {}): ReturnType<typeof mountStickyStackCards> {
  return mountStickyStackCards(target, options);
}
export type { StickyStackCardsOptions };
