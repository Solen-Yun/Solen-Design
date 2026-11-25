import { mountScrollExpandVideo, type ScrollExpandVideoOptions } from "../../components/scroll-expand-video/ScrollExpandVideoEngine.js";
import type { MotionController } from "../../components/scroll-expand-video/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ScrollExpandVideoOptions = {}): ReturnType<typeof mountScrollExpandVideo> {
  return mountScrollExpandVideo(target, options);
}
export type { ScrollExpandVideoOptions };
