/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTextOnWavePath, type TextOnWavePathOptions } from "../../components/text-on-wave-path/TextOnWavePathEngine.js";
import type { MotionController } from "../../components/text-on-wave-path/motion-runtime";

export function TextOnWavePath(props: { options?: TextOnWavePathOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTextOnWavePath(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="text-on-wave-path" />;
}
