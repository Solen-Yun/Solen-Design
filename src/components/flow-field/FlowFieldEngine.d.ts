import type { MotionOptions, MotionController } from "./motion-runtime";
export type FlowFieldOptions = MotionOptions;
export function mountFlowField(target: HTMLElement, options?: FlowFieldOptions): MotionController;
