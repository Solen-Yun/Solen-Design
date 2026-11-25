import type { MotionOptions, MotionController } from "./motion-runtime";
export type PageSpeedAuditOptions = MotionOptions;
export function mountPageSpeedAudit(target: HTMLElement, options?: PageSpeedAuditOptions): MotionController;
