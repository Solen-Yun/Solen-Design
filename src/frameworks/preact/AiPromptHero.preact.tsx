/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAiPromptHero, type AiPromptHeroOptions } from "../../components/ai-prompt-hero/AiPromptHeroEngine.js";
import type { MotionController } from "../../components/ai-prompt-hero/motion-runtime";

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
