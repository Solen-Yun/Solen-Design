/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountStreakFlame, type StreakFlameOptions } from "../../components/streak-flame/StreakFlameEngine.js";
import type { MotionController } from "../../components/streak-flame/motion-runtime";

export function StreakFlame({ options, className }: { options?: StreakFlameOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountStreakFlame(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="streak-flame" />;
}
