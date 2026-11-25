/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSlopeChart, type SlopeChartOptions } from "../../components/slope-chart/SlopeChartEngine.js";
import type { MotionController } from "../../components/slope-chart/motion-runtime";

export function SlopeChart({ options, className }: { options?: SlopeChartOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSlopeChart(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="slope-chart" />;
}
