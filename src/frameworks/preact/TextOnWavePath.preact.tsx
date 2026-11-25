/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountTextOnWavePath, type TextOnWavePathOptions } from "../../components/text-on-wave-path/TextOnWavePathEngine.js";
import type { MotionController } from "../../components/text-on-wave-path/motion-runtime";

export function TextOnWavePath({ options, className }: { options?: TextOnWavePathOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountTextOnWavePath(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="text-on-wave-path" />;
}
