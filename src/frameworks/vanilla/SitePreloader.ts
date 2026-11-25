import { mountSitePreloader, type SitePreloaderOptions } from "../../components/site-preloader/SitePreloaderEngine.js";
import type { MotionController } from "../../components/site-preloader/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SitePreloaderOptions = {}): ReturnType<typeof mountSitePreloader> {
  return mountSitePreloader(target, options);
}
export type { SitePreloaderOptions };
