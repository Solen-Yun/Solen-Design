/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountScrollMarqueeRows, type ScrollMarqueeRowsOptions } from "../../components/scroll-marquee-rows/ScrollMarqueeRowsEngine.js";
import type { MotionController } from "../../components/scroll-marquee-rows/motion-runtime";

export function ScrollMarqueeRows({ options, className }: { options?: ScrollMarqueeRowsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountScrollMarqueeRows(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="scroll-marquee-rows" />;
}
