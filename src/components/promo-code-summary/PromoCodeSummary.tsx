"use client";
import { useEffect, useRef } from "react";
import { mountPromoCodeSummary, type PromoCodeSummaryOptions } from "./PromoCodeSummaryEngine.js";
import type { MotionController } from "./motion-runtime";

export function PromoCodeSummary({ options, className }: { options?: PromoCodeSummaryOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPromoCodeSummary(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="promo-code-summary" />;
}
