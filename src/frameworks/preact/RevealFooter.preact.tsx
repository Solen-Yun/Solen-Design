/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountRevealFooter, type RevealFooterOptions } from "../../components/reveal-footer/RevealFooterEngine.js";
import type { MotionController } from "../../components/reveal-footer/motion-runtime";

export function RevealFooter({ options, className }: { options?: RevealFooterOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountRevealFooter(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="reveal-footer" />;
}
