import type { MotionOptions, MotionController } from "./motion-runtime";
export type ShareInviteOptions = MotionOptions & { locale?: "en" | "zh" };
export function mountShareInvite(target: HTMLElement, options?: ShareInviteOptions): MotionController;
