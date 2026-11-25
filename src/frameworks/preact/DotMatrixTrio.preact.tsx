/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDotMatrixTrio, type DotMatrixTrioOptions } from "../../components/dot-matrix-trio/DotMatrixTrioEngine.js";
import type { MotionController } from "../../components/dot-matrix-trio/motion-runtime";

export function DotMatrixTrio({ options, className }: { options?: DotMatrixTrioOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDotMatrixTrio(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="dot-matrix-trio" />;
}
