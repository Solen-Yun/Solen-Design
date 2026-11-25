/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountLettersScatter, type LettersScatterOptions } from "../../components/letters-scatter/LettersScatterEngine.js";
import type { MotionController } from "../../components/letters-scatter/motion-runtime";

export function LettersScatter({ options, className }: { options?: LettersScatterOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountLettersScatter(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="letters-scatter" />;
}
