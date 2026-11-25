/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountAiBrandCoverCards, type AiBrandCoverCardsOptions } from "../../components/ai-brand-cover-cards/AiBrandCoverCardsEngine.js";
import type { MotionController } from "../../components/ai-brand-cover-cards/motion-runtime";

export function AiBrandCoverCards({ options, className }: { options?: AiBrandCoverCardsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountAiBrandCoverCards(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="ai-brand-cover-cards" />;
}
