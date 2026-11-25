"use client";
import { useEffect, useRef } from "react";
import { mountStaggeredRadialMenu, type StaggeredRadialMenuOptions } from "./StaggeredRadialMenuEngine.js";
import type { MotionController } from "./motion-runtime";

export function StaggeredRadialMenu({ options, className }: { options?: StaggeredRadialMenuOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountStaggeredRadialMenu(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="staggered-radial-menu" />;
}
