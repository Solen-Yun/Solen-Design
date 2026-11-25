/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTransferGlow, type TransferGlowOptions } from "../../components/transfer-glow/TransferGlowEngine.js";
import type { MotionController } from "../../components/transfer-glow/motion-runtime";

export function TransferGlow(props: { options?: TransferGlowOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTransferGlow(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="transfer-glow" />;
}
