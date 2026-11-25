import { mountMarkerHighlight, type MarkerHighlightOptions } from "../../components/marker-highlight/MarkerHighlightEngine.js";
import type { MotionController } from "../../components/marker-highlight/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MarkerHighlightOptions = {}): ReturnType<typeof mountMarkerHighlight> {
  return mountMarkerHighlight(target, options);
}
export type { MarkerHighlightOptions };
