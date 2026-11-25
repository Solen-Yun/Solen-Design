import type { MotionOptions, MotionController } from "./motion-runtime";
export type OtpVerificationOptions = MotionOptions & { autoPlay?: boolean; onReplayComplete?: () => void };
export function mountOtpVerification(target: HTMLElement, options?: OtpVerificationOptions): MotionController;
