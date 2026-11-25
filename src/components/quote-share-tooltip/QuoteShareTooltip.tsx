"use client";
import { useEffect, useRef } from "react";
import { mountQuoteShareTooltip, type QuoteShareTooltipOptions } from "./QuoteShareTooltipEngine.js";
import type { MotionController } from "./motion-runtime";

export function QuoteShareTooltip({ options, className }: { options?: QuoteShareTooltipOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountQuoteShareTooltip(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="quote-share-tooltip" />;
}
