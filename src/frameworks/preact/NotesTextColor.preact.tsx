/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountNotesTextColor, type NotesTextColorOptions } from "../../components/notes-text-color/NotesTextColorEngine.js";
import type { MotionController } from "../../components/notes-text-color/motion-runtime";

export function NotesTextColor({ options, className }: { options?: NotesTextColorOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountNotesTextColor(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="notes-text-color" />;
}
