/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountLevelUpXp, type LevelUpXpOptions } from "../../components/level-up-xp/LevelUpXpEngine.js";
import type { MotionController } from "../../components/level-up-xp/motion-runtime";

export function LevelUpXp({ options, className }: { options?: LevelUpXpOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountLevelUpXp(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="level-up-xp" />;
}
