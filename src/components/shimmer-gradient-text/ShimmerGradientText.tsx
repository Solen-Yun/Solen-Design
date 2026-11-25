"use client";
import { useEffect, useRef } from "react";
import { mountShimmerGradientText, type ShimmerGradientTextOptions } from "./ShimmerGradientTextEngine.js";
import type { MotionController } from "./motion-runtime";

export function ShimmerGradientText({ options, className }: { options?: ShimmerGradientTextOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountShimmerGradientText(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="shimmer-gradient-text" />;
}
