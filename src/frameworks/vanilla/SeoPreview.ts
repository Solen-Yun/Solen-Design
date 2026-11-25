import { mountSeoPreview, type SeoPreviewOptions } from "../../components/seo-preview/SeoPreviewEngine.js";
import type { MotionController } from "../../components/seo-preview/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SeoPreviewOptions = {}): ReturnType<typeof mountSeoPreview> {
  return mountSeoPreview(target, options);
}
export type { SeoPreviewOptions };
