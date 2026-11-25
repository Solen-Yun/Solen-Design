/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDotGridWave, type DotGridWaveOptions } from "../../components/dot-grid-wave/DotGridWaveEngine.js";
import type { MotionController } from "../../components/dot-grid-wave/motion-runtime";

export function DotGridWave({ options, className }: { options?: DotGridWaveOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDotGridWave(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="dot-grid-wave" />;
}
