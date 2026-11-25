import { mountOtpVerification, type OtpVerificationOptions } from "../../components/otp-verification/OtpVerificationEngine.js";
import type { MotionController } from "../../components/otp-verification/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: OtpVerificationOptions = {}): ReturnType<typeof mountOtpVerification> {
  return mountOtpVerification(target, options);
}
export type { OtpVerificationOptions };
