/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountGlassFolder, type GlassFolderOptions } from "../../components/glass-folder/GlassFolderEngine.js";
import type { MotionController } from "../../components/glass-folder/motion-runtime";

export function GlassFolder({ options, className }: { options?: GlassFolderOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountGlassFolder(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="glass-folder" />;
}
