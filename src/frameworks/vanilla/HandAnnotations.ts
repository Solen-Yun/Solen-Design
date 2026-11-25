import { mountHandAnnotations, type HandAnnotationsOptions } from "../../components/hand-annotations/HandAnnotationsEngine.js";
import type { MotionController } from "../../components/hand-annotations/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: HandAnnotationsOptions = {}): ReturnType<typeof mountHandAnnotations> {
  return mountHandAnnotations(target, options);
}
export type { HandAnnotationsOptions };
