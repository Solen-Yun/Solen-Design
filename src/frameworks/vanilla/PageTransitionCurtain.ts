import { mountPageTransitionCurtain, type PageTransitionCurtainOptions } from "../../components/page-transition-curtain/PageTransitionCurtainEngine.js";
import type { MotionController } from "../../components/page-transition-curtain/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PageTransitionCurtainOptions = {}): ReturnType<typeof mountPageTransitionCurtain> {
  return mountPageTransitionCurtain(target, options);
}
export type { PageTransitionCurtainOptions };
