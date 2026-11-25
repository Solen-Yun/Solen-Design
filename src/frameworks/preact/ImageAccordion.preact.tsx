/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountImageAccordion, type ImageAccordionOptions } from "../../components/image-accordion/ImageAccordionEngine.js";
import type { MotionController } from "../../components/image-accordion/motion-runtime";

export function ImageAccordion({ options, className }: { options?: ImageAccordionOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountImageAccordion(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="image-accordion" />;
}
