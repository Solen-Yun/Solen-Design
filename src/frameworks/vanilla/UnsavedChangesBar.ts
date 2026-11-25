import { mountUnsavedChangesBar, type UnsavedChangesBarOptions } from "../../components/unsaved-changes-bar/UnsavedChangesBarEngine.js";
import type { MotionController } from "../../components/unsaved-changes-bar/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: UnsavedChangesBarOptions = {}): ReturnType<typeof mountUnsavedChangesBar> {
  return mountUnsavedChangesBar(target, options);
}
export type { UnsavedChangesBarOptions };
