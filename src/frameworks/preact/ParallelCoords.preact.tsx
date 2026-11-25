/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountParallelCoords, type ParallelCoordsOptions } from "../../components/parallel-coords/ParallelCoordsEngine.js";
import type { MotionController } from "../../components/parallel-coords/motion-runtime";

export function ParallelCoords({ options, className }: { options?: ParallelCoordsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountParallelCoords(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="parallel-coords" />;
}
