/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountStickyStackCards, type StickyStackCardsOptions } from "../../components/sticky-stack-cards/StickyStackCardsEngine.js";
import type { MotionController } from "../../components/sticky-stack-cards/motion-runtime";

export function StickyStackCards({ options, className }: { options?: StickyStackCardsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountStickyStackCards(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="sticky-stack-cards" />;
}
