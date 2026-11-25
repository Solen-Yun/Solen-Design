import { mountTypeToDelete, type TypeToDeleteOptions } from "../../components/type-to-delete/TypeToDeleteEngine.js";
import type { MotionController } from "../../components/type-to-delete/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TypeToDeleteOptions = {}): ReturnType<typeof mountTypeToDelete> {
  return mountTypeToDelete(target, options);
}
export type { TypeToDeleteOptions };
