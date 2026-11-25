/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountHammerheadChart, type HammerheadChartOptions } from "../../components/hammerhead-chart/HammerheadChartEngine.js";
import type { MotionController } from "../../components/hammerhead-chart/motion-runtime";

export function HammerheadChart({ options, className }: { options?: HammerheadChartOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountHammerheadChart(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="hammerhead-chart" />;
}
