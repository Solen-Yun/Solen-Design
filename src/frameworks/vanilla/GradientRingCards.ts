import { mountGradientRingCards, type GradientRingCardsOptions } from "../../components/gradient-ring-cards/GradientRingCardsEngine.js";
import type { MotionController } from "../../components/gradient-ring-cards/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GradientRingCardsOptions = {}): ReturnType<typeof mountGradientRingCards> {
  return mountGradientRingCards(target, options);
}
export type { GradientRingCardsOptions };
