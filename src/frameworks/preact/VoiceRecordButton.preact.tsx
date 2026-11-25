/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountVoiceRecordButton, type VoiceRecordButtonOptions } from "../../components/voice-record-button/VoiceRecordButtonEngine.js";
import type { MotionController } from "../../components/voice-record-button/motion-runtime";

export function VoiceRecordButton({ options, className }: { options?: VoiceRecordButtonOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountVoiceRecordButton(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="voice-record-button" />;
}
