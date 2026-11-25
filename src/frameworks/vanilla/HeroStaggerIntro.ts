import { mountHeroStaggerIntro, type HeroStaggerIntroOptions } from "../../components/hero-stagger-intro/HeroStaggerIntroEngine.js";
import type { MotionController } from "../../components/hero-stagger-intro/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: HeroStaggerIntroOptions = {}): ReturnType<typeof mountHeroStaggerIntro> {
  return mountHeroStaggerIntro(target, options);
}
export type { HeroStaggerIntroOptions };
