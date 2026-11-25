/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountLogoWallCycle, type LogoWallCycleOptions } from "../../components/logo-wall-cycle/LogoWallCycleEngine.js";
import type { MotionController } from "../../components/logo-wall-cycle/motion-runtime";

export function LogoWallCycle({ options, className }: { options?: LogoWallCycleOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountLogoWallCycle(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="logo-wall-cycle" />;
}
