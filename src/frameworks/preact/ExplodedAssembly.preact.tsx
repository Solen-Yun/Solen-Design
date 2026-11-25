/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountExplodedAssembly, type ExplodedAssemblyOptions } from "../../components/exploded-assembly/ExplodedAssemblyEngine.js";
import type { MotionController } from "../../components/exploded-assembly/motion-runtime";

export function ExplodedAssembly({ options, className }: { options?: ExplodedAssemblyOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountExplodedAssembly(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="exploded-assembly" />;
}
