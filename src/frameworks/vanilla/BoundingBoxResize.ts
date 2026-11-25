import { mountBoundingBoxResize, type BoundingBoxResizeOptions } from "../../components/bounding-box-resize/BoundingBoxResizeEngine.js";
import type { MotionController } from "../../components/bounding-box-resize/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BoundingBoxResizeOptions = {}): ReturnType<typeof mountBoundingBoxResize> {
  return mountBoundingBoxResize(target, options);
}
export type { BoundingBoxResizeOptions };
