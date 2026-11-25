import { mountFoldedEmojiScroll, type FoldedEmojiScrollOptions } from "../../components/folded-emoji-scroll/FoldedEmojiScrollEngine.js";
import type { MotionController } from "../../components/folded-emoji-scroll/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FoldedEmojiScrollOptions = {}): ReturnType<typeof mountFoldedEmojiScroll> {
  return mountFoldedEmojiScroll(target, options);
}
export type { FoldedEmojiScrollOptions };
