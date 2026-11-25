import { mountDotMatrixTrio, type DotMatrixTrioOptions } from "../../components/dot-matrix-trio/DotMatrixTrioEngine.js";
import type { MotionController } from "../../components/dot-matrix-trio/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DotMatrixTrioOptions = {}): ReturnType<typeof mountDotMatrixTrio> {
  return mountDotMatrixTrio(target, options);
}
export type { DotMatrixTrioOptions };
