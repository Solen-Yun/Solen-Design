import { mountGlowBorderCards, type GlowBorderCardsOptions } from "../../components/glow-border-cards/GlowBorderCardsEngine.js";
import type { MotionController } from "../../components/glow-border-cards/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GlowBorderCardsOptions = {}): ReturnType<typeof mountGlowBorderCards> {
  return mountGlowBorderCards(target, options);
}
export type { GlowBorderCardsOptions };
