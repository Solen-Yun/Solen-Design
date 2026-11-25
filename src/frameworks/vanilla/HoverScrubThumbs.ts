import { mountHoverScrubThumbs, type HoverScrubThumbsOptions } from "../../components/hover-scrub-thumbs/HoverScrubThumbsEngine.js";
import type { MotionController } from "../../components/hover-scrub-thumbs/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: HoverScrubThumbsOptions = {}): ReturnType<typeof mountHoverScrubThumbs> {
  return mountHoverScrubThumbs(target, options);
}
export type { HoverScrubThumbsOptions };
