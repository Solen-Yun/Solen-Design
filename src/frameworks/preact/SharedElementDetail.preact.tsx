/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSharedElementDetail, type SharedElementDetailOptions } from "../../components/shared-element-detail/SharedElementDetailEngine.js";
import type { MotionController } from "../../components/shared-element-detail/motion-runtime";

export function SharedElementDetail({ options, className }: { options?: SharedElementDetailOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSharedElementDetail(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="shared-element-detail" />;
}
