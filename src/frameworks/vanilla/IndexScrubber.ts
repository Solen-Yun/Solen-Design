import { mountIndexScrubber, type IndexScrubberOptions } from "../../components/index-scrubber/IndexScrubberEngine.js";
import type { MotionController } from "../../components/index-scrubber/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: IndexScrubberOptions = {}): ReturnType<typeof mountIndexScrubber> {
  return mountIndexScrubber(target, options);
}
export type { IndexScrubberOptions };
