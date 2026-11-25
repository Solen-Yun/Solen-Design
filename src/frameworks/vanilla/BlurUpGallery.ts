import { mountBlurUpGallery, type BlurUpGalleryOptions } from "../../components/blur-up-gallery/BlurUpGalleryEngine.js";
import type { MotionController } from "../../components/blur-up-gallery/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BlurUpGalleryOptions = {}): ReturnType<typeof mountBlurUpGallery> {
  return mountBlurUpGallery(target, options);
}
export type { BlurUpGalleryOptions };
