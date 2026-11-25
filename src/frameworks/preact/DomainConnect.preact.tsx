/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDomainConnect, type DomainConnectOptions } from "../../components/domain-connect/DomainConnectEngine.js";
import type { MotionController } from "../../components/domain-connect/motion-runtime";

export function DomainConnect({ options, className }: { options?: DomainConnectOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDomainConnect(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="domain-connect" />;
}
