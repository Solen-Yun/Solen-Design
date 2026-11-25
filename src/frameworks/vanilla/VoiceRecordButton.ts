import { mountVoiceRecordButton, type VoiceRecordButtonOptions } from "../../components/voice-record-button/VoiceRecordButtonEngine.js";
import type { MotionController } from "../../components/voice-record-button/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: VoiceRecordButtonOptions = {}): ReturnType<typeof mountVoiceRecordButton> {
  return mountVoiceRecordButton(target, options);
}
export type { VoiceRecordButtonOptions };
