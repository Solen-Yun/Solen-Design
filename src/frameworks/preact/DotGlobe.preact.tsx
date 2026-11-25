/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDotGlobe, type DotGlobeOptions } from "../../components/dot-globe/DotGlobeEngine.js";
import type { MotionController } from "../../components/dot-globe/motion-runtime";

export function DotGlobe({ options, className }: { options?: DotGlobeOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDotGlobe(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="dot-globe" />;
}
