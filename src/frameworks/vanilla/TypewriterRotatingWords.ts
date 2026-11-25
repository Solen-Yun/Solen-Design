import { mountTypewriterRotatingWords, type TypewriterRotatingWordsOptions } from "../../components/typewriter-rotating-words/TypewriterRotatingWordsEngine.js";
import type { MotionController } from "../../components/typewriter-rotating-words/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TypewriterRotatingWordsOptions = {}): ReturnType<typeof mountTypewriterRotatingWords> {
  return mountTypewriterRotatingWords(target, options);
}
export type { TypewriterRotatingWordsOptions };
