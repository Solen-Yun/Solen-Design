/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountGiftBox, type GiftBoxOptions } from "../../components/gift-box/GiftBoxEngine.js";
import type { MotionController } from "../../components/gift-box/motion-runtime";

export function GiftBox({ options, className }: { options?: GiftBoxOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountGiftBox(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="gift-box" />;
}
