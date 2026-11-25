import { mountGridBeamHero, type GridBeamHeroOptions } from "../../components/grid-beam-hero/GridBeamHeroEngine.js";
import type { MotionController } from "../../components/grid-beam-hero/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GridBeamHeroOptions = {}): ReturnType<typeof mountGridBeamHero> {
  return mountGridBeamHero(target, options);
}
export type { GridBeamHeroOptions };
