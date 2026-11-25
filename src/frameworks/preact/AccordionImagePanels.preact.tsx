/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAccordionImagePanels, type AccordionImagePanelsOptions } from "../../components/accordion-image-panels/AccordionImagePanelsEngine.js";
import type { MotionController } from "../../components/accordion-image-panels/motion-runtime";

export function AccordionImagePanels({ options, className }: { options?: AccordionImagePanelsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAccordionImagePanels(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="accordion-image-panels" />;
}
