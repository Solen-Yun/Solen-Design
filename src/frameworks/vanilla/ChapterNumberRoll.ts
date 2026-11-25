import { mountChapterNumberRoll, type ChapterNumberRollOptions } from "../../components/chapter-number-roll/ChapterNumberRollEngine.js";
import type { MotionController } from "../../components/chapter-number-roll/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ChapterNumberRollOptions = {}): ReturnType<typeof mountChapterNumberRoll> {
  return mountChapterNumberRoll(target, options);
}
export type { ChapterNumberRollOptions };
