/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSodaCan, type SodaCanOptions } from "../../components/soda-can/SodaCanEngine.js";
import type { MotionController } from "../../components/soda-can/motion-runtime";

export function SodaCan({ options, className }: { options?: SodaCanOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSodaCan(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="soda-can" />;
}
