import { mountTrendingSearchRoll, type TrendingSearchRollOptions } from "../../components/trending-search-roll/TrendingSearchRollEngine.js";
import type { MotionController } from "../../components/trending-search-roll/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TrendingSearchRollOptions = {}): ReturnType<typeof mountTrendingSearchRoll> {
  return mountTrendingSearchRoll(target, options);
}
export type { TrendingSearchRollOptions };
