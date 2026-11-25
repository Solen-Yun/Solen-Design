/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCompareTray, type CompareTrayOptions } from "../../components/compare-tray/CompareTrayEngine.js";
import type { MotionController } from "../../components/compare-tray/motion-runtime";

export function CompareTray({ options, className }: { options?: CompareTrayOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCompareTray(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="compare-tray" />;
}
