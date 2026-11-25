/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountRegressionDrag, type RegressionDragOptions } from "../../components/regression-drag/RegressionDragEngine.js";
import type { MotionController } from "../../components/regression-drag/motion-runtime";

export function RegressionDrag({ options, className }: { options?: RegressionDragOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountRegressionDrag(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="regression-drag" />;
}
