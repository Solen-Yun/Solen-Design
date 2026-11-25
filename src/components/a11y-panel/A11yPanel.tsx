"use client";
import { useEffect, useRef } from "react";
import { mountA11yPanel, type A11yPanelOptions } from "./A11yPanelEngine.js";
import type { MotionController } from "./motion-runtime";

export function A11yPanel({ options, className }: { options?: A11yPanelOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountA11yPanel(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="a11y-panel" />;
}
