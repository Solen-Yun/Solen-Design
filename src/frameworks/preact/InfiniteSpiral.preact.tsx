/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountInfiniteSpiral, type InfiniteSpiralOptions } from "../../components/infinite-spiral/InfiniteSpiralEngine.js";
import type { MotionController } from "../../components/infinite-spiral/motion-runtime";

export function InfiniteSpiral({ options, className }: { options?: InfiniteSpiralOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountInfiniteSpiral(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="infinite-spiral" />;
}
