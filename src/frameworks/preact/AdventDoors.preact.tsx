/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAdventDoors, type AdventDoorsOptions } from "../../components/advent-doors/AdventDoorsEngine.js";
import type { MotionController } from "../../components/advent-doors/motion-runtime";

export function AdventDoors({ options, className }: { options?: AdventDoorsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAdventDoors(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="advent-doors" />;
}
