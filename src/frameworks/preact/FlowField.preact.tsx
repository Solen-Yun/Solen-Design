/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountFlowField, type FlowFieldOptions } from "../../components/flow-field/FlowFieldEngine.js";
import type { MotionController } from "../../components/flow-field/motion-runtime";

export function FlowField({ options, className }: { options?: FlowFieldOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountFlowField(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="flow-field" />;
}
