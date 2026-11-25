/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountMatchaPowderReveal, type MatchaPowderRevealOptions } from "../../components/matcha-powder-reveal/MatchaPowderRevealEngine.js";
import type { MotionController } from "../../components/matcha-powder-reveal/motion-runtime";

export function MatchaPowderReveal({ options, className }: { options?: MatchaPowderRevealOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMatchaPowderReveal(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="matcha-powder-reveal" />;
}
