/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountDrumTimePicker, type DrumTimePickerOptions } from "../../components/drum-time-picker/DrumTimePickerEngine.js";
import type { MotionController } from "../../components/drum-time-picker/motion-runtime";

export function DrumTimePicker({ options, className }: { options?: DrumTimePickerOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountDrumTimePicker(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="drum-time-picker" />;
}
