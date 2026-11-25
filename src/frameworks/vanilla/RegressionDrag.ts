import { mountRegressionDrag, type RegressionDragOptions } from "../../components/regression-drag/RegressionDragEngine.js";
import type { MotionController } from "../../components/regression-drag/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: RegressionDragOptions = {}): ReturnType<typeof mountRegressionDrag> {
  return mountRegressionDrag(target, options);
}
export type { RegressionDragOptions };
