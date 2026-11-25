/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountUnsavedChangesBar, type UnsavedChangesBarOptions } from "../../components/unsaved-changes-bar/UnsavedChangesBarEngine.js";
import type { MotionController } from "../../components/unsaved-changes-bar/motion-runtime";

export function UnsavedChangesBar({ options, className }: { options?: UnsavedChangesBarOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountUnsavedChangesBar(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="unsaved-changes-bar" />;
}
