import { mountLettersScatter, type LettersScatterOptions } from "../../components/letters-scatter/LettersScatterEngine.js";
import type { MotionController } from "../../components/letters-scatter/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LettersScatterOptions = {}): ReturnType<typeof mountLettersScatter> {
  return mountLettersScatter(target, options);
}
export type { LettersScatterOptions };
