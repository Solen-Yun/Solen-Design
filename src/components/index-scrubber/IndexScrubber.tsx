"use client";
import { useEffect, useRef } from "react";
import { mountIndexScrubber, type IndexScrubberOptions } from "./IndexScrubberEngine.js";
import type { MotionController } from "./motion-runtime";

export function IndexScrubber({ options, className }: { options?: IndexScrubberOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountIndexScrubber(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="index-scrubber" />;
}
