/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCardSwap, type CardSwapOptions } from "../../components/card-swap/CardSwapEngine.js";
import type { MotionController } from "../../components/card-swap/motion-runtime";

export function CardSwap({ options, className }: { options?: CardSwapOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCardSwap(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="card-swap" />;
}
