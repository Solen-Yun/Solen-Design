/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCircularTextBadge, type CircularTextBadgeOptions } from "../../components/circular-text-badge/CircularTextBadgeEngine.js";
import type { MotionController } from "../../components/circular-text-badge/motion-runtime";

export function CircularTextBadge({ options, className }: { options?: CircularTextBadgeOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCircularTextBadge(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="circular-text-badge" />;
}
