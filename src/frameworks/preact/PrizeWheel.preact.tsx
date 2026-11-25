/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountPrizeWheel, type PrizeWheelOptions } from "../../components/prize-wheel/PrizeWheelEngine.js";
import type { MotionController } from "../../components/prize-wheel/motion-runtime";

export function PrizeWheel({ options, className }: { options?: PrizeWheelOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPrizeWheel(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="prize-wheel" />;
}
