import { mountNotesTextColor, type NotesTextColorOptions } from "../../components/notes-text-color/NotesTextColorEngine.js";
import type { MotionController } from "../../components/notes-text-color/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: NotesTextColorOptions = {}): ReturnType<typeof mountNotesTextColor> {
  return mountNotesTextColor(target, options);
}
export type { NotesTextColorOptions };
