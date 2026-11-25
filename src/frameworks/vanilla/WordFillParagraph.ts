import { mountWordFillParagraph, type WordFillParagraphOptions } from "../../components/word-fill-paragraph/WordFillParagraphEngine.js";
import type { MotionController } from "../../components/word-fill-paragraph/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: WordFillParagraphOptions = {}): ReturnType<typeof mountWordFillParagraph> {
  return mountWordFillParagraph(target, options);
}
export type { WordFillParagraphOptions };
