/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountGlowBorderCards, type GlowBorderCardsOptions } from "../../components/glow-border-cards/GlowBorderCardsEngine.js";
import type { MotionController } from "../../components/glow-border-cards/motion-runtime";

export function GlowBorderCards({ options, className }: { options?: GlowBorderCardsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountGlowBorderCards(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="glow-border-cards" />;
}
