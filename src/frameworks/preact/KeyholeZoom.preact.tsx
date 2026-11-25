/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountKeyholeZoom, type KeyholeZoomOptions } from "../../components/keyhole-zoom/KeyholeZoomEngine.js";
import type { MotionController } from "../../components/keyhole-zoom/motion-runtime";

export function KeyholeZoom({ options, className }: { options?: KeyholeZoomOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountKeyholeZoom(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="keyhole-zoom" />;
}
