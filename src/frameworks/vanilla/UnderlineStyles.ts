import { mountUnderlineStyles, type UnderlineStylesOptions } from "../../components/underline-styles/UnderlineStylesEngine.js";
import type { MotionController } from "../../components/underline-styles/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: UnderlineStylesOptions = {}): ReturnType<typeof mountUnderlineStyles> {
  return mountUnderlineStyles(target, options);
}
export type { UnderlineStylesOptions };
