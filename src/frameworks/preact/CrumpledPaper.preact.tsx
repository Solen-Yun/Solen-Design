/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCrumpledPaper, type CrumpledPaperOptions } from "../../components/crumpled-paper/CrumpledPaperEngine.js";
import type { MotionController } from "../../components/crumpled-paper/motion-runtime";

export function CrumpledPaper({ options, className }: { options?: CrumpledPaperOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCrumpledPaper(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="crumpled-paper" />;
}
