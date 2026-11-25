import { mountAiBrandCoverCards, type AiBrandCoverCardsOptions } from "../../components/ai-brand-cover-cards/AiBrandCoverCardsEngine.js";
import type { MotionController } from "../../components/ai-brand-cover-cards/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AiBrandCoverCardsOptions = {}): ReturnType<typeof mountAiBrandCoverCards> {
  return mountAiBrandCoverCards(target, options);
}
export type { AiBrandCoverCardsOptions };
