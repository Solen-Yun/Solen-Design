import { mountPlatformDownload, type PlatformDownloadOptions } from "../../components/platform-download/PlatformDownloadEngine.js";
import type { MotionController } from "../../components/platform-download/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PlatformDownloadOptions = {}): ReturnType<typeof mountPlatformDownload> {
  return mountPlatformDownload(target, options);
}
export type { PlatformDownloadOptions };
