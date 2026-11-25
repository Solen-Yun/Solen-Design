import { mountStaggerRevealGrid, type StaggerRevealGridOptions } from "../../components/stagger-reveal-grid/StaggerRevealGridEngine.js";
import type { MotionController } from "../../components/stagger-reveal-grid/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StaggerRevealGridOptions = {}): ReturnType<typeof mountStaggerRevealGrid> {
  return mountStaggerRevealGrid(target, options);
}
export type { StaggerRevealGridOptions };
