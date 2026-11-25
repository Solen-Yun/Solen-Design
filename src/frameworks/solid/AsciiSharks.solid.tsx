/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAsciiSharks, type AsciiSharksOptions } from "../../components/ascii-sharks/AsciiSharksEngine.js";
import type { MotionController } from "../../components/ascii-sharks/motion-runtime";

export function AsciiSharks(props: { options?: AsciiSharksOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAsciiSharks(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="ascii-sharks" />;
}
