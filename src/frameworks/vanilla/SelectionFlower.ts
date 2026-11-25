import { mountSelectionFlower, type SelectionFlowerOptions } from "../../components/selection-flower/SelectionFlowerEngine.js";
import type { MotionController } from "../../components/selection-flower/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SelectionFlowerOptions = {}): ReturnType<typeof mountSelectionFlower> {
  return mountSelectionFlower(target, options);
}
export type { SelectionFlowerOptions };
