/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountInlineTextMorph, type InlineTextMorphOptions } from "../../components/inline-text-morph/InlineTextMorphEngine.js";
import type { MotionController } from "../../components/inline-text-morph/motion-runtime";

export function InlineTextMorph({ options, className }: { options?: InlineTextMorphOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountInlineTextMorph(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="inline-text-morph" />;
}
