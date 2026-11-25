/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDeliveryCutoff, type DeliveryCutoffOptions } from "../../components/delivery-cutoff/DeliveryCutoffEngine.js";
import type { MotionController } from "../../components/delivery-cutoff/motion-runtime";

export function DeliveryCutoff({ options, className }: { options?: DeliveryCutoffOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDeliveryCutoff(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="delivery-cutoff" />;
}
