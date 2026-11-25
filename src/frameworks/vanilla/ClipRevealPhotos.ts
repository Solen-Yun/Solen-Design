import { mountClipRevealPhotos, type ClipRevealPhotosOptions } from "../../components/clip-reveal-photos/ClipRevealPhotosEngine.js";
import type { MotionController } from "../../components/clip-reveal-photos/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ClipRevealPhotosOptions = {}): ReturnType<typeof mountClipRevealPhotos> {
  return mountClipRevealPhotos(target, options);
}
export type { ClipRevealPhotosOptions };
