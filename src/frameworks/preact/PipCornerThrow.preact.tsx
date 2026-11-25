/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountPipCornerThrow, type PipCornerThrowOptions } from "../../components/pip-corner-throw/PipCornerThrowEngine.js";
import type { MotionController } from "../../components/pip-corner-throw/motion-runtime";

export function PipCornerThrow({ options, className }: { options?: PipCornerThrowOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPipCornerThrow(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="pip-corner-throw" />;
}
