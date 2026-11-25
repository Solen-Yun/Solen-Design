/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountMobileDrillMenu, type MobileDrillMenuOptions } from "../../components/mobile-drill-menu/MobileDrillMenuEngine.js";
import type { MotionController } from "../../components/mobile-drill-menu/motion-runtime";

export function MobileDrillMenu({ options, className }: { options?: MobileDrillMenuOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMobileDrillMenu(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="mobile-drill-menu" />;
}
