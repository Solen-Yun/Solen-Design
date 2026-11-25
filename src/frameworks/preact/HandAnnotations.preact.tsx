/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountHandAnnotations, type HandAnnotationsOptions } from "../../components/hand-annotations/HandAnnotationsEngine.js";
import type { MotionController } from "../../components/hand-annotations/motion-runtime";

export function HandAnnotations({ options, className }: { options?: HandAnnotationsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountHandAnnotations(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="hand-annotations" />;
}
