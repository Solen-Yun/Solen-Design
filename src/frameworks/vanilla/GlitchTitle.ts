import { mountGlitchTitle, type GlitchTitleOptions } from "../../components/glitch-title/GlitchTitleEngine.js";
import type { MotionController } from "../../components/glitch-title/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GlitchTitleOptions = {}): ReturnType<typeof mountGlitchTitle> {
  return mountGlitchTitle(target, options);
}
export type { GlitchTitleOptions };
