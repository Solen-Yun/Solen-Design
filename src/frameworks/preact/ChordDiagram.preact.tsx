/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountChordDiagram, type ChordDiagramOptions } from "../../components/chord-diagram/ChordDiagramEngine.js";
import type { MotionController } from "../../components/chord-diagram/motion-runtime";

export function ChordDiagram({ options, className }: { options?: ChordDiagramOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountChordDiagram(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="chord-diagram" />;
}
