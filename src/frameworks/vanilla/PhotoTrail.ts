import { mountPhotoTrail, type PhotoTrailOptions } from "../../components/photo-trail/PhotoTrailEngine.js";
import type { MotionController } from "../../components/photo-trail/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PhotoTrailOptions = {}): ReturnType<typeof mountPhotoTrail> {
  return mountPhotoTrail(target, options);
}
export type { PhotoTrailOptions };
