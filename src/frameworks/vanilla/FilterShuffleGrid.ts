import { mountFilterShuffleGrid, type FilterShuffleGridOptions } from "../../components/filter-shuffle-grid/FilterShuffleGridEngine.js";
import type { MotionController } from "../../components/filter-shuffle-grid/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FilterShuffleGridOptions = {}): ReturnType<typeof mountFilterShuffleGrid> {
  return mountFilterShuffleGrid(target, options);
}
export type { FilterShuffleGridOptions };
