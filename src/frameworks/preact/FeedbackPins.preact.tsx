/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountFeedbackPins, type FeedbackPinsOptions } from "../../components/feedback-pins/FeedbackPinsEngine.js";
import type { MotionController } from "../../components/feedback-pins/motion-runtime";

export function FeedbackPins({ options, className }: { options?: FeedbackPinsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountFeedbackPins(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="feedback-pins" />;
}
