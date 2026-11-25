/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDockingMiniPlayer, type DockingMiniPlayerOptions } from "../../components/docking-mini-player/DockingMiniPlayerEngine.js";
import type { MotionController } from "../../components/docking-mini-player/motion-runtime";

export function DockingMiniPlayer({ options, className }: { options?: DockingMiniPlayerOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDockingMiniPlayer(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="docking-mini-player" />;
}
