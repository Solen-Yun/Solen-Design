import type { MotionOptions, MotionController } from "./motion-runtime";
export type PushNavigationStackOptions = MotionOptions;
export function mountPushNavigationStack(target: HTMLElement, options?: PushNavigationStackOptions): MotionController;
