/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSecretTextMask, type SecretTextMaskOptions } from "../../components/secret-text-mask/SecretTextMaskEngine.js";
import type { MotionController } from "../../components/secret-text-mask/motion-runtime";

export function SecretTextMask({ options, className }: { options?: SecretTextMaskOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSecretTextMask(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="secret-text-mask" />;
}
