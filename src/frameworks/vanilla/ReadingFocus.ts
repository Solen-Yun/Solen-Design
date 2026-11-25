import { mountReadingFocus, type ReadingFocusOptions } from "../../components/reading-focus/ReadingFocusEngine.js";
import type { MotionController } from "../../components/reading-focus/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ReadingFocusOptions = {}): ReturnType<typeof mountReadingFocus> {
  return mountReadingFocus(target, options);
}
export type { ReadingFocusOptions };
