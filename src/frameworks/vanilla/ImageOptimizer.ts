import { mountImageOptimizer, type ImageOptimizerOptions } from "../../components/image-optimizer/ImageOptimizerEngine.js";
import type { MotionController } from "../../components/image-optimizer/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ImageOptimizerOptions = {}): ReturnType<typeof mountImageOptimizer> {
  return mountImageOptimizer(target, options);
}
export type { ImageOptimizerOptions };
