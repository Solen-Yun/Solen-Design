"use client";
import { useEffect, useRef } from "react";
import { mountDragCardCarousel, type DragCardCarouselOptions } from "./DragCardCarouselEngine.js";
import type { MotionController } from "./motion-runtime";

export function DragCardCarousel({ options, className }: { options?: DragCardCarouselOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDragCardCarousel(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="drag-card-carousel" />;
}
