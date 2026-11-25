import { mountPipCornerThrow, type PipCornerThrowOptions } from "../../components/pip-corner-throw/PipCornerThrowEngine.js";
import type { MotionController } from "../../components/pip-corner-throw/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PipCornerThrowOptions = {}): ReturnType<typeof mountPipCornerThrow> {
  return mountPipCornerThrow(target, options);
}
export type { PipCornerThrowOptions };
