/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountGridListFlip, type GridListFlipOptions } from "../../components/grid-list-flip/GridListFlipEngine.js";
import type { MotionController } from "../../components/grid-list-flip/motion-runtime";

export function GridListFlip({ options, className }: { options?: GridListFlipOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountGridListFlip(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="grid-list-flip" />;
}
