/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountUnderlineStyles, type UnderlineStylesOptions } from "../../components/underline-styles/UnderlineStylesEngine.js";
import type { MotionController } from "../../components/underline-styles/motion-runtime";

export function UnderlineStyles({ options, className }: { options?: UnderlineStylesOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountUnderlineStyles(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="underline-styles" />;
}
