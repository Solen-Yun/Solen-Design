import { mountInlineTextMorph, type InlineTextMorphOptions } from "../../components/inline-text-morph/InlineTextMorphEngine.js";
import type { MotionController } from "../../components/inline-text-morph/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: InlineTextMorphOptions = {}): ReturnType<typeof mountInlineTextMorph> {
  return mountInlineTextMorph(target, options);
}
export type { InlineTextMorphOptions };
