/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSplitCurtainMenu, type SplitCurtainMenuOptions } from "../../components/split-curtain-menu/SplitCurtainMenuEngine.js";
import type { MotionController } from "../../components/split-curtain-menu/motion-runtime";

export function SplitCurtainMenu({ options, className }: { options?: SplitCurtainMenuOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSplitCurtainMenu(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="split-curtain-menu" />;
}
