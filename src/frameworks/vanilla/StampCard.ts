import { mountStampCard, type StampCardOptions } from "../../components/stamp-card/StampCardEngine.js";
import type { MotionController } from "../../components/stamp-card/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StampCardOptions = {}): ReturnType<typeof mountStampCard> {
  return mountStampCard(target, options);
}
export type { StampCardOptions };
