/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountBarChartRace, type BarChartRaceOptions } from "../../components/bar-chart-race/BarChartRaceEngine.js";
import type { MotionController } from "../../components/bar-chart-race/motion-runtime";

export function BarChartRace({ options, className }: { options?: BarChartRaceOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountBarChartRace(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="bar-chart-race" />;
}
