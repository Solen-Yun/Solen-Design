import { mountKanbanDrag, type KanbanDragOptions } from "../../components/kanban-drag/KanbanDragEngine.js";
import type { MotionController } from "../../components/kanban-drag/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: KanbanDragOptions = {}): ReturnType<typeof mountKanbanDrag> {
  return mountKanbanDrag(target, options);
}
export type { KanbanDragOptions };
