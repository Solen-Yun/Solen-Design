/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountFontPairing, type FontPairingOptions } from "../../components/font-pairing/FontPairingEngine.js";
import type { MotionController } from "../../components/font-pairing/motion-runtime";

export function FontPairing({ options, className }: { options?: FontPairingOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountFontPairing(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="font-pairing" />;
}
