/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMagnifyDock, type MagnifyDockOptions } from "../../components/magnify-dock/MagnifyDockEngine.js";
import type { MotionController } from "../../components/magnify-dock/motion-runtime";

export function MagnifyDock(props: { options?: MagnifyDockOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMagnifyDock(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="magnify-dock" />;
}
