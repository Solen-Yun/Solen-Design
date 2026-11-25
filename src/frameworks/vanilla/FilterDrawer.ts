import { mountFilterDrawer, type FilterDrawerOptions } from "../../components/filter-drawer/FilterDrawerEngine.js";
import type { MotionController } from "../../components/filter-drawer/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FilterDrawerOptions = {}): ReturnType<typeof mountFilterDrawer> {
  return mountFilterDrawer(target, options);
}
export type { FilterDrawerOptions };
