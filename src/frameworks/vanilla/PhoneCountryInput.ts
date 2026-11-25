import { mountPhoneCountryInput, type PhoneCountryInputOptions } from "../../components/phone-country-input/PhoneCountryInputEngine.js";
import type { MotionController } from "../../components/phone-country-input/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PhoneCountryInputOptions = {}): ReturnType<typeof mountPhoneCountryInput> {
  return mountPhoneCountryInput(target, options);
}
export type { PhoneCountryInputOptions };
