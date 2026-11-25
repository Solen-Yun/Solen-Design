import { mountPasskeySignin, type PasskeySigninOptions } from "../../components/passkey-signin/PasskeySigninEngine.js";
import type { MotionController } from "../../components/passkey-signin/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PasskeySigninOptions = {}): ReturnType<typeof mountPasskeySignin> {
  return mountPasskeySignin(target, options);
}
export type { PasskeySigninOptions };
