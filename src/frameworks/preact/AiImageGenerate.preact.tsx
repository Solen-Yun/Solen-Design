/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAiImageGenerate, type AiImageGenerateOptions } from "../../components/ai-image-generate/AiImageGenerateEngine.js";
import type { MotionController } from "../../components/ai-image-generate/motion-runtime";

export function AiImageGenerate({ options, className }: { options?: AiImageGenerateOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAiImageGenerate(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="ai-image-generate" />;
}
