import type { MotionOptions, MotionController } from "./motion-runtime";
export type BlockPageBuilderOptions = MotionOptions;
export function mountBlockPageBuilder(target: HTMLElement, options?: BlockPageBuilderOptions): MotionController;
