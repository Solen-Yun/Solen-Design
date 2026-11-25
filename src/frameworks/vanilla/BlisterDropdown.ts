import { mountBlisterDropdown, type BlisterDropdownOptions } from "../../components/blister-dropdown/BlisterDropdownEngine.js";
import type { MotionController } from "../../components/blister-dropdown/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BlisterDropdownOptions = {}): ReturnType<typeof mountBlisterDropdown> {
  return mountBlisterDropdown(target, options);
}
export type { BlisterDropdownOptions };
