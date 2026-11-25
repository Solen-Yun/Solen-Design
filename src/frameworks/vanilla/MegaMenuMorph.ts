import { mountMegaMenuMorph, type MegaMenuMorphOptions } from "../../components/mega-menu-morph/MegaMenuMorphEngine.js";
import type { MotionController } from "../../components/mega-menu-morph/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MegaMenuMorphOptions = {}): ReturnType<typeof mountMegaMenuMorph> {
  return mountMegaMenuMorph(target, options);
}
export type { MegaMenuMorphOptions };
