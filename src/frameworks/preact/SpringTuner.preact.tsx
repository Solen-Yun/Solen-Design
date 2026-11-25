/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSpringTuner, type SpringTunerOptions } from "../../components/spring-tuner/SpringTunerEngine.js";
import type { MotionController } from "../../components/spring-tuner/motion-runtime";

export function SpringTuner({ options, className }: { options?: SpringTunerOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSpringTuner(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="spring-tuner" />;
}
