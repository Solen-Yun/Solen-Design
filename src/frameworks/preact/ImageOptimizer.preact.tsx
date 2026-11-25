/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountImageOptimizer, type ImageOptimizerOptions } from "../../components/image-optimizer/ImageOptimizerEngine.js";
import type { MotionController } from "../../components/image-optimizer/motion-runtime";

export function ImageOptimizer({ options, className }: { options?: ImageOptimizerOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountImageOptimizer(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="image-optimizer" />;
}
