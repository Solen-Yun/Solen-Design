/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountUsageMeter, type UsageMeterOptions } from "../../components/usage-meter/UsageMeterEngine.js";
import type { MotionController } from "../../components/usage-meter/motion-runtime";

export function UsageMeter({ options, className }: { options?: UsageMeterOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountUsageMeter(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="usage-meter" />;
}
