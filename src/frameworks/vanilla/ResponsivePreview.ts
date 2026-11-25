import { mountResponsivePreview, type ResponsivePreviewOptions } from "../../components/responsive-preview/ResponsivePreviewEngine.js";
import type { MotionController } from "../../components/responsive-preview/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ResponsivePreviewOptions = {}): ReturnType<typeof mountResponsivePreview> {
  return mountResponsivePreview(target, options);
}
export type { ResponsivePreviewOptions };
