"use client";
import { useEffect, useRef } from "react";
import { mountStickyBuySheet, type StickyBuySheetOptions } from "./StickyBuySheetEngine.js";
import type { MotionController } from "./motion-runtime";

export function StickyBuySheet({ options, className }: { options?: StickyBuySheetOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountStickyBuySheet(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="sticky-buy-sheet" />;
}
