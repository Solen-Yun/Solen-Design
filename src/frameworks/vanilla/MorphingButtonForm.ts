import { mountMorphingButtonForm, type MorphingButtonFormOptions } from "../../components/morphing-button-form/MorphingButtonFormEngine.js";
import type { MotionController } from "../../components/morphing-button-form/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MorphingButtonFormOptions = {}): ReturnType<typeof mountMorphingButtonForm> {
  return mountMorphingButtonForm(target, options);
}
export type { MorphingButtonFormOptions };
