/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAiTldr, type AiTldrOptions } from "../../components/ai-tldr/AiTldrEngine.js";
import type { MotionController } from "../../components/ai-tldr/motion-runtime";

export function AiTldr({ options, className }: { options?: AiTldrOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAiTldr(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="ai-tldr" />;
}
