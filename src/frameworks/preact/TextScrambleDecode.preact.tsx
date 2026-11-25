/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountTextScrambleDecode, type TextScrambleDecodeOptions } from "../../components/text-scramble-decode/TextScrambleDecodeEngine.js";
import type { MotionController } from "../../components/text-scramble-decode/motion-runtime";

export function TextScrambleDecode({ options, className }: { options?: TextScrambleDecodeOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountTextScrambleDecode(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="text-scramble-decode" />;
}
