/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAuroraMesh, type AuroraMeshOptions } from "../../components/aurora-mesh/AuroraMeshEngine.js";
import type { MotionController } from "../../components/aurora-mesh/motion-runtime";

export function AuroraMesh({ options, className }: { options?: AuroraMeshOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAuroraMesh(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="aurora-mesh" />;
}
