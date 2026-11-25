import type { MotionOptions, MotionController } from "./motion-runtime";
export type KeyholeZoomOptions = MotionOptions;
export function mountKeyholeZoom(target: HTMLElement, options?: KeyholeZoomOptions): MotionController;
