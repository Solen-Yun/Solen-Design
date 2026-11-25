import { mountSortFlipList, type SortFlipListOptions } from "../../components/sort-flip-list/SortFlipListEngine.js";
import type { MotionController } from "../../components/sort-flip-list/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SortFlipListOptions = {}): ReturnType<typeof mountSortFlipList> {
  return mountSortFlipList(target, options);
}
export type { SortFlipListOptions };
