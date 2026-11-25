import { mountHoverPreviewList, type HoverPreviewListOptions } from "../../components/hover-preview-list/HoverPreviewListEngine.js";
import type { MotionController } from "../../components/hover-preview-list/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: HoverPreviewListOptions = {}): ReturnType<typeof mountHoverPreviewList> {
  return mountHoverPreviewList(target, options);
}
export type { HoverPreviewListOptions };
