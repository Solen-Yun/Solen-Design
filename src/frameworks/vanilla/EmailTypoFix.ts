import { mountEmailTypoFix, type EmailTypoFixOptions } from "../../components/email-typo-fix/EmailTypoFixEngine.js";
import type { MotionController } from "../../components/email-typo-fix/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: EmailTypoFixOptions = {}): ReturnType<typeof mountEmailTypoFix> {
  return mountEmailTypoFix(target, options);
}
export type { EmailTypoFixOptions };
