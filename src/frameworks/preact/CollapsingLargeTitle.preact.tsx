/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCollapsingLargeTitle, type CollapsingLargeTitleOptions } from "../../components/collapsing-large-title/CollapsingLargeTitleEngine.js";
import type { MotionController } from "../../components/collapsing-large-title/motion-runtime";

export function CollapsingLargeTitle({ options, className }: { options?: CollapsingLargeTitleOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCollapsingLargeTitle(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="collapsing-large-title" />;
}
