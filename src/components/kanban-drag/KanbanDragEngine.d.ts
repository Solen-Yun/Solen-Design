import type { MotionOptions, MotionController } from "./motion-runtime";
export type KanbanDragOptions = MotionOptions;
export function mountKanbanDrag(target: HTMLElement, options?: KanbanDragOptions): MotionController;
