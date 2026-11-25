/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDirectionAwareTiles, type DirectionAwareTilesOptions } from "../../components/direction-aware-tiles/DirectionAwareTilesEngine.js";
import type { MotionController } from "../../components/direction-aware-tiles/motion-runtime";

export function DirectionAwareTiles({ options, className }: { options?: DirectionAwareTilesOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDirectionAwareTiles(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="direction-aware-tiles" />;
}
