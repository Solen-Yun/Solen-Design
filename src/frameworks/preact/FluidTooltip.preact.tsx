/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountFluidTooltip, type FluidTooltipOptions } from "../../components/fluid-tooltip/FluidTooltipEngine.js";
import type { MotionController } from "../../components/fluid-tooltip/motion-runtime";

export function FluidTooltip({ options, className }: { options?: FluidTooltipOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountFluidTooltip(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="fluid-tooltip" />;
}
