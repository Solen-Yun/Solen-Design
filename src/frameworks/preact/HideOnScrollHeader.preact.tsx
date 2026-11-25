/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountHideOnScrollHeader, type HideOnScrollHeaderOptions } from "../../components/hide-on-scroll-header/HideOnScrollHeaderEngine.js";
import type { MotionController } from "../../components/hide-on-scroll-header/motion-runtime";

export function HideOnScrollHeader({ options, className }: { options?: HideOnScrollHeaderOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountHideOnScrollHeader(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="hide-on-scroll-header" />;
}
