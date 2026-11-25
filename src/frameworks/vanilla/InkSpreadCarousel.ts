import { mountInkSpreadCarousel, type InkSpreadCarouselOptions } from "../../components/ink-spread-carousel/InkSpreadCarouselEngine.js";
import type { MotionController } from "../../components/ink-spread-carousel/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: InkSpreadCarouselOptions = {}): ReturnType<typeof mountInkSpreadCarousel> {
  return mountInkSpreadCarousel(target, options);
}
export type { InkSpreadCarouselOptions };
