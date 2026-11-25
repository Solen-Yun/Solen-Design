/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFontPairing, type FontPairingOptions } from "../../components/font-pairing/FontPairingEngine.js";
import type { MotionController } from "../../components/font-pairing/motion-runtime";

export function FontPairing(props: { options?: FontPairingOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFontPairing(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="font-pairing" />;
}
