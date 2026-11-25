import type { MotionOptions, MotionController } from "./motion-runtime";
export type PhotoTrailOptions = MotionOptions;
export function mountPhotoTrail(target: HTMLElement, options?: PhotoTrailOptions): MotionController;
