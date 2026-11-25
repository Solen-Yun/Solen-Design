import { mountScrollMarqueeRows, type ScrollMarqueeRowsOptions } from "../../components/scroll-marquee-rows/ScrollMarqueeRowsEngine.js";
import type { MotionController } from "../../components/scroll-marquee-rows/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ScrollMarqueeRowsOptions = {}): ReturnType<typeof mountScrollMarqueeRows> {
  return mountScrollMarqueeRows(target, options);
}
export type { ScrollMarqueeRowsOptions };
