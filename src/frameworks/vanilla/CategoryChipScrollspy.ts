import { mountCategoryChipScrollspy, type CategoryChipScrollspyOptions } from "../../components/category-chip-scrollspy/CategoryChipScrollspyEngine.js";
import type { MotionController } from "../../components/category-chip-scrollspy/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CategoryChipScrollspyOptions = {}): ReturnType<typeof mountCategoryChipScrollspy> {
  return mountCategoryChipScrollspy(target, options);
}
export type { CategoryChipScrollspyOptions };
