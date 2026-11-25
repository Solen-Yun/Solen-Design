"use client";
import { useEffect, useRef } from "react";
import { mountMatchaPowderReveal, type MatchaPowderRevealOptions } from "./MatchaPowderRevealEngine.js";
import type { MotionController } from "./motion-runtime";

export function MatchaPowderReveal({ options, className }: { options?: MatchaPowderRevealOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMatchaPowderReveal(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="matcha-powder-reveal" />;
}
