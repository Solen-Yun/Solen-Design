/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountKineticCaptions, type KineticCaptionsOptions } from "../../components/kinetic-captions/KineticCaptionsEngine.js";
import type { MotionController } from "../../components/kinetic-captions/motion-runtime";

export function KineticCaptions(props: { options?: KineticCaptionsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountKineticCaptions(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="kinetic-captions" />;
}
