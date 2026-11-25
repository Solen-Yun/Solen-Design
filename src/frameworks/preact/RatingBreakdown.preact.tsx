/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountRatingBreakdown, type RatingBreakdownOptions } from "../../components/rating-breakdown/RatingBreakdownEngine.js";
import type { MotionController } from "../../components/rating-breakdown/motion-runtime";

export function RatingBreakdown({ options, className }: { options?: RatingBreakdownOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountRatingBreakdown(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="rating-breakdown" />;
}
