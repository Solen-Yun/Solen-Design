/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSyncedMultiples, type SyncedMultiplesOptions } from "../../components/synced-multiples/SyncedMultiplesEngine.js";
import type { MotionController } from "../../components/synced-multiples/motion-runtime";

export function SyncedMultiples({ options, className }: { options?: SyncedMultiplesOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSyncedMultiples(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="synced-multiples" />;
}
