import { mountParallelCoords, type ParallelCoordsOptions } from "../../components/parallel-coords/ParallelCoordsEngine.js";
import type { MotionController } from "../../components/parallel-coords/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ParallelCoordsOptions = {}): ReturnType<typeof mountParallelCoords> {
  return mountParallelCoords(target, options);
}
export type { ParallelCoordsOptions };
