/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountScratchCard, type ScratchCardOptions } from "../../components/scratch-card/ScratchCardEngine.js";
import type { MotionController } from "../../components/scratch-card/motion-runtime";

export function ScratchCard({ options, className }: { options?: ScratchCardOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountScratchCard(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="scratch-card" />;
}
