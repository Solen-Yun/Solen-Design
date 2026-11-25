"use client";
import { useEffect, useRef } from "react";
import { mountMegaMenuMorph, type MegaMenuMorphOptions } from "./MegaMenuMorphEngine.js";
import type { MotionController } from "./motion-runtime";

export function MegaMenuMorph({ options, className }: { options?: MegaMenuMorphOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMegaMenuMorph(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="mega-menu-morph" />;
}
