import { mountMultiCursorBuilder, type MultiCursorBuilderOptions } from "../../components/multi-cursor-builder/MultiCursorBuilderEngine.js";
import type { MotionController } from "../../components/multi-cursor-builder/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MultiCursorBuilderOptions = {}): ReturnType<typeof mountMultiCursorBuilder> {
  return mountMultiCursorBuilder(target, options);
}
export type { MultiCursorBuilderOptions };
