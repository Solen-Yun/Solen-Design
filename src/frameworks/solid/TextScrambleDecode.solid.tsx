/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTextScrambleDecode, type TextScrambleDecodeOptions } from "../../components/text-scramble-decode/TextScrambleDecodeEngine.js";
import type { MotionController } from "../../components/text-scramble-decode/motion-runtime";

export function TextScrambleDecode(props: { options?: TextScrambleDecodeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTextScrambleDecode(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="text-scramble-decode" />;
}
