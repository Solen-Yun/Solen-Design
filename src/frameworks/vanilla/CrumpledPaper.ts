import { mountCrumpledPaper, type CrumpledPaperOptions } from "../../components/crumpled-paper/CrumpledPaperEngine.js";
import type { MotionController } from "../../components/crumpled-paper/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CrumpledPaperOptions = {}): ReturnType<typeof mountCrumpledPaper> {
  return mountCrumpledPaper(target, options);
}
export type { CrumpledPaperOptions };
