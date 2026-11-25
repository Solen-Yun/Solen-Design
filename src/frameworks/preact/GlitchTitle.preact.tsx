/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountGlitchTitle, type GlitchTitleOptions } from "../../components/glitch-title/GlitchTitleEngine.js";
import type { MotionController } from "../../components/glitch-title/motion-runtime";

export function GlitchTitle({ options, className }: { options?: GlitchTitleOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountGlitchTitle(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="glitch-title" />;
}
