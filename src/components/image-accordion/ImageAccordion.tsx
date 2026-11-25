"use client";
import { useEffect, useRef } from "react";
import { mountImageAccordion, type ImageAccordionOptions } from "./ImageAccordionEngine.js";
import type { MotionController } from "./motion-runtime";

export function ImageAccordion({ options, className }: { options?: ImageAccordionOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountImageAccordion(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="image-accordion" />;
}
