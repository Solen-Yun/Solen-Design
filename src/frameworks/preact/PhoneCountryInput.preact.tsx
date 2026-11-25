/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountPhoneCountryInput, type PhoneCountryInputOptions } from "../../components/phone-country-input/PhoneCountryInputEngine.js";
import type { MotionController } from "../../components/phone-country-input/motion-runtime";

export function PhoneCountryInput({ options, className }: { options?: PhoneCountryInputOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPhoneCountryInput(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="phone-country-input" />;
}
