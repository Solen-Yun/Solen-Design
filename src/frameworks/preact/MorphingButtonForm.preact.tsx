/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountMorphingButtonForm, type MorphingButtonFormOptions } from "../../components/morphing-button-form/MorphingButtonFormEngine.js";
import type { MotionController } from "../../components/morphing-button-form/motion-runtime";

export function MorphingButtonForm({ options, className }: { options?: MorphingButtonFormOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMorphingButtonForm(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="morphing-button-form" />;
}
