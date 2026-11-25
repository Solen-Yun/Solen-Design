import { mountInfiniteFeed, type InfiniteFeedOptions } from "../../components/infinite-feed/InfiniteFeedEngine.js";
import type { MotionController } from "../../components/infinite-feed/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: InfiniteFeedOptions = {}): ReturnType<typeof mountInfiniteFeed> {
  return mountInfiniteFeed(target, options);
}
export type { InfiniteFeedOptions };
