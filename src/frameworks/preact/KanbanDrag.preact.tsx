/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountKanbanDrag, type KanbanDragOptions } from "../../components/kanban-drag/KanbanDragEngine.js";
import type { MotionController } from "../../components/kanban-drag/motion-runtime";

export function KanbanDrag({ options, className }: { options?: KanbanDragOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountKanbanDrag(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="kanban-drag" />;
}
