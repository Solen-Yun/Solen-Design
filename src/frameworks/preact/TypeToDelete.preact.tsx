/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountTypeToDelete, type TypeToDeleteOptions } from "../../components/type-to-delete/TypeToDeleteEngine.js";
import type { MotionController } from "../../components/type-to-delete/motion-runtime";

export function TypeToDelete({ options, className }: { options?: TypeToDeleteOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountTypeToDelete(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="type-to-delete" />;
}
