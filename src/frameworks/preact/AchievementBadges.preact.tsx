/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAchievementBadges, type AchievementBadgesOptions } from "../../components/achievement-badges/AchievementBadgesEngine.js";
import type { MotionController } from "../../components/achievement-badges/motion-runtime";

export function AchievementBadges({ options, className }: { options?: AchievementBadgesOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAchievementBadges(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="achievement-badges" />;
}
