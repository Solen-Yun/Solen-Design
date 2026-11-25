/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPadlockToggle, type PadlockToggleOptions } from "../../components/padlock-toggle/PadlockToggleEngine.js";
import type { MotionController } from "../../components/padlock-toggle/motion-runtime";

export function PadlockToggle(props: { options?: PadlockToggleOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPadlockToggle(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="padlock-toggle" />;
}
