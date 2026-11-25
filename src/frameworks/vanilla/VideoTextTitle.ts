import { mountVideoTextTitle, type VideoTextTitleOptions } from "../../components/video-text-title/VideoTextTitleEngine.js";
import type { MotionController } from "../../components/video-text-title/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: VideoTextTitleOptions = {}): ReturnType<typeof mountVideoTextTitle> {
  return mountVideoTextTitle(target, options);
}
export type { VideoTextTitleOptions };
