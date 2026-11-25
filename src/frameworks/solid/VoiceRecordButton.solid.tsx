/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountVoiceRecordButton, type VoiceRecordButtonOptions } from "../../components/voice-record-button/VoiceRecordButtonEngine.js";
import type { MotionController } from "../../components/voice-record-button/motion-runtime";

export function VoiceRecordButton(props: { options?: VoiceRecordButtonOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountVoiceRecordButton(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="voice-record-button" />;
}
