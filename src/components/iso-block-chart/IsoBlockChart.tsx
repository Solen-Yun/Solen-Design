"use client";
import { useEffect, useRef } from "react";
import { mountIsoBlockChart, type IsoBlockChartOptions } from "./IsoBlockChartEngine.js";
import type { MotionController } from "./motion-runtime";

export function IsoBlockChart({ options, className }: { options?: IsoBlockChartOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountIsoBlockChart(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="iso-block-chart" />;
}
