import { mountDetailSidePanel, type DetailSidePanelOptions } from "../../components/detail-side-panel/DetailSidePanelEngine.js";
import type { MotionController } from "../../components/detail-side-panel/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DetailSidePanelOptions = {}): ReturnType<typeof mountDetailSidePanel> {
  return mountDetailSidePanel(target, options);
}
export type { DetailSidePanelOptions };
