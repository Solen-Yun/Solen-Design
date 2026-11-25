/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCookieConsent, type CookieConsentOptions } from "../../components/cookie-consent/CookieConsentEngine.js";
import type { MotionController } from "../../components/cookie-consent/motion-runtime";

export function CookieConsent({ options, className }: { options?: CookieConsentOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCookieConsent(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="cookie-consent" />;
}
