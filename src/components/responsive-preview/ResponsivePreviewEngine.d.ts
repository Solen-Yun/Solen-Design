import type { MotionOptions, MotionController } from "./motion-runtime";
export type ResponsivePreviewOptions = MotionOptions;
export function mountResponsivePreview(target: HTMLElement, options?: ResponsivePreviewOptions): MotionController;
