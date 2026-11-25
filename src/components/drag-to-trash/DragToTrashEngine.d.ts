import type { MotionOptions, MotionController } from "./motion-runtime";
export type DragToTrashOptions = MotionOptions;
export function mountDragToTrash(target: HTMLElement, options?: DragToTrashOptions): MotionController;
