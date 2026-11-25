import type { MotionOptions, MotionController } from "./motion-runtime";
export type SitePreloaderOptions = MotionOptions;
export function mountSitePreloader(target: HTMLElement, options?: SitePreloaderOptions): MotionController;
