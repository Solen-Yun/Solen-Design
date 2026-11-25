import { mountDetailExpand, type DetailExpandOptions } from "../../components/detail-expand/DetailExpandEngine.js";
import type { MotionController } from "../../components/detail-expand/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DetailExpandOptions = {}): ReturnType<typeof mountDetailExpand> {
  return mountDetailExpand(target, options);
}
export type { DetailExpandOptions };
