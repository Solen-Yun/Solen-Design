import { mountDragCardCarousel, type DragCardCarouselOptions } from "../../components/drag-card-carousel/DragCardCarouselEngine.js";
import type { MotionController } from "../../components/drag-card-carousel/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DragCardCarouselOptions = {}): ReturnType<typeof mountDragCardCarousel> {
  return mountDragCardCarousel(target, options);
}
export type { DragCardCarouselOptions };
