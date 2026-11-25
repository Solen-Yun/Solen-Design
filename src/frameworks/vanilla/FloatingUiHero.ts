import { mountFloatingUiHero, type FloatingUiHeroOptions } from "../../components/floating-ui-hero/FloatingUiHeroEngine.js";
import type { MotionController } from "../../components/floating-ui-hero/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FloatingUiHeroOptions = {}): ReturnType<typeof mountFloatingUiHero> {
  return mountFloatingUiHero(target, options);
}
export type { FloatingUiHeroOptions };
