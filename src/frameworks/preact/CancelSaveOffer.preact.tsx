/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCancelSaveOffer, type CancelSaveOfferOptions } from "../../components/cancel-save-offer/CancelSaveOfferEngine.js";
import type { MotionController } from "../../components/cancel-save-offer/motion-runtime";

export function CancelSaveOffer({ options, className }: { options?: CancelSaveOfferOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCancelSaveOffer(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="cancel-save-offer" />;
}
