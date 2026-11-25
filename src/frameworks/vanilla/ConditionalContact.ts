import { mountConditionalContact, type ConditionalContactOptions } from "../../components/conditional-contact/ConditionalContactEngine.js";
import type { MotionController } from "../../components/conditional-contact/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ConditionalContactOptions = {}): ReturnType<typeof mountConditionalContact> {
  return mountConditionalContact(target, options);
}
export type { ConditionalContactOptions };
