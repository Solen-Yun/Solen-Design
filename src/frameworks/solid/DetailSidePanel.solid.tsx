/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDetailSidePanel, type DetailSidePanelOptions } from "../../components/detail-side-panel/DetailSidePanelEngine.js";
import type { MotionController } from "../../components/detail-side-panel/motion-runtime";

export function DetailSidePanel(props: { options?: DetailSidePanelOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDetailSidePanel(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="detail-side-panel" />;
}
