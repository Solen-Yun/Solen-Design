/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountHoverPreviewList, type HoverPreviewListOptions } from "../../components/hover-preview-list/HoverPreviewListEngine.js";
import type { MotionController } from "../../components/hover-preview-list/motion-runtime";

export function HoverPreviewList({ options, className }: { options?: HoverPreviewListOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountHoverPreviewList(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="hover-preview-list" />;
}
