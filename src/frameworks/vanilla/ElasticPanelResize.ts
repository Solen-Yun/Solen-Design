import { mountElasticPanelResize, type ElasticPanelResizeOptions } from "../../components/elastic-panel-resize/ElasticPanelResizeEngine.js";
import type { MotionController } from "../../components/elastic-panel-resize/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ElasticPanelResizeOptions = {}): ReturnType<typeof mountElasticPanelResize> {
  return mountElasticPanelResize(target, options);
}
export type { ElasticPanelResizeOptions };
