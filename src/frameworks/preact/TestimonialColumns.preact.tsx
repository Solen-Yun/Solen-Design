/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountTestimonialColumns, type TestimonialColumnsOptions } from "../../components/testimonial-columns/TestimonialColumnsEngine.js";
import type { MotionController } from "../../components/testimonial-columns/motion-runtime";

export function TestimonialColumns({ options, className }: { options?: TestimonialColumnsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountTestimonialColumns(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="testimonial-columns" />;
}
