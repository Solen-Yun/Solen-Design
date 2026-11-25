"use client";
import { useEffect, useRef } from "react";
import { mountTypewriterRotatingWords, type TypewriterRotatingWordsOptions } from "./TypewriterRotatingWordsEngine.js";
import type { MotionController } from "./motion-runtime";

export function TypewriterRotatingWords({ options, className }: { options?: TypewriterRotatingWordsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountTypewriterRotatingWords(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="typewriter-rotating-words" />;
}
