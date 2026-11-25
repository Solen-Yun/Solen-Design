import { mountLongPressPeek, type LongPressPeekOptions } from "../../components/long-press-peek/LongPressPeekEngine.js";
import type { MotionController } from "../../components/long-press-peek/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LongPressPeekOptions = {}): ReturnType<typeof mountLongPressPeek> {
  return mountLongPressPeek(target, options);
}
export type { LongPressPeekOptions };
