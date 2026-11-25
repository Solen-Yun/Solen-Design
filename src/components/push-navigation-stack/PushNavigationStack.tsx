"use client";
import { useEffect, useRef } from "react";
import { mountPushNavigationStack, type PushNavigationStackOptions } from "./PushNavigationStackEngine.js";
import type { MotionController } from "./motion-runtime";

export function PushNavigationStack({ options, className }: { options?: PushNavigationStackOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountPushNavigationStack(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="push-navigation-stack" />;
}
