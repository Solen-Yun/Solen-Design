"use client";
import { useEffect, useRef } from "react";
import { mountPageTransitionCurtain, type PageTransitionCurtainOptions } from "./PageTransitionCurtainEngine.js";
import type { MotionController } from "./motion-runtime";

export function PageTransitionCurtain({ options, className }: { options?: PageTransitionCurtainOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPageTransitionCurtain(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="page-transition-curtain" />;
}
