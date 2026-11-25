/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountBrandLineCards, type BrandLineCardsOptions } from "../../components/brand-line-cards/BrandLineCardsEngine.js";
import type { MotionController } from "../../components/brand-line-cards/motion-runtime";

export function BrandLineCards({ options, className }: { options?: BrandLineCardsOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountBrandLineCards(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="brand-line-cards" />;
}
