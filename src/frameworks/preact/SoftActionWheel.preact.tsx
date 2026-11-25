/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSoftActionWheel, type SoftActionWheelOptions } from "../../components/soft-action-wheel/SoftActionWheelEngine.js";
import type { MotionController } from "../../components/soft-action-wheel/motion-runtime";

export function SoftActionWheel({ options, className }: { options?: SoftActionWheelOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSoftActionWheel(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="soft-action-wheel" />;
}
