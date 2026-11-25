/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountMorphingCursor, type MorphingCursorOptions } from "../../components/morphing-cursor/MorphingCursorEngine.js";
import type { MotionController } from "../../components/morphing-cursor/motion-runtime";

export function MorphingCursor({ options, className }: { options?: MorphingCursorOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMorphingCursor(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="morphing-cursor" />;
}
