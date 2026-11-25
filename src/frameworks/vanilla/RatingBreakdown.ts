import { mountRatingBreakdown, type RatingBreakdownOptions } from "../../components/rating-breakdown/RatingBreakdownEngine.js";
import type { MotionController } from "../../components/rating-breakdown/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: RatingBreakdownOptions = {}): ReturnType<typeof mountRatingBreakdown> {
  return mountRatingBreakdown(target, options);
}
export type { RatingBreakdownOptions };
