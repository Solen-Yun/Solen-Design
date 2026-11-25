import { mountBackToTopRocket, type BackToTopRocketOptions } from "../../components/back-to-top-rocket/BackToTopRocketEngine.js";
import type { MotionController } from "../../components/back-to-top-rocket/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BackToTopRocketOptions = {}): ReturnType<typeof mountBackToTopRocket> {
  return mountBackToTopRocket(target, options);
}
export type { BackToTopRocketOptions };
