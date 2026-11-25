/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountStatusPage, type StatusPageOptions } from "../../components/status-page/StatusPageEngine.js";
import type { MotionController } from "../../components/status-page/motion-runtime";

export function StatusPage({ options, className }: { options?: StatusPageOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountStatusPage(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="status-page" />;
}
