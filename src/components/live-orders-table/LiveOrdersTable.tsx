"use client";
import { useEffect, useRef } from "react";
import { mountLiveOrdersTable, type LiveOrdersTableOptions } from "./LiveOrdersTableEngine.js";
import type { MotionController } from "./motion-runtime";

export function LiveOrdersTable({ options, className }: { options?: LiveOrdersTableOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountLiveOrdersTable(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="live-orders-table" />;
}
