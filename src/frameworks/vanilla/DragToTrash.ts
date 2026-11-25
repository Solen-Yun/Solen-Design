import { mountDragToTrash, type DragToTrashOptions } from "../../components/drag-to-trash/DragToTrashEngine.js";
import type { MotionController } from "../../components/drag-to-trash/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DragToTrashOptions = {}): ReturnType<typeof mountDragToTrash> {
  return mountDragToTrash(target, options);
}
export type { DragToTrashOptions };
