/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStatusPage, type StatusPageOptions } from "../../components/status-page/StatusPageEngine.js";
import type { MotionController } from "../../components/status-page/motion-runtime";

export function StatusPage(props: { options?: StatusPageOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStatusPage(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="status-page" />;
}
