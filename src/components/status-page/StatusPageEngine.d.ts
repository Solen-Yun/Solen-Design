import type { MotionOptions, MotionController } from "./motion-runtime";
export type StatusPageOptions = MotionOptions;
export function mountStatusPage(target: HTMLElement, options?: StatusPageOptions): MotionController;
