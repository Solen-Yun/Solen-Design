/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountGradientRingCards, type GradientRingCardsOptions } from "../../components/gradient-ring-cards/GradientRingCardsEngine.js";
import type { MotionController } from "../../components/gradient-ring-cards/motion-runtime";

export function GradientRingCards({ options, className }: { options?: GradientRingCardsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountGradientRingCards(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="gradient-ring-cards" />;
}
