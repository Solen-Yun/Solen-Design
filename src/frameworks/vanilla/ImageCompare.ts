import { mountImageCompare, type ImageCompareOptions } from "../../components/image-compare/ImageCompareEngine.js";
import type { MotionController } from "../../components/image-compare/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ImageCompareOptions = {}): ReturnType<typeof mountImageCompare> {
  return mountImageCompare(target, options);
}
export type { ImageCompareOptions };
