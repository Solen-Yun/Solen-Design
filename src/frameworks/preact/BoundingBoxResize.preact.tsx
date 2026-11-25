/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountBoundingBoxResize, type BoundingBoxResizeOptions } from "../../components/bounding-box-resize/BoundingBoxResizeEngine.js";
import type { MotionController } from "../../components/bounding-box-resize/motion-runtime";

export function BoundingBoxResize({ options, className }: { options?: BoundingBoxResizeOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountBoundingBoxResize(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="bounding-box-resize" />;
}
