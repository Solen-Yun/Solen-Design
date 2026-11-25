/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDetailSidePanel, type DetailSidePanelOptions } from "../../components/detail-side-panel/DetailSidePanelEngine.js";
import type { MotionController } from "../../components/detail-side-panel/motion-runtime";

export function DetailSidePanel({ options, className }: { options?: DetailSidePanelOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDetailSidePanel(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="detail-side-panel" />;
}
