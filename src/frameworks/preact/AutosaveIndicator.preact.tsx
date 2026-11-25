/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAutosaveIndicator, type AutosaveIndicatorOptions } from "../../components/autosave-indicator/AutosaveIndicatorEngine.js";
import type { MotionController } from "../../components/autosave-indicator/motion-runtime";

export function AutosaveIndicator({ options, className }: { options?: AutosaveIndicatorOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAutosaveIndicator(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="autosave-indicator" />;
}
