import { mountGridListFlip, type GridListFlipOptions } from "../../components/grid-list-flip/GridListFlipEngine.js";
import type { MotionController } from "../../components/grid-list-flip/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GridListFlipOptions = {}): ReturnType<typeof mountGridListFlip> {
  return mountGridListFlip(target, options);
}
export type { GridListFlipOptions };
