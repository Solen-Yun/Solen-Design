/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountMarkerHighlight, type MarkerHighlightOptions } from "../../components/marker-highlight/MarkerHighlightEngine.js";
import type { MotionController } from "../../components/marker-highlight/motion-runtime";

export function MarkerHighlight({ options, className }: { options?: MarkerHighlightOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMarkerHighlight(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="marker-highlight" />;
}
