import { mountPopulationPyramid, type PopulationPyramidOptions } from "../../components/population-pyramid/PopulationPyramidEngine.js";
import type { MotionController } from "../../components/population-pyramid/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PopulationPyramidOptions = {}): ReturnType<typeof mountPopulationPyramid> {
  return mountPopulationPyramid(target, options);
}
export type { PopulationPyramidOptions };
