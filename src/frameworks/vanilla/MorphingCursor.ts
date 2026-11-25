import { mountMorphingCursor, type MorphingCursorOptions } from "../../components/morphing-cursor/MorphingCursorEngine.js";
import type { MotionController } from "../../components/morphing-cursor/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MorphingCursorOptions = {}): ReturnType<typeof mountMorphingCursor> {
  return mountMorphingCursor(target, options);
}
export type { MorphingCursorOptions };
