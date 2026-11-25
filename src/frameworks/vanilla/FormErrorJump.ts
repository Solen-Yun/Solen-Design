import { mountFormErrorJump, type FormErrorJumpOptions } from "../../components/form-error-jump/FormErrorJumpEngine.js";
import type { MotionController } from "../../components/form-error-jump/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FormErrorJumpOptions = {}): ReturnType<typeof mountFormErrorJump> {
  return mountFormErrorJump(target, options);
}
export type { FormErrorJumpOptions };
