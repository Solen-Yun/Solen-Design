/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountProximityWeight, type ProximityWeightOptions } from "../../components/proximity-weight/ProximityWeightEngine.js";
import type { MotionController } from "../../components/proximity-weight/motion-runtime";

export function ProximityWeight({ options, className }: { options?: ProximityWeightOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountProximityWeight(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="proximity-weight" />;
}
