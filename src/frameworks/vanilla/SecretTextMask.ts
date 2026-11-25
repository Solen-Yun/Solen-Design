import { mountSecretTextMask, type SecretTextMaskOptions } from "../../components/secret-text-mask/SecretTextMaskEngine.js";
import type { MotionController } from "../../components/secret-text-mask/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SecretTextMaskOptions = {}): ReturnType<typeof mountSecretTextMask> {
  return mountSecretTextMask(target, options);
}
export type { SecretTextMaskOptions };
