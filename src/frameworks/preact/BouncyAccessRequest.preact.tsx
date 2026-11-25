/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountBouncyAccessRequest, type BouncyAccessRequestOptions } from "../../components/bouncy-access-request/BouncyAccessRequestEngine.js";
import type { MotionController } from "../../components/bouncy-access-request/motion-runtime";

export function BouncyAccessRequest({ options, className }: { options?: BouncyAccessRequestOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountBouncyAccessRequest(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="bouncy-access" />;
}
