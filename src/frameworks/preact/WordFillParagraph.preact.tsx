/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountWordFillParagraph, type WordFillParagraphOptions } from "../../components/word-fill-paragraph/WordFillParagraphEngine.js";
import type { MotionController } from "../../components/word-fill-paragraph/motion-runtime";

export function WordFillParagraph({ options, className }: { options?: WordFillParagraphOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountWordFillParagraph(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="word-fill-paragraph" />;
}
