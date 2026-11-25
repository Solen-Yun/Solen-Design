import { mountCookieConsent, type CookieConsentOptions } from "../../components/cookie-consent/CookieConsentEngine.js";
import type { MotionController } from "../../components/cookie-consent/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CookieConsentOptions = {}): ReturnType<typeof mountCookieConsent> {
  return mountCookieConsent(target, options);
}
export type { CookieConsentOptions };
