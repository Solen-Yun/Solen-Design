/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDrumTimePicker, type DrumTimePickerOptions } from "../../components/drum-time-picker/DrumTimePickerEngine.js";
import type { MotionController } from "../../components/drum-time-picker/motion-runtime";

export function DrumTimePicker(props: { options?: DrumTimePickerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDrumTimePicker(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="drum-time-picker" />;
}
