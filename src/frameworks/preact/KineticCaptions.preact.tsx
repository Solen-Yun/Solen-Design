/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountKineticCaptions, type KineticCaptionsOptions } from "../../components/kinetic-captions/KineticCaptionsEngine.js";
import type { MotionController } from "../../components/kinetic-captions/motion-runtime";

export function KineticCaptions({ options, className }: { options?: KineticCaptionsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountKineticCaptions(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="kinetic-captions" />;
}
