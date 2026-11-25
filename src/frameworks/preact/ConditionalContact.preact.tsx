/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountConditionalContact, type ConditionalContactOptions } from "../../components/conditional-contact/ConditionalContactEngine.js";
import type { MotionController } from "../../components/conditional-contact/motion-runtime";

export function ConditionalContact({ options, className }: { options?: ConditionalContactOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountConditionalContact(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="conditional-contact" />;
}
