"use client";
import { useEffect, useRef } from "react";
import { mountAiPromptHero, type AiPromptHeroOptions } from "./AiPromptHeroEngine.js";
import type { MotionController } from "./motion-runtime";

export function AiPromptHero({ options, className }: { options?: AiPromptHeroOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAiPromptHero(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="ai-prompt-hero" />;
}
