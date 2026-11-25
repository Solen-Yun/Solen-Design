import { mountChangelogFilter, type ChangelogFilterOptions } from "../../components/changelog-filter/ChangelogFilterEngine.js";
import type { MotionController } from "../../components/changelog-filter/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ChangelogFilterOptions = {}): ReturnType<typeof mountChangelogFilter> {
  return mountChangelogFilter(target, options);
}
export type { ChangelogFilterOptions };
