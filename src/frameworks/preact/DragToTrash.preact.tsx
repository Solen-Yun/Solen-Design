/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDragToTrash, type DragToTrashOptions } from "../../components/drag-to-trash/DragToTrashEngine.js";
import type { MotionController } from "../../components/drag-to-trash/motion-runtime";

export function DragToTrash({ options, className }: { options?: DragToTrashOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDragToTrash(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="drag-to-trash" />;
}
